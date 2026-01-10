import React from 'react';
import './customAlert.css'; // Import CSS for styling
import { AlarmCheck, AlertCircle, AlertCircleIcon, Clock, Clock10, History, TimerIcon } from 'lucide-react';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
          <History size={48}/>
        <div><span>{message}</span>
        <button onClick={onClose}>Dismiss</button>
      </div>
      </div>
    </div>
  );
};

export default CustomAlert;
