import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [newFileName, setNewFileName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getFiles = async () => {
    try {
      const res = await axios.get(
        "https://markdowneditor-backend.onrender.com/getFiles",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const selectFile = (fileId) => {
    navigate(`/editor/${fileId}`);
  };

  const createFile = async () => {
    if (!newFileName) return;
    try {
      const res = await axios.post(
        "https://markdowneditor-backend.onrender.com/createContent",
        { userContent: "", fileName: newFileName, token }
      );
      setNewFileName("");
      getFiles();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFile = async (fileId) => {
    try {
      await axios.post(
        "https://markdowneditor-backend.onrender.com/deleteFile",
        { selectedID: fileId }
      );
      getFiles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="file-manager">
      <h1>Your Files</h1>
      <div>
        <input
          placeholder="New File Name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <button onClick={createFile}>Create</button>
      </div>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <span onClick={() => selectFile(file._id)}>{file.fileName}</span>
            <button onClick={() => deleteFile(file._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileManager;
