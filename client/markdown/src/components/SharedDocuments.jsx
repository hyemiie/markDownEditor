// components/SharedDocument.jsx (NEW FILE)
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MarkdownWorkspace from '../Workspace';

const SharedDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const BACKEND = "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    checkAccess();

  }, [id]);

  const checkAccess = async () => {
    try {
      const accessResponse = await axios.get(`${BACKEND}/api/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("accessResponse", accessResponse)

      setHasAccess(true);
    } catch (err) {
      if (err.response?.status === 403) {
        setHasAccess(false);
      } else if (err.response?.status === 401) {
        navigate('/login?redirect=/document/' + id);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to view this document.</p>
        </div>
      </div>
    );
  }

  if(!token) {
    return <div>You dont have access to view this document ...please login</div>
  }

  return <MarkdownWorkspace sharedDocumentId={id} />;
};

export default SharedDocument;