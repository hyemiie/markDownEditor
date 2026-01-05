const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.checkDocumentAccess = async (req, res, next) => {
  const { document_id } = req.params;
  const userId = req.user.id;
  
  const query = `SELECT * FROM document_permissions 
                 WHERE document_id = ? AND user_id = ?`;
  const access = await db.query(query, [document_id, userId]);
  
  if (access.length === 0) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  next();
};