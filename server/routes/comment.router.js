const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment.controller');

router.post('/', commentController.createComment);
router.get('/content/:contentId', commentController.getCommentsByContent);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);
router.patch('/:id/resolve', commentController.resolveComment);

module.exports = router;

