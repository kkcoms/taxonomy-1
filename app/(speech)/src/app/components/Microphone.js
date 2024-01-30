// microphone.js
// microphone.js
import React, { useState, useContext } from 'react';
import { useRecordVoice } from "app/(speech)/src/hooks/useRecordVoice.js";
import { IconMicrophone } from "app/(speech)/src/app/components/IconMicrophone.js";
import TranscriptionContext from './TranscriptionContext';

const Microphone = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { setTranscription } = useContext(TranscriptionContext);

  const handleTranscriptionComplete = (transcriptionText) => {
    setTranscription(transcriptionText);
  };

  const { startRecording, stopRecording } = useRecordVoice(handleTranscriptionComplete);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    isRecording ? stopRecording() : startRecording();
  };

  // Adjust the size, shadow, and fading effects in these styles
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px', // Increased size for visibility
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isRecording ? '#ef4444' : '#0F172A',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Added shadow for depth
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    zIndex: 1000,
    animation: isRecording ? 'pulse 1s infinite' : 'gentlePulse 2s infinite', // Apply animation based on state
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes gentlePulse {
            0% { transform: translateX(-50%) scale(1); opacity: 1; }
            50% { transform: translateX(-50%) scale(1.05); opacity: 0.9; }
            100% { transform: translateX(-50%) scale(1); opacity: 1; }
          }
        `}
      </style>
      <div style={buttonStyle} onClick={toggleRecording}>
        <IconMicrophone />
      </div>
    </>
  );
};

export { Microphone };
