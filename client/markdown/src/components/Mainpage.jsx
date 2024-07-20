import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mainpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faArrowDown,
  faArrowLeft,
  faBold,
  faCalendar,
  faCalendarAlt,
  faCancel,
  faCheck,
  faCode,
  faCoffee,
  faCross,
  faFile,
  faFileArchive,
  faImagePortrait,
  faItalic,
  faLink,
  faList12,
  faListDots,
  faListNumeric,
  faPencil,
  faQuoteLeft,
  faTable,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { saveAs } from "file-saver";

const Mainpage = () => {
  const [htmlResponse, setHtmlResponse] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userFile, setUserFile] = useState([]);
  const [selectedID, setSelectedID] = useState([]);
  const [fileStatus, setFileStatus] = useState(false);
  const [fileName, setFileName] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const [fileListStatus, setFileListStatus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [messageID, setMessageID] = useState(null);
  const [currentUserID, setCurrentUserID] = useState(null);

  const handleMouseEnter = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const getUserInput = async (inputText) => {
    try {
      const response = await axios.post("http://localhost:5000/convertText", {
        he: inputText,
      });
      console.log("response", response.data);

      setHtmlResponse(response.data.html);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection) {
        const selectedText = selection.toString();
        setHighlightedText(selectedText);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleUserInputChange = (e) => {
    const inputText = e.target.value;
    setUserInput(inputText);
    console.log("inputText", inputText);
    getUserInput(inputText);
    console.log("inputText", userInput);
  };

  const handleBoldClick = () => {
    if (highlightedText) {
      const boldedText = `<b>${highlightedText}</b>`;
      const newText = userInput.replace(highlightedText, boldedText);
      setUserInput(newText);
      setHtmlResponse(newText);
    }
  };

  const handleItalicClick = () => {
    if (highlightedText) {
      const italicedText = `<em>${highlightedText}</em>`;
      const newText = userInput.replace(highlightedText, italicedText);
      setUserInput(newText);
      setHtmlResponse(newText);
    }
  };

  const handleListClick = () => {
    if (highlightedText) {
      const List = highlightedText
        .split("\n")
        .map((line) => `<li>${line.trim()}</li>`)
        .join("");
      const newText = userInput.replace(highlightedText, List);
      setUserInput(newText);
      setHtmlResponse(newText);
    }
  };

  const handleSubListClick = () => {
    if (highlightedText) {
      const subList = `<li> <li>${highlightedText}</li></l1>`;
      const newText = userInput.replace(highlightedText, subList);
      setUserInput(newText);
      setHtmlResponse(newText);
    }
  };

  const handleCodeClick = () => {
    if (highlightedText) {
      const Code = `<code>${highlightedText}</code>`;
      const newText = userInput.replace(highlightedText, Code);
      setUserInput(newText);
      setHtmlResponse(newText);
    }
  };

  const handleTableClick = () => {
    if (highlightedText) {
      const Table = `<tr>${highlightedText}</tr>`;
      const newText = userInput.replace(highlightedText, Table);
      setUserInput(newText);
      setHtmlResponse(newText);
    }
  };

  const handleLinkClick = () => {
    if (highlightedText) {
      const Link = `<a>${highlightedText}</a>`;
      const newText = userInput.replace(highlightedText, Link);
      setUserInput(newText);
      setHtmlResponse(newText);
    }
  };

  const handleDownloads = async () => {
    const userDownload = document.getElementById("htmlResponse").innerHTML;
    console.log(userDownload);
    try {
      const response = await axios.post("http://localhost:5000/downloadFile", {
        userContent: userDownload,
        fileName: "First Download",
      });
      alert("File Downloaded");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = () => {
    const userDownload = document.getElementById("htmlResponse").innerHTML;

    const blob = new Blob([userDownload], {
      type: "text/markdown;charset=utf-8",
    });
    saveAs(blob, "document.md");
    alert("file Downloaded");
  };

  const newFile = async () => {
    const token = localStorage.getItem("token");
    // Check if userInput is defined and not an empty string
    if (!userInput || userInput.trim() === "") {
      setUserInput("Update your file");
      console.log("Set User Input");
    }
    
    try {
        const response = await axios.post("http://localhost:5000/createContent", {
          userContent: userInput,
          fileName: fileName,
          token: token,
        });
        console.log("Successful", fileName, token, userInput);
        alert("File created")
        console.log('new file response', response)
        setUserFile(response.data)
        setFileStatus(false);

       
    } catch (error) {
      console.error("An error occurred:", error);
    }
    
    console.log("Function ended");
  };
  

  

  const editFile = async () => {
    const userEdit = userInput;

    const fileID = selectedID;
    console.log(fileID);
    try {
      const response = await axios.post("http://localhost:5000/updateFile", {
        userEdit: userEdit,
        selectedID: selectedID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFile = async () => {
    const fileID = selectedID;
    console.log("fileID", fileID);
    try {
      const response = await axios.post("http://localhost:5000/deleteFile", {
        selectedID: fileID,
      });
      console.log("Delete response:", response.data);
    } catch (error) {
      console.error("Error deleting file:", error); // Log any errors to the console
      // Handle error: display a message to the user or perform other actions
    }
  };
  const deleteChat = async () => {
    if (!messageID) return;
    try {
      const response = await axios.delete("http://localhost:5000/deleteFile", {
        params: { messageID, currentUserID },
      });
      console.log("details", messageID, currentUserID);
      console.log("Response:", response.data);
      alert("Message deleted");
      setMessageID(null);
      setUserFile(response.data.updatedChat);
    } catch (error) {
      console.error(
        "Error deleting message:",
        error.response?.data || error.message
      );
      alert("Failed to delete message");
    }
  };

  useEffect(() => {
    if (messageID) {
      deleteChat();
    }
  }, [messageID]);

  const getFiles = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:5000/getFiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setUserFile(response.data);

      // console.log("userFile", userFile);
    } catch (error) {
      console.log(error);
    }
  };

  const viewFile = async () => {
    try {
      const response = await axios.post("http://localhost:5000/viewFile", {
        selectedID: selectedID,
      });
      const fileText = response.data.file.userInput;
      console.log(response.data.file.userInput);
      setUserInput(fileText);
    } catch (error) {
      console.log(error);
    }
  };

  const getFileId = (fileId) => {
    setSelectedID(fileId);
    console.log("done", selectedID);
  };

  const getCurrentFile = (fileName) => {
    setCurrentFile(fileName);
    console.log("done", currentFile);
  };

  const togglenewFile = () => {
    setFileStatus(true);
    console.log(fileStatus);
  };

  const cancelToggle = () => {
    setFileStatus(false);
  };

  const createNewfile = (e) => {
    setFileName(e.target.value);
  };

  const viewStatusFalse = () => {
    setFileListStatus(false);
  };

  const viewStatusTrue = () => {
    setFileListStatus(true);
  };

  return (
    <div className="flex overflow-hidden bg-yellow-200">
      <div className="w-full bg-yellow-200">
        <p className="flex flex-wrap bg-black text-gray-50 w-screen h-10 ">
          <div className="flex pl-12 w-screen overflow-auto fixed top-0 bg-black">
            <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7 "
              onClick={() => {
                getFiles();
                viewStatusTrue();
              }}
              onMouseEnter={() => handleMouseEnter("fileArchive")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon
                icon={faFileArchive}
                className="flex text-2xl text-cyan-600"
              />
              {/* text-indigo-600 */}

              {hoveredButton == "fileArchive" ? <p>View Files</p> : ""}
            </button>

            <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7"
              onClick={handleBoldClick}
              onMouseEnter={() => handleMouseEnter("bold")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faBold} className="justify-center pl-2" />
              {hoveredButton == "bold" ? <p>Bold</p> : ""}
            </button>
            <button
              className="flex pe-10 font-bold pt-3 hover:bg-slate-500 w-7"
              onClick={handleItalicClick}
              onMouseEnter={() => handleMouseEnter("Italic")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon
                icon={faItalic}
                className="justify-center pl-2"
              />
              {hoveredButton == "Italic" ? <p>Italic</p> : ""}
            </button>
            <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7"
              onClick={handleListClick}
              onMouseEnter={() => handleMouseEnter("List")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon
                icon={faListNumeric}
                className="justify-center pl-2"
              />
              {hoveredButton == "List" ? <p>List</p> : ""}
            </button>
            <button
              className=" flex pe-10 pt-3 hover:bg-slate-500 w-7 "
              onClick={handleSubListClick}
              onMouseEnter={() => handleMouseEnter("SubList")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon
                icon={faListDots}
                className="justify-center pl-2"
              />
              {hoveredButton == "SubList" ? <p>SubList</p> : ""}
            </button>

            <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7"
              onMouseEnter={() => handleMouseEnter("Quote")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="justify-center pl-2"
              />
              {hoveredButton == "Quote" ? <p>Quote</p> : ""}
            </button>
            <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7"
              onClick={handleCodeClick}
              onMouseEnter={() => handleMouseEnter("Code")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faCode} className="justify-center pl-2" />
              {hoveredButton == "Code" ? <p>Code</p> : ""}
            </button>
            <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7"
              onClick={handleTableClick}
              onMouseEnter={() => handleMouseEnter("Table")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faTable} className="justify-center pl-2" />
              {hoveredButton == "Table" ? <p>Table</p> : ""}
            </button>
            <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7"
              onClick={handleLinkClick}
              onMouseEnter={() => handleMouseEnter("Link")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faLink} className="justify-center pl-2" />
              {hoveredButton == "Link" ? <p>Link</p> : ""}
            </button>
            <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7"
              onClick={handleDownload}
              onMouseEnter={() => handleMouseEnter("Download")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon
                icon={faArrowDown}
                className="justify-center pl-2"
              />
              {hoveredButton == "Download" ? <p>Download</p> : ""}
            </button>
            <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7"
              onClick={editFile}
              onMouseEnter={() => handleMouseEnter("Edit")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon
                icon={faPencil}
                className="justify-center pl-2"
              />
              {hoveredButton == "Edit" ? <p>Edit File</p> : ""}
            </button>
          </div>
        </p>

        <div className="flex items-center justify-between  flex-wrap bg-slate-500">
          <p className=" text-gray-300 text-3xl ml-4 font-bold font-serif">
            {currentFile}
          </p>
          <div className="flex items-center">
            <button
              onClick={editFile}
              className="text-center bg-cyan-600 text-white hover:text-gray-100 p-2 rounded mr-8 "
            >
              Save File
            </button>
          </div>
        </div>

        <div className="flex w-auto">
          <textarea
            className="bg-slate-300 h-screen w-[50%] border-r-4 border-b-cyan-500 outline-none pl-12 pt-5 "
            placeholder="start writing here"
            id="userInput"
            value={userInput}
            onChange={(e) => {
              handleUserInputChange(e);
            }}
          />
          <div
            className="bg-slate-300 h-screen w-[50%] outline-none p-10"
            id="htmlResponse"
            dangerouslySetInnerHTML={{ __html: htmlResponse }}
          />
        </div>
      </div>
      {fileListStatus && (
        <div className="bg-slate-500 py-3.5 pl-4 w-max h-screen flex flex-col absolute overflow-y-scroll">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={viewStatusFalse}
            className="flex bg-slate-600 w-6 h-6 text-xs p-5 rounded-full hover:bg-black hover:text-slate-100"
          />

          {userFile.map((file) => (
            <div
              key={file._id}
              className="mb-7 hover:bg-gray-600 text-gray-100 w-56 h-8 flex justify-between align-middle"
            >
              <ul
                onClick={() => {
                  getFileId(file._id);
                  getCurrentFile(file.fileName);
                  viewFile();
                }}
              >
                <li> {file.fileName}</li>
              </ul>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this message?"
                    )
                  ) {
                    setMessageID(file._id);
                    setCurrentUserID(file.userId);
                  }
                }}
              />
            </div>
          ))}
          <div>
            {fileStatus && (
              <div className="flex mb-7 text-gray-100 w-48">
                <FontAwesomeIcon icon={faCheck} onClick={newFile} />
                <input
                  placeholder="File name"
                  id="fileName"
                  className="flex bg-transparent border-white border-b-2 outline-none pl-5"
                  onChange={createNewfile}
                />
              </div>
            )}
          </div>
          <div className="flex">
            <button
              className="bg-slate-50 w-42 mr-auto pr-5 h-10"
              onClick={() => {
                togglenewFile();
              }}
            >
              Add a new File
            </button>
            {fileStatus && (
              <FontAwesomeIcon
                icon={faTimes}
                onClick={cancelToggle}
                className="bg-rose-700 text-gray-50 p-2 flex h-6"
              />
            )}
          </div>
        </div>
      )}

      <Login />
    </div>
  );
};

export default Mainpage;
