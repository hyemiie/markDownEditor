// components/MarkdownWorkspace.jsx (UPDATED)
import React, { useState, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  MessageSquare,
  Plus,
  FileText,
  Users,
  Eye,
  EyeOff,
  Share,
  Trash,
  DeleteIcon,
  Trash2Icon,
  CircleArrowDown,
  RefreshCcw,
} from "lucide-react";
import axios from "axios";
import PageName from "./PageName";
import { useCollaboration } from "../src/hooks/collaboration";
import ShareModal from "./ShareModal";

const MarkdownWorkspace = ({ sharedDocumentId }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [selection, setSelection] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const editorRef = useRef(null);
  const updateTimeout = useRef(null);
  const [highlightRange, setHighlightRange] = useState(null);
  const [showPreview, setShowPreview] = useState(true);


  const [showShareModal, setShowShareModal] = useState(false);

  const BACKEND = "https://md-backend-dul2.onrender.com";
  const token = localStorage.getItem("token");

  // Get current user info
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${BACKEND}/api/user/current-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const res = response.data.signedInUser;
        console.log("gvbhnj", res);

        setCurrentUser({
          id: res._id,
          username: res.username,
          avatarColor: res.avatarColor || "#3b82f6",
        });
        console.log("current user", currentUser);
      } catch (err) {
        console.error("Error getting user info:", err);
      }
    };
    getUserInfo();
  }, []);

  // WebSocket collaboration
  const { activeUsers, sendContentUpdate, sendComment, deleteCommentWS } =
    useCollaboration(
      currentPage,
      currentUser?.id,
      currentUser?.username,
      currentUser?.avatarColor
    );

  // Load files on mount
  useEffect(() => {
    getFiles();
  }, []);

  // Load comments when page changes
  useEffect(() => {
    if (currentPage) {
      loadComments(currentPage);
    }
  }, [currentPage]);

  // Listen for remote updates
  useEffect(() => {
    const handleRemoteUpdate = (e) => {
      const { content } = e.detail;
      setPages((prev) =>
        prev.map((p) =>
          p._id === currentPage ? { ...p, userInput: content } : p
        )
      );
    };

    const handleNewComment = (e) => {
      setComments((prev) => [e.detail, ...prev]);
    };

    const handleDeleteComment = (e) => {
      setComments((prev) => prev.filter((c) => c._id !== e.detail));
    };

    window.addEventListener("remote-content-update", handleRemoteUpdate);
    window.addEventListener("new-comment", handleNewComment);
    window.addEventListener("delete-comment", handleDeleteComment);

    return () => {
      window.removeEventListener("remote-content-update", handleRemoteUpdate);
      window.removeEventListener("new-comment", handleNewComment);
      window.removeEventListener("delete-comment", handleDeleteComment);
    };
  }, [currentPage]);

  /* ---------------------------
      FILE MANAGEMENT
  --------------------------- */
  const getFiles = async () => {
    try {
      const res = await axios.get(`${BACKEND}/api/content/getAllFiles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response", res);
      setPages(res.data);
    } catch (err) {
      console.error("Error loading files:", err);
    }
  };

  const addNewPage = async () => {
    try {
      const response = await axios.post(
        `${BACKEND}/api/content/createContent`,
        {
          fileName: "New Document",
          userContent: "# New Document\n\nStart writing...",
          token,
        }
      );

      await getFiles();
      setCurrentPage(response.data._id);
    } catch (err) {
      console.error("Error creating file:", err);
    }
  };

  const deletePage = async (id) => {
    try {
      await axios.delete(`${BACKEND}/api/content/deleteFile`, {
        params: {
          messageID: id,
          currentUserID: currentUser?.id,
        },
      });

      if (currentPage === id) {
        setCurrentPage(null);
      }
      window.location.reload();
      // await getFiles();
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  /* ---------------------------
      CONTENT MANAGEMENT
  --------------------------- */
  const getCurrentPageContent = () => {
    const page = pages.find((p) => p._id === currentPage);
    return page?.userInput || "";
  };

  const updatePageContent = (content) => {
    // Update local state immediately
    setPages((prev) =>
      prev.map((p) =>
        p._id === currentPage ? { ...p, userInput: content } : p
      )
    );

    // Debounce backend save
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }

    updateTimeout.current = setTimeout(async () => {
      try {
        // Save to backend
        await axios.put(`${BACKEND}/api/content/updateFile`, {
          _id: currentPage,
          userInput: content,
        });

        // Broadcast to other users
        const cursorPos = editorRef.current?.selectionStart || 0;
        sendContentUpdate(content, cursorPos);
      } catch (err) {
        console.error("Error saving content:", err);
      }
    }, 500); // Wait 500ms after user stops typing
  };

  const updateFileName = async (_id, data) => {
    try {
      await axios.put(`${BACKEND}/api/content/updateFile`, {
        _id,
        ...data,
      });

      setPages((prev) =>
        prev.map((p) => (p._id === _id ? { ...p, ...data } : p))
      );
    } catch (err) {
      console.error("Error updating file name:", err);
    }
  };

  /* ---------------------------
      TEXT FORMATTING
  --------------------------- */
  const handleTextSelect = () => {
    const textarea = editorRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start !== end) {
        setSelection({ start, end });
      } else {
        setSelection(null);
      }
    }
  };

  const applyFormat = (format) => {
    if (!selection) return;

    const content = getCurrentPageContent();
    const { start, end } = selection;
    const selectedText = content.substring(start, end);

    let formattedText = selectedText;
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "underline":
        formattedText = `<u>${selectedText}</u>`;
        break;
    }

    const newContent =
      content.substring(0, start) + formattedText + content.substring(end);
    updatePageContent(newContent);
    setSelection(null);
  };

  /* ---------------------------
      COMMENTS
  --------------------------- */
  const loadComments = async (contentId) => {
    try {
      const res = await axios.get(
        `${BACKEND}/api/comments/content/${contentId}`
      );
      setComments(res.data.data || []);
    } catch (err) {
      console.error("Error loading comments:", err);
      setComments([]);
    }
  };

  const addComment = async () => {
    if (!selection || !currentUser) return;
    console.log("current user", currentUser);
    const commentText = prompt("Enter your comment:");
    if (!commentText) return;

    try {
      const response = await axios.post(`${BACKEND}/api/comments`, {
        contentId: currentPage,
        userId: currentUser.id,
        commentText,
        selectionStart: selection.start,
        selectionEnd: selection.end,
      });

      const newComment = response.data.data;
      console.log("omment response", response.data);
      setComments((prev) => [newComment, ...prev]);
      sendComment(newComment);
      setSelection(null);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`${BACKEND}/api/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      deleteCommentWS(commentId);
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const highlightText = () => {
    const page = getCurrentPageContent();
    console.log("page", page, comments);
    const textarea = editorRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start !== end) {
        setSelection({ start, end });
      } else {
        setSelection(null);
      }
    }
  };

    // const renderMarkdown = (text) => {
    //   let html = text;

    //   html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>');
    //   html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-4 mb-2">$1</h2>');
    //   html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-4 mb-2">$1</h1>');
    //   html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    //   html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    //   html = html.replace(/\n/g, '<br />');

    //   return html;
    // };

  // const renderMarkdown = (text) => {
  //   if (!text) return "";

  //   let html = text;

  //   if (highlightRange) {
  //     const { start, end } = highlightRange;

  //     const before = html.slice(0, start);
  //     const highlighted = html.slice(start, end);
  //     const after = html.slice(end);

  //     html =
  //       before +
  //       `<mark style="background-color:#fde68a; padding:2px; border-radius:3px;">` +
  //       highlighted +
  //       `</mark>` +
  //       after;
  //   }

  //   // markdown rules
  //   html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  //   html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  //   html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  //   html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  //   html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  //   html = html.replace(/\n/g, "<br />");

  //   return html;
  // };


  const renderMarkdown = (text) => {
  if (!text) return "";

  let html = text;

  // 1️⃣ Insert stable highlight markers (no HTML yet)
  if (highlightRange) {
    const { start, end } = highlightRange;

    html =
      html.slice(0, start) +
      "%%HIGHLIGHT_START%%" +
      html.slice(start, end) +
      "%%HIGHLIGHT_END%%" +
      html.slice(end);
  }

  // 2️⃣ Apply markdown rules
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-4 mb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-4 mb-2">$1</h1>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/\n/g, '<br />');

  // 3️⃣ Convert markers → actual highlight HTML
  html = html
    .replace("%%HIGHLIGHT_START%%", '<mark class="bg-yellow-200 px-1 rounded">')
    .replace("%%HIGHLIGHT_END%%", "</mark>");

  return html;
};

  const loadSharedDocument = async (id) => {
    try {
      // Change to GET request with the new endpoint
      const res = await axios.get(`${BACKEND}/api/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update to match new response structure
      const document = res.data.data; // Changed from res.data.file

      console.log("Loaded shared document:", document);

      setPages([document]);
      setCurrentPage(id);

      // Also load comments for this document
      loadComments(id);
    } catch (err) {
      console.error("Error loading shared document:", err);
      alert("Could not load document. Please check if you have access.");
    }
  };

  useEffect(() => {
    if (sharedDocumentId) {
      loadSharedDocument(sharedDocumentId);
    } else {
      console.log("heloooo");
      getFiles();
    }
  }, [sharedDocumentId]);

  const reload = () =>{
    window.location.reload()
  }

  return (
    <div className="flex h-screen bg-gray-0">
      {/* Sidebar - Pages */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FileText size={20} />
            Documents
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {pages.length === 0 ? (
            <p className="text-gray-500 text-sm p-3">
              No documents yet. Create one to get started!
            </p>
          ) : (
            pages.map((page) => (
              <div
                key={page._id}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition-all ${
                  currentPage === page._id
                    ? "bg-blue-50 border-2 border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                }`}
              >
                <div onClick={() => setCurrentPage(page._id)}>
                  <PageName page={page} onRename={updateFileName} />
                  <div className="text-xs text-gray-500 mt-1">
                    {(page.userInput || "").split("\n")[0].substring(0, 20)}...
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Delete this document?")) {
                        deletePage(page._id);
                      }
                    }}
                    className="text-xs text-red-700 hover:text-red-900 mt-2 ml-auto text-right"
                  >
                    <Trash2Icon size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={addNewPage}
          className="m-4 p-3 bg-blue-950 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} />
          New Document
        </button>
      </div>

      {showShareModal && (
        <ShareModal
          contentId={currentPage}
          onClose={() => setShowShareModal(false)}
        />
      )}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => applyFormat("bold")}
              disabled={!selection}
              className={`p-2 rounded hover:bg-gray-100 ${
                !selection ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Bold"
            >
              <Bold size={20} />
            </button>
            <button
              onClick={() => applyFormat("italic")}
              disabled={!selection}
              className={`p-2 rounded hover:bg-gray-100 ${
                !selection ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Italic"
            >
              <Italic size={20} />
            </button>
            <button
              onClick={() => applyFormat("underline")}
              disabled={!selection}
              className={`p-2 rounded hover:bg-gray-100 ${
                !selection ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Underline"
            >
              <Underline size={20} />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300"></div>

          <button
            onClick={addComment}
            disabled={!selection || !currentPage}
            className={`p-2 rounded hover:bg-gray-100 flex items-center gap-2 ${
              !selection || !currentPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Add Comment"
          >
            <MessageSquare size={20} />
            <span className="text-sm">Comment</span>
          </button>

          <div className="flex-1"></div>

          {/* Active Collaborators */}
          <RefreshCcw onClick={reload}/>
          {currentPage && (
            <div className="flex items-center gap-2">
              <Users size={20} className="text-gray-600" />
              {currentUser && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold relative"
                  style={{ backgroundColor: currentUser.avatarColor }}
                  title={`${currentUser.username} (You)`}
                >
                  {currentUser.username.toUpperCase()}
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white"></span>
                </div>
              )}
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold relative"
                  style={{ backgroundColor: user.avatarColor }}
                  title={user.username}
                >
                  {user.username[0].toUpperCase()}
                  {user.active && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white"></span>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowComments(!showComments)}
            className="p-2 rounded hover:bg-gray-100"
            title={showComments ? "Hide Comments" : "Show Comments"}
          >
            {showComments ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            disabled={!currentPage}
            className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
            title="Share Document"
          >
            <Share size={20} />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Editor Area */}
      {!currentPage ? (
  <div className="flex-1 flex items-center justify-center text-gray-500">
    <div className="text-center px-4">
      <FileText size={64} className="mx-auto mb-4 opacity-50" />
      <p className="text-xl">Select a document to start editing</p>
      <p className="text-sm mt-2">or create a new one</p>
    </div>
  </div>
) : (
  <div className="flex-1 flex overflow-hidden flex-col lg:flex-row">
    {/* Editor + Preview */}
    <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
      {/* Text Editor */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto min-h-[40vh] md:min-h-full">
        <textarea
          ref={editorRef}
          value={getCurrentPageContent()}
          onChange={(e) => updatePageContent(e.target.value)}
          onSelect={handleTextSelect}
          onMouseUp={handleTextSelect}
          className="w-full h-full min-h-full p-4 border border-gray-200 rounded-lg focus:outline-none font-mono text-sm resize-none"
          placeholder="Start typing with Markdown support..."
        />
      </div>

      {/* Mobile Preview Toggle */}
      <div className="md:hidden px-4 pb-2">
        <button
          onClick={() => setShowPreview((p) => !p)}
          className="text-sm text-blue-600 underline"
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      {/* Live Preview */}
      {showPreview && (
        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-white border-t md:border-t-0 md:border-l border-gray-200 min-h-[40vh] md:min-h-full">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase">
              Preview
            </h3>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(getCurrentPageContent()),
              }}
            />
          </div>
        </div>
      )}
    </div>

    {/* Comments Panel */}
    {showComments && (
      <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 overflow-y-auto max-h-[50vh] lg:max-h-full">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <MessageSquare size={20} />
          Comments ({comments.length})
        </h3>

        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No comments yet. Select text and click "Comment" to add one.
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="p-3 bg-zinc-200 border border-blue-200 rounded-lg"
              >
                <div
                  className="flex items-start justify-between mb-2 cursor-pointer"
                  onClick={() =>
                    setHighlightRange({
                      start: comment.selectionStart,
                      end: comment.selectionEnd,
                    })
                  }
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        backgroundColor:
                          comment.userId?.avatarColor || "#6b7280",
                      }}
                    >
                      {comment.userId?.username?.[0]?.toUpperCase() || "?"}
                    </div>
                    <span className="font-bold text-sm text-gray-800">
                      {comment.userId?.username || "Unknown"}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteComment(comment._id)}
                    className="text-gray-400 hover:text-red-500 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-sm text-gray-700 mb-2">
                  {comment.commentText}
                </p>

                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default MarkdownWorkspace;