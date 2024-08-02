import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './home.css'; // Import the CSS file

const Home = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState(''); // Initialize to an empty string

  useEffect(() => {
    if (!text) return; 
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div>
      <p className="typing">{displayedText}<span className="cursor">|</span></p>
    </div>
  );
};

// Default props
Home.defaultProps = {
  text: '',
  speed: 100,
};

// Prop types
Home.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

export default Home;
