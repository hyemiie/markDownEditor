import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditorPage = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [htmlResponse, setHtmlResponse] = useState("");

  const getFile = async () => {
    try {
      const res = await axios.post(
        "https://markdowneditor-backend.onrender.com/viewFile",
        { selectedID: fileId }
      );
      setUserInput(res.data.file.userInput);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFile();
  }, [fileId]);

  const handleUserInputChange = async (e) => {
    const text = e.target.value;
    setUserInput(text);

    try {
      const res = await axios.post(
        "https://markdowneditor-backend.onrender.com/convertText",
        { he: text }
      );
      setHtmlResponse(res.data.html);
    } catch (err) {
      console.error(err);
    }
  };

  const saveFile = async () => {
    try {
      await axios.post(
        "https://markdowneditor-backend.onrender.com/updateFile",
        { userEdit: userInput, selectedID: fileId }
      );
      navigate(`/preview/${fileId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="editor-page">
      <h1>Editing File</h1>
      <textarea
        value={userInput}
        onChange={handleUserInputChange}
        style={{ width: "60%", height: "400px" }}
      />
      <div style={{ marginTop: "1rem" }}>
        <button onClick={saveFile}>Save & Preview</button>
      </div>
    </div>
  );
};

export default EditorPage;
