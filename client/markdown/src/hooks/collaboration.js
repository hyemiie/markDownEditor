// hooks/useCollaboration.js (NEW FILE)
import { useEffect, useRef, useState } from 'react';

export const useCollaboration = (contentId, userId, username, avatarColor) => {
  const [ws, setWs] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const reconnectTimeout = useRef(null);

  useEffect(() => {
    if (!contentId || !userId) return;

    const connectWebSocket = () => {
      const websocket = new WebSocket('ws://localhost:5000');

      websocket.onopen = () => {
        console.log('✅ Connected to collaboration server');
        
        websocket.send(JSON.stringify({
          type: 'join',
          contentId,
          userId,
          username,
          avatarColor
        }));

        const heartbeat = setInterval(() => {
          if (websocket.readyState === WebSocket.OPEN) {
            websocket.send(JSON.stringify({
              type: 'heartbeat',
              contentId,
              userId
            }));
          }
        }, 30000);

        websocket.heartbeatInterval = heartbeat;
      };

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'user_joined':
            setActiveUsers(prev => {
              if (prev.find(u => u.id === data.user.id)) return prev;
              return [...prev, { ...data.user, active: true }];
            });
            console.log(`👤 ${data.user.username} joined`);
            break;

          case 'user_left':
            setActiveUsers(prev => prev.filter(u => u.id !== data.userId));
            console.log(`👋 User left`);
            break;

          case 'content_update':
            if (data.userId !== userId) {
              window.dispatchEvent(new CustomEvent('remote-content-update', { 
                detail: { content: data.content, userId: data.userId } 
              }));
            }
            break;

          case 'new_comment':
            window.dispatchEvent(new CustomEvent('new-comment', { detail: data.comment }));
            break;

          case 'comment_deleted':
            window.dispatchEvent(new CustomEvent('delete-comment', { detail: data.commentId }));
            break;
        }
      };

      websocket.onclose = () => {
        console.log('❌ Disconnected from server');
        clearInterval(websocket.heartbeatInterval);
        
        reconnectTimeout.current = setTimeout(() => {
          console.log('🔄 Reconnecting...');
          connectWebSocket();
        }, 3000);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      setWs(websocket);
    };

    connectWebSocket();

    return () => {
      if (ws) {
        clearInterval(ws.heartbeatInterval);
        ws.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [contentId, userId]);

  const sendContentUpdate = (content, cursorPosition) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'content_change',
        contentId,
        userId,
        username,
        content,
        cursorPosition
      }));
    }
  };

  const sendComment = (comment) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'comment_added',
        contentId,
        userId,
        username,
        comment
      }));
    }
  };

  const deleteCommentWS = (commentId) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'comment_deleted',
        contentId,
        commentId
      }));
    }
  };

  return {
    activeUsers,
    sendContentUpdate,
    sendComment,
    deleteCommentWS
  };
};