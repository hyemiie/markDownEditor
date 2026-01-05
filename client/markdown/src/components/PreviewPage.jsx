import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PreviewPage = () => {
  const { fileId } = useParams();
  const [htmlResponse, setHtmlResponse] = useState("");
  const navigate = useNavigate();

  const getPreview = async () => {
    try {
      const res = await axios.post(
        "https://markdowneditor-backend.onrender.com/viewFile",
        { selectedID: fileId }
      );
      const markdownText = res.data.file.userInput;

      const htmlRes = await axios.post(
        "https://markdowneditor-backend.onrender.com/convertText",
        { he: markdownText }
      );
      setHtmlResponse(htmlRes.data.html);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPreview();
  }, [fileId]);

  return (
    <div className="preview-page">
      <h1>Preview</h1>
      <div
        id="htmlResponse"
        dangerouslySetInnerHTML={{ __html: htmlResponse }}
        style={{ border: "1px solid gray", padding: "1rem" }}
      />
      <button onClick={() => navigate(`/editor/${fileId}`)}>Back to Edit</button>
    </div>
  );
};

export default PreviewPage;
