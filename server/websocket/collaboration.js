const WebSocket = require('ws');
const ActiveUser = require('../model/activeUser.model');

function setupCollaboration(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('✅ New client connected');

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        switch (data.type) {
          case 'join':
            // User joins document
            ws.contentId = data.contentId;
            ws.userId = data.userId;
            ws.username = data.username;
            ws.avatarColor = data.avatarColor;

            // Save to database
            const activeUser = await ActiveUser.findOneAndUpdate(
              { contentId: data.contentId, userId: data.userId },
              { 
                socketId: ws.id,
                lastActive: Date.now()
              },
              { upsert: true, new: true }
            ).populate('userId', 'username avatarColor');

            // Notify all others
            broadcast(wss, data.contentId, {
              type: 'user_joined',
              user: {
                id: data.userId,
                username: data.username,
                avatarColor: data.avatarColor
              }
            }, ws);

            console.log(`👤 ${data.username} joined document ${data.contentId}`);
            break;

          case 'content_change':
            // User is typing - broadcast to others
            broadcast(wss, data.contentId, {
              type: 'content_update',
              content: data.content,
              userId: data.userId,
              username: data.username,
              cursorPosition: data.cursorPosition
            }, ws);

            // Update last active
            await ActiveUser.findOneAndUpdate(
              { contentId: data.contentId, userId: data.userId },
              { 
                lastActive: Date.now(),
                cursorPosition: data.cursorPosition
              }
            );

            console.log(`✏️  ${data.username} editing...`);
            break;

          case 'comment_added':
            // New comment added
            broadcast(wss, data.contentId, {
              type: 'new_comment',
              comment: data.comment
            }, ws);

            console.log(`💬 ${data.username} added comment`);
            break;

          case 'comment_deleted':
            // Comment deleted
            broadcast(wss, data.contentId, {
              type: 'comment_deleted',
              commentId: data.commentId
            }, ws);
            break;

          case 'comment_resolved':
            // Comment resolved
            broadcast(wss, data.contentId, {
              type: 'comment_resolved',
              commentId: data.commentId
            }, ws);
            break;

          case 'cursor_move':
            // Cursor position update
            broadcast(wss, data.contentId, {
              type: 'cursor_update',
              userId: data.userId,
              username: data.username,
              avatarColor: data.avatarColor,
              cursorPosition: data.cursorPosition
            }, ws);
            break;

          case 'heartbeat':
            // Keep connection alive
            await ActiveUser.findOneAndUpdate(
              { contentId: data.contentId, userId: data.userId },
              { lastActive: Date.now() }
            );
            break;
        }
      } catch (error) {
        console.error('❌ WebSocket error:', error);
      }
    });

    ws.on('close', async () => {
      console.log('❌ Client disconnected');

      if (ws.contentId && ws.userId) {
        // Remove from active users
        await ActiveUser.findOneAndDelete({
          contentId: ws.contentId,
          userId: ws.userId
        });

        // Notify others
        broadcast(wss, ws.contentId, {
          type: 'user_left',
          userId: ws.userId,
          username: ws.username
        });

        console.log(`👋 ${ws.username} left document`);
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  // Heartbeat to keep connections alive
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate();
      
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(interval);
  });

  console.log('🚀 WebSocket server started');
  return wss;
}

function broadcast(wss, contentId, message, excludeWs = null) {
  wss.clients.forEach((client) => {
    if (
      client !== excludeWs &&
      client.readyState === WebSocket.OPEN &&
      client.contentId === contentId
    ) {
      client.send(JSON.stringify(message));
    }
  });
}

module.exports = setupCollaboration;