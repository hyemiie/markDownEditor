const express = require("express");
const router = express.Router();
const contentController = require("../controller/content.controller");

router.post("/getText", contentController.getText);
router.post("/downloadFile", contentController.downloadFile);
router.get("/getAllFiles", contentController.getAllFiles);
router.post("/createContent", contentController.createContent);
router.put("/updateFile", contentController.updateFile);
router.post("/viewFile", contentController.viewFile);
router.delete("/deleteFile", contentController.deleteFile);

router.post("/:id/collaborators", contentController.addCollaborator);
router.get("/:contentId/active-users", contentController.getActiveUsers);

router.get("/:id", contentController.getContentById);


module.exports = router;