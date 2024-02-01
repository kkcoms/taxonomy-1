// TranscriptionContext.js
import React, { useState, useContext } from 'react';

// Define the shape of your context with TypeScript or PropTypes
const TranscriptionContext = React.createContext({
  transcription: '',
  setTranscription: () => {},
  finalTranscription: '',
  setFinalTranscription: () => {}
});

export const TranscriptionProvider = ({ children }) => {
  const [transcription, setTranscription] = useState('');
  const [finalTranscription, setFinalTranscription] = useState('');

  const value = {
    transcription,
    setTranscription,
    finalTranscription,
    setFinalTranscription
  };

  return (
    <TranscriptionContext.Provider value={value}>
      {children}
    </TranscriptionContext.Provider>
  );
};

// Custom hook to use the TranscriptionContext
export const useTranscription = () => {
  const context = useContext(TranscriptionContext);
  if (!context) {
    throw new Error('useTranscription must be used within a TranscriptionProvider');
  }
  return context;
};

export default TranscriptionContext;
