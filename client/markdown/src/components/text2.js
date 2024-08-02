


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
  faEye,
  faFile,
  faFileArchive,
  faImagePortrait,
  faItalic,
  faLink,
  faList12,
  faListDots,
  faListNumeric,
  faMoon,
  faPenAlt,
  faPencil,
  faQuoteLeft,
  faSun,
  faTable,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { saveAs } from "file-saver";
import CustomAlert from './CustomAlert/CustomAlert';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from "react";
const Mainpage = () => {
  const [htmlResponse, setHtmlResponse] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userFile, setUserFile] = useState([]);
  const [selectedID, setSelectedID] = useState([]);
  const [fileStatus, setFileStatus] = useState(false);
  const [fileName, setFileName] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [fileListStatus, setFileListStatus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [darkScreen, setDarkscreen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [messageID, setMessageID] = useState(null);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [smallScreen, setSmallScreen] = useState(null);

  const pdfContentRef = useRef(null);


  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertVisible(true);
      };
    
      const handleAlertClose = () => {
        setAlertVisible(false);
        setAlertMessage('');
      }


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
      const subList = `<ul>${highlightedText
        .split("\n")
        .map((line) => `<li>${line.trim()}</li>`)
        .join("")}</ul>`;
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
    const userDownload = document.getElementById("htmlResponse").value;
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
    // const userDownload = document.getElementById("htmlResponse").innerHTML;
    console.log('userDownload', htmlResponse)

    const blob = new Blob([userDownload], {
      type: "text/markdown;charset=utf-8",
    });
    saveAs(blob, "document.md");
    showAlert("file Downloaded");
  };


  const downloadPDF = () => {
    const pdf = new jsPDF();
    
    // Split the markdown into lines to add them to the PDF
    const lines = htmlResponse.split('\n');
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 10; // margin from the edges
    let currentY = margin;

    lines.forEach((line) => {
      if (currentY + 10 > pageHeight) {
        pdf.addPage();
        currentY = margin; // reset Y position for the new page
      }
      pdf.text(line, margin, currentY);
      currentY += 10; // move down for the next line
    });

    pdf.save('document.pdf');
  };


  const handleDownloadPdf = () => {
    const userDownload = document.getElementById("htmlResponse").innerHTML;

    const blob = new Blob([userDownload], {
      type: "text/markdown;charset=utf-8",
    });
    saveAs(blob, "document.md");
    showAlert("file Downloaded");
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
      showAlert("File created");
      console.log("new file response", response);
      setUserFile(response.data);
      setFileStatus(false);
    } catch (error) {
      console.error("An error occurred:", error);
      showAlert("Oooppsss...seems like there's a problem");

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
      showAlert('File Deleted successfuly')
    } catch (error) {
      console.error("Error deleting file:", error); // Log any errors to the console
      showAlert('File Deletion failed')

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
      showAlert("Message deleted");
      setMessageID(null);
      setUserFile(response.data.updatedChat);
    } catch (error) {
      console.error(
        "Error deleting message:",
        error.response?.data || error.message
      );
      showAlert("Failed to delete message");
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
    setUserInput("");
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

  const checkSmallScreen = () => {
    setSmallScreen((prevState) => !prevState);
    if (smallScreen) {
      console.log(" small screen true");
    } else {
      console.log(" small screen false");
    }
  };

  const changeTheme = () => {
    setDarkscreen((prevState) => !prevState);
  };
  useEffect(() => {
    if (selectedID.length < 1) {
      setUserInput(`# Introductions
  
  Hello, I am your first markdown file. I'm here to guide you on the features of this app. To view changes for the first time, press any key on you input field.
  
  ## Key Features:
  
  - **Simple Syntax**: Effortlessly format your text using straightforward markdown syntax. Create headers, lists, links, images, and more with just a few characters.
    
  - **Live Preview**: Visualize your document instantly with our real-time live preview feature. See your changes as you type, making editing seamless.
  
  - **Export Options**: Easily save your work in multiple formats, including HTML and PDF, for convenient sharing and publishing.
  
  - **Custom Themes**: Personalize your writing environment with a variety of stylish, customizable themes to match your aesthetic.
  
  - **Syntax Highlighting**: Benefit from clear syntax highlighting for code snippets, making it perfect for documentation and programming notes.
  
  \`\`\`python
  def hello_world():
      print("Hello, World!")
  \`\`\`
  
  - **Cross-Platform Accessibility**: Access your markdown editor from any device, ensuring that your work is always within reach, whether you’re at home or on the go.
  
  To start working, click on the file icon at the far right to choose or create files. Cheers!!!!`);
    }
  }, [selectedID]);
  

  useEffect(() => {
    const userName = localStorage.getItem("currentUser");
    setCurrentUserName(userName);

    return () => {};
  }, []);

  return (
    <div className="flex allPage">
      {alertVisible && (
        <CustomAlert message={alertMessage} onClose={handleAlertClose} />
      )}
      <div className="w-full overflow-hidden">
        <div className=" this flex flex-col overflow-hidden top-0 absolute h-[18%] ">
          <div className={ `flex flex-wrap  text-gray-50 w-screen flex-col items-center justify-l ${
                !darkScreen ? " bg-slate-700 text-slate-50 border-b border-zinc-00" : "bg-white"
              }`}
              >
            <div
              className={`flex pl-4 w-screen overflow-y-scroll bg-white h-16 items-center justify-center responsiveBtns border-b border-slate-600 ${
                !darkScreen ? "bg-slate-700 text-slate-50 border-b border-zinc-00" : "bg-slate-700"
              } `}
            >
              <button
                className="flex pe-10 pt-2 pl-4   w-7  "
                onClick={() => {
                  getFiles();
                  viewStatusTrue();
                }}
                onMouseEnter={() => handleMouseEnter("fileArchive")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faFileArchive}
                  className="font text-2xl text-cyan-600 "
                />
                {/* text-indigo-600 */}

                {hoveredButton == "fileArchive" ? <p>View Files</p> : ""}
              </button>

              <button
                className={`flex pe-10 pt-6 pl-2   w-7  h-16 ${
                  darkScreen
                    ? "bg-transparent text-slate-50"
                    : "bg-slate-transparent"
                } `}
                onClick={handleBoldClick}
                onMouseEnter={() => handleMouseEnter("bold")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faBold}
                  className={`font justify-center pl-2 text-slate-100 text-xl  ${
                    darkScreen ? "bg-transparent text-white" : ""
                  } `}
                />
                {hoveredButton == "bold" ? <p>Bold</p> : ""}
              </button>
              <button
                className={`flex pe-10 pt-6 pl-2   w-7  h-16 ${
                  darkScreen
                    ? "bg-transparent text-slate-50"
                    : "bg-slate-transparent"
                } `}
                onClick={handleItalicClick}
                onMouseEnter={() => handleMouseEnter("Italic")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faItalic}
                  className={` font justify-center pl-2 text-slate-100 text-xl  ${
                    darkScreen ? "bg-transparent text-white" : ""
                  } `}
                />
                {hoveredButton == "Italic" ? <p>Italic</p> : ""}
              </button>
              <button
                className={`flex pe-10 pt-6 pl-2  w-7  h-16 ${
                  darkScreen
                    ? "bg-transparent text-slate-50"
                    : "bg-slate-transparent"
                } `}
                onClick={handleListClick}
                onMouseEnter={() => handleMouseEnter("List")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faListNumeric}
                  className={`justify-center pl-2 text-slate-100 text-xl  ${
                    darkScreen ? "bg-transparent text-white" : ""
                  } `}
                />
                {hoveredButton == "List" ? <p>List</p> : ""}
              </button>
              <button
                className={`flex pe-10 pt-6 pl-2   w-7  h-16 ${
                  darkScreen
                    ? "bg-transparent text-slate-50"
                    : "bg-slate-transparent"
                } `}
                onClick={handleSubListClick}
                onMouseEnter={() => handleMouseEnter("SubList")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faListDots}
                  className={`justify-center pl-2 text-slate-100 text-xl  ${
                    darkScreen ? "bg-transparent text-white" : ""
                  } `}
                />
                {hoveredButton == "SubList" ? <p>SubList</p> : ""}
              </button>

              <button
                className={`flex pe-10 pt-6 pl-2   w-7  h-16 ${
                  darkScreen
                    ? "bg-transparent text-slate-50"
                    : "bg-slate-transparent"
                } `}
                onMouseEnter={() => handleMouseEnter("Quote")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className={`justify-center pl-2 text-slate-100 text-xl  ${
                    darkScreen ? "bg-transparent text-white" : ""
                  } `}
                />
                {hoveredButton == "Quote" ? <p>Quote</p> : ""}
              </button>
              <button
                className={`flex pe-10 pt-6 pl-2   w-7  h-16 ${
                  darkScreen
                    ? "bg-transparent text-slate-50"
                    : "bg-slate-transparent"
                } `}
                onClick={handleCodeClick}
                onMouseEnter={() => handleMouseEnter("Code")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faCode}
                  className={`justify-center pl-2 text-slate-100 text-xl  ${
                    darkScreen ? "bg-transparent text-white" : ""
                  } `}
                />
                {hoveredButton == "Code" ? <p>Code</p> : ""}
              </button>
              {/* <button
              className="flex pe-10 pt-3 hover:bg-slate-500 w-7"
              onClick={handleTableClick}
              onMouseEnter={() => handleMouseEnter("Table")}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faTable} className="justify-center pl-2" />
              {hoveredButton == "Table" ? <p>Table</p> : ""}
            </button> */}
              <button
                className={`flex pe-10 pt-6 pl-2   w-7  h-16 ${
                  darkScreen
                    ? "bg-transparent text-slate-50"
                    : "bg-slate-transparent"
                } `}
                onClick={handleLinkClick}
                onMouseEnter={() => handleMouseEnter("Link")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faLink}
                  className={`justify-center pl-2 text-slate-100 text-xl  ${
                    darkScreen ? "bg-transparent text-white" : ""
                  } `}
                />
                {hoveredButton == "Link" ? <p>Link</p> : ""}
              </button>
              <button
                className={`flex pe-10 pt-6 pl-2  w-7  h-16 ${
                  darkScreen
                    ? "bg-transparent text-slate-50"
                    : "bg-slate-transparent"
                } `}
                onClick={handleDownload}
                onMouseEnter={() => handleMouseEnter("Download")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className={`justify-center pl-2 text-slate-100 text-xl  ${
                    darkScreen ? "bg-transparent text-white" : ""
                  } `}
                />
                {hoveredButton == "Download" ? <p>Download</p> : ""}
              </button>
              <button
  className={`flex pe-10 pt-6 pl-2  w-7  h-16 ${
                  darkScreen
                    ? "bg-transparent text-slate-50"
                    : "bg-slate-transparent"
                } `}                onClick={editFile}
                onMouseEnter={() => handleMouseEnter("Edit")}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon
                  icon={faPencil}
                  className={`justify-center pl-2 text-slate-100 text-xl  ${
                    darkScreen ? "bg-transparent text-white" : ""
                  } `}
                />
                {hoveredButton == "Edit" ? <p>Edit File</p> : ""}
              </button>
              <div className="flex ml-auto w-24 p-6 items-center">
                
                <button onClick={changeTheme} className="flextext-3xl p-2 ">
                { !darkScreen? <FontAwesomeIcon icon={faMoon} className="flex text-white"/> :  <FontAwesomeIcon icon={faSun} className="flex text-white"/>}</button>
              </div>
            </div>
          </div>

          <div className={`flex items-center justify-between  flex-wrap bg-white border-b-2 border-gray-200 border-solid p-2  ${
                    darkScreen ? "  bg-slate-900 text-white" : ""

                  } `}>
            <p className=" text-gray-500 text-3xl ml-4 font-bold font-serif ">
              {currentFile}
            </p>

            <div className="flex">
              <button
                onClick={editFile}
                className="text-center bg-cyan-600 text-white hover:text-gray-100 p-2 rounded mr-8 "
              >
                Save File
              </button>
            </div>
          </div>
        </div>



        <div className="flex w-auto filesDiv h-[80%] ">
          {!currentFile.length < 1 ? (
            <textarea
           className={`bg-white h-svh  overflow-y-scroll outline-none pt-40  pl-10 pr-20 text-2xl  w-[100%]  border-r border-black font-outfit   ${
              smallScreen ? "show"  :"hide"
            } ${darkScreen ? "bg-slate-700 text-slate-50" : "bg-slate-100 "}`}
              placeholder="start writing here"
              id="userInput"
              value={userInput}
              onChange={(e) => {
                handleUserInputChange(e);
              }}
            />
          ) : (
            <textarea
           className={`bg-white  h-svh  overflow-y-scroll outline-none pt-40  pl-10 pr-20 text-2xl   w-[100%] border-r border-black font-grotesk font-light  ${
              smallScreen ? "show " :"hide"
            } ${ darkScreen ? "bg-slate-700  text-slate-50" : "bg-slate-100 "}`}
              placeholder="start writing here"
              id="userInput"
              value={userInput}
              onChange={handleUserInputChange}
            />
          )}
          <div
            className={`bg-white  h-svh overflow-y-scroll outline-none pt-40 pl-10 pr-20   text-2xl  w-[100%] font-grotesk  ${
              smallScreen ? "hide":'show' 
            } ${ darkScreen ? "bg-slate-700  text-slate-50" : "bg-slate-100 "}`}
            id="htmlResponse"
            dangerouslySetInnerHTML={{ __html: htmlResponse }}
            ref={pdfContentRef}
          />

          <div
            className={`bg-slate-200 buttonContainer absolute right-0 h-full ${
              darkScreen ? "bg-gray-800" : "bg-transparent"
            }`}
          >
            <button
              className="responsiveView flex ml-auto text-gray-400 p-2 w-12 text-center items-center justify-center rounded cursor-pointer"
              onClick={checkSmallScreen}
            >
              {smallScreen ? (
                <FontAwesomeIcon icon={faPenAlt} className="text-xl" />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
        </div>
      </div>
      {fileListStatus && (
        <div className="bg-slate-500 py-3.5  w-80 h-screen flex flex-col overflow-y-auto fixed p-4">
          <div className="flex justify-between items-center pb-8">
            <h2 className="flex text-4xl text-teal-100">{currentUserName}</h2>
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={viewStatusFalse}
              className="flex w-6 h-6 text-xl p-5 rounded-xs hover:bg-slate-500 hover:text-slate-100 text-slate-50 cursor-pointer"
            />
          </div>

          {userFile.map((file) => (
            <div
              key={file._id}
              className="mb-7 hover:bg-gray-700 text-gray-100 w-88 h-16 flex justify-between items-center mb-4 p-2 border-b border-slate-400"
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
                    window.confirm("Are you sure you want to delete this file?")
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
          <div className="flex mt-8 ml-auto">
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
    </div>
  );
};

export default Mainpage;




