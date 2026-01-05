// components/ShareModal.jsx (NEW FILE)
import React, { useState } from 'react';
import { Share2, Copy, Check, Mail } from 'lucide-react';

const ShareModal = ({ contentId, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const shareUrl = `${window.location.origin}/document/${contentId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendInvite = async () => {
    if (!email) return;
    
    setSending(true);
    try {
      await fetch('/api/content/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contentId, 
          email,
          inviteUrl: shareUrl 
        })
      });
      
      alert('Invitation sent!');
      setEmail('');
    } catch (err) {
      alert('Error sending invite');
    }
    setSending(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Share2 size={24} />
            Share Document
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Anyone with this link can view and edit this document
          </p>
        </div>

     
      </div>
    </div>
  );
};

export default ShareModal;