import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mainpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faArrowDown,
  faBold,
  faCalendar,
  faCalendarAlt,
  faCancel,
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
} from "@fortawesome/free-solid-svg-icons";
import Login from "./Login/Login";
import Register from "./Register/Register";

const Mainpage = () => {
  const [htmlResponse, setHtmlResponse] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userFile, setUserFile] = useState([]);
  const [selectedID, setSelectedID] = useState([]);
  const [fileStatus, setFileStatus] = useState(false);
  const [fileName, setFileName] = useState("");
  const [currentFile, setCurrentFile] = useState("");

  const getUserInput = async (inputText) => {
    try {
      const response = await axios.post("http://localhost:5000/convertText", {
        he: inputText,
      });
      console.log("response", response.data);

      // Access the html property from the response
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

    // Attach the event listener to the document
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup the event listener on component unmount
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
      setHtmlResponse(newText); // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleItalicClick = () => {
    if (highlightedText) {
      const italicedText = `<em>${highlightedText}</em>`;
      const newText = userInput.replace(highlightedText, italicedText);
      setUserInput(newText);
      setHtmlResponse(newText); // Update the htmlResponse to reflect the bolded text in the preview area
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
      setHtmlResponse(newText); // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleSubListClick = () => {
    if (highlightedText) {
      const subList = `<li> <li>${highlightedText}</li></l1>`;
      const newText = userInput.replace(highlightedText, subList);
      setUserInput(newText);
      setHtmlResponse(newText); // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleCodeClick = () => {
    if (highlightedText) {
      const Code = `<code>${highlightedText}</code>`;
      const newText = userInput.replace(highlightedText, Code);
      setUserInput(newText);
      setHtmlResponse(newText); // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleTableClick = () => {
    if (highlightedText) {
      const Table = `<tr>${highlightedText}</tr>`;
      const newText = userInput.replace(highlightedText, Table);
      setUserInput(newText);
      setHtmlResponse(newText); // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleLinkClick = () => {
    if (highlightedText) {
      const Link = `<a>${highlightedText}</a>`;
      const newText = userInput.replace(highlightedText, Link);
      setUserInput(newText);
      setHtmlResponse(newText); // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleDownload = async () => {
    const userDownload = document.getElementById("htmlResponse").innerHTML;
    console.log(userDownload);
    try {
      const response = await axios.post("http://localhost:5000/downloadFile", {
        userContent: userDownload,
        fileName: "First Download",
      });
      alert("File Downloaded");

      // Access the html property from the response
    } catch (error) {
      console.log(error);
    }
  };

  const newFile = async () => {
    // const userDownload = document.getElementById('htmlResponse').innerHTML;
    const token = localStorage.getItem("token");
    // const Filename = document.getElementById("fileName").value;
    const Filename = fileName;
    if (userInput.length > 0) {
      userInput = "Update your file ";
    }
    console.log(token);
    try {
      const response = await axios.post("http://localhost:5000/createContent", {
        userContent: userInput,
        fileName: Filename,
        token: token,
      });
      alert("FILE CREATED");
    } catch (error) {
      console.log(error);
    }
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

  const getFiles = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:5000/getFiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setUserFile(response.data.content);

      console.log("userFile", userFile);
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
      // console.log('userFile', userFile)
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

  return (
    <div className=" flex flex-row-reverse ">
      <div>
        <p className="flex bg-black text-gray-50 w-screen h-10 px-7 overflow-hidden">
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7" onClick={getFiles}>
            <FontAwesomeIcon
              icon={faFileArchive}
              className="flex text-2xl text-indigo-600"
            />
          </button>
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7" onClick={handleBoldClick}>
            <FontAwesomeIcon icon={faBold} className="justify-center pl-2"  />
          </button>
          <button
            className="flex pe-10 font-bold pt-3 hover:bg-slate-500 w-7"
            onClick={handleItalicClick}
          >
            <FontAwesomeIcon icon={faItalic} className="justify-center pl-2"  />
          </button>{" "}
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7" onClick={handleListClick}>
            <FontAwesomeIcon icon={faListNumeric}  className="justify-center pl-2"/>
          </button>{" "}
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7" onClick={handleSubListClick}>
            <FontAwesomeIcon icon={faListDots} className="justify-center pl-2"  />
          </button>{" "}
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7">
            <FontAwesomeIcon icon={faQuoteLeft} className="justify-center pl-2"  />
          </button>{" "}
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7" onClick={handleCodeClick}>
            <FontAwesomeIcon icon={faCode} className="justify-center pl-2"  />
          </button>{" "}
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7" onClick={handleTableClick}>
            <FontAwesomeIcon icon={faTable} className="justify-center pl-2"  />
          </button>{" "}
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7" onClick={handleLinkClick}>
            <FontAwesomeIcon icon={faLink} className="justify-center pl-2"  />
          </button>
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7" onClick={handleDownload}>
            <FontAwesomeIcon icon={faArrowDown} className="justify-center pl-2"  />
          </button>
          <button className="flex pe-10 pt-3 hover:bg-slate-500 w-7" onClick={editFile}>
            <FontAwesomeIcon icon={faPencil} className="justify-center pl-2"  />
          </button>
          <p className="grid mt-2 pl-36 ">{currentFile}</p>
          <div className="flex text-slate-950 align-middle ">
            {" "}
            <button
              onClick={editFile}
              className=" w-32 bg-blue-900 align-middle ml-96 text-center hover:text-gray-100"
            >
              Save File
            </button>
          </div>
        </p>
        <div className="flex">
          <textarea
            className="bg-slate-300 h-screen w-[50%] border-r-4 border-b-cyan-500 outline-none pl-12 pt-5"
            placeholder="start writing here"
            id="userInput"
            value={userInput}
            onChange={(e) => {
              handleUserInputChange(e);
              // editFile();
            }}
          />
          <div
            className="bg-slate-300 h-screen w-[50%] outline-none p-10"
            id="htmlResponse"
            dangerouslySetInnerHTML={{ __html: htmlResponse }}
          />
        </div>
      </div>
      <div className=" bg-slate-500 py-3.5 pl-4 w-max h-screen flex flex-col absolute overflow-y-scroll">
        {userFile.map((file) => (
          <div
            key={file._id}
            onClick={(e) => {
              getFileId(file._id);
              getCurrentFile(file.fileName);
              viewFile();
            }}
            className=" mb-7 hover:bg-gray-600 text-gray-100 w-56 h-8 "
          >
            <FontAwesomeIcon icon={faFile} onClick={viewFile} /> {file.fileName}
            {/* <div onClick={viewFile}>hi</div> */}
          </div>
        ))}
        <div>
          {fileStatus ? (
            <div className=" flex mb-7 text-gray-100 w-48">
              {" "}
              <FontAwesomeIcon icon={faFile} />
              <input
                placeholder="File name"
                id="fileName"
                className=" flex bg-transparent  border-white border-b-2 outline-none pl-5"
                onChange={createNewfile}
              />{" "}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex ">
          <button
            className=" bg-slate-50 w-42 mr-auto pr-5 h-10 "
            onClick={(e) => {
              newFile();
              togglenewFile();
            }}
          >
            Add a new File
          </button>
          {fileStatus ? (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={cancelToggle}
              className=" bg-rose-700 text-gray-50 p-2 flex h-6"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <Login />
      <Register /> */}
    </div>
  );
};

export default Mainpage;
