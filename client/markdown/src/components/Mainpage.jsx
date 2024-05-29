import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mainpage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faArrowDown, faBold, faCalendar, faCalendarAlt, faCode, faCoffee, faImagePortrait, faItalic, faLink, faListDots, faListNumeric, faQuoteLeft, faTable } from '@fortawesome/free-solid-svg-icons';
import Login from "./Login/Login";
import Register from "./Register/Register";

const Mainpage = () => {
  const [htmlResponse, setHtmlResponse] = useState("");
  const [highlightedText, setHighlightedText] = useState('');
  const [userInput, setUserInput] = useState('');

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
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleUserInputChange = (e) => {
    const inputText = e.target.value;
    setUserInput(inputText);
    getUserInput(inputText);
  };

  const handleBoldClick = () => {
    if (highlightedText) {
      const boldedText = `<b>${highlightedText}</b>`;
      const newText = userInput.replace(highlightedText, boldedText);
      setUserInput(newText);
      setHtmlResponse(newText);  // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleItalicClick = () => {
    if (highlightedText) {
      const italicedText = `<em>${highlightedText}</em>`;
      const newText = userInput.replace(highlightedText, italicedText);
      setUserInput(newText);
      setHtmlResponse(newText);  // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };


  const handleListClick = () => {
    if (highlightedText) {
      const List = highlightedText.split('\n').map(line => `<li>${line.trim()}</li>`).join('');
      const newText = userInput.replace(highlightedText, List);
      setUserInput(newText);
      setHtmlResponse(newText);  // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleSubListClick = () => {
    if (highlightedText) {
      const subList = `<li> <li>${highlightedText}</li></l1>`;
      const newText = userInput.replace(highlightedText, subList);
      setUserInput(newText);
      setHtmlResponse(newText);  // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleCodeClick = () => {
    if (highlightedText) {
      const Code = `<code>${highlightedText}</code>`;
      const newText = userInput.replace(highlightedText, Code);
      setUserInput(newText);
      setHtmlResponse(newText);  // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };


  const handleTableClick = () => {
    if (highlightedText) {
      const Table = `<tr>${highlightedText}</tr>`;
      const newText = userInput.replace(highlightedText, Table);
      setUserInput(newText);
      setHtmlResponse(newText);  // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleLinkClick = () => {
    if (highlightedText) {
      const Link = `<a>${highlightedText}</a>`;
      const newText = userInput.replace(highlightedText, Link);
      setUserInput(newText);
      setHtmlResponse(newText);  // Update the htmlResponse to reflect the bolded text in the preview area
    }
  };

  const handleDownload =async() =>{
    const userDownload = document.getElementById('htmlResponse').innerHTML;
    console.log(userDownload)
    try {
      const response = await axios.post("http://localhost:5000/downloadFile", {
        userContent: userDownload,
        fileName:'First Download'
      });
      alert('File Downloaded');

  
      // Access the html property from the response
    } 
    catch(error){
      console.log(error)
    }

  }

 



  return (
    <div className="overflow-hidden">
      <p className="flex bg-black text-gray-50 w-screen h-10 px-7 overflow-hidden">
        <button className="flex pe-10 pt-3" onClick={handleBoldClick}><FontAwesomeIcon icon={faBold} /></button>
        <button className="flex pe-10 font-bold pt-3" onClick={handleItalicClick}><FontAwesomeIcon icon={faItalic} /></button>{" "}
        <button className="flex pe-10 pt-3" onClick={handleListClick}><FontAwesomeIcon icon={faListNumeric} /></button>{" "}
        <button className="flex pe-10 pt-3" onClick={handleSubListClick}><FontAwesomeIcon icon={faListNumeric} /></button>{" "}
        <button className="flex pe-10 pt-3" ><FontAwesomeIcon icon={faQuoteLeft} /></button>{" "}
        <button className="flex pe-10 pt-3" onClick={handleCodeClick}><FontAwesomeIcon icon={faCode} /></button>{" "}
        <button className="flex pe-10 pt-3" onClick={handleTableClick}><FontAwesomeIcon icon={faTable} /></button>{" "}
        <button className="flex pe-10 pt-3" onClick={handleLinkClick}><FontAwesomeIcon icon={faLink} /></button>
        <button className="flex pe-10 pt-3" onClick={handleDownload}><FontAwesomeIcon icon={faArrowDown} /></button>
      </p>
      <div className="flex">
        <textarea
          className="bg-slate-300 h-screen w-[50%] border-r-4 border-b-cyan-500 outline-none p-5"
          placeholder="start writing here"
          id="userInput"
          value={userInput}
          onChange={handleUserInputChange}
        />
        <div
          className="bg-slate-300 h-screen w-[50%] outline-none p-10"
          id="htmlResponse"
          dangerouslySetInnerHTML={{ __html: htmlResponse }}
        />
      </div>
      <Login/>
      <Register/>
    </div>
  );
};

export default Mainpage;
