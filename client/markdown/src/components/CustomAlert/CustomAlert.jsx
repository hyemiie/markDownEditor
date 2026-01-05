import React from 'react';
import './customAlert.css'; // Import CSS for styling
<<<<<<< HEAD
import { AlarmCheck, AlertCircle, AlertCircleIcon, Clock, Clock10, History, TimerIcon } from 'lucide-react';
=======
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
<<<<<<< HEAD
          <History size={48}/>
        <div><span>{message}</span>
        <button onClick={onClose}>Dismiss</button>
      </div>
=======
        <span>{message}</span>
        <button onClick={onClose}>OK</button>
>>>>>>> 2623caa6748c6199bddd8d7e5b311f98bbbb3079
      </div>
    </div>
  );
};

export default CustomAlert;
