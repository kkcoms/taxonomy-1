// Microphone.js
import React, { useState, useEffect, useContext, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRecordVoice } from "app/(speech)/src/hooks/useRecordVoice.js";
import { IconMicrophone } from "app/(speech)/src/app/components/IconMicrophone.js";
import TranscriptionContext from './TranscriptionContext';

// Dynamic import for EditorJS with SSR disabled
const EditorJS = dynamic(() => import('@editorjs/editorjs'), { ssr: false });



const Microphone = () => {
  const [isRecording, setIsRecording] = useState(false);
  const accumulatedFinalTranscript = useRef(""); // Ref to keep track of the accumulated final transcript
  const { setTranscription } = useContext(TranscriptionContext);
  const editorRef = useRef<EditorJS>(null);
  const recognitionActive = useRef(false); // Ref to track active state of recognition

  // Define the function before using it in the hook
  const handleTranscriptionComplete = (transcriptionText) => {
    setTranscription(transcriptionText);
  };

  const { startRecording, stopRecording } = useRecordVoice(handleTranscriptionComplete);

  // Initialize webkitSpeechRecognition only if running in the browser
  const recognition = typeof window !== 'undefined' ? new (window.webkitSpeechRecognition || window.SpeechRecognition)() : null;

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    recognitionActive.current = !isRecording; // Update the active state
    if (!isRecording) {
      accumulatedFinalTranscript.current = ""; // Clear the accumulated transcript
      if (recognition) {
        console.log("Starting recognition and recording");
        recognition.start();
        startRecording(); // Start audio recording as well
      }
    } else {
      if (recognition) {
        console.log("Aborting recognition and stopping recording");
        recognition.abort(); // Abort speech recognition
        stopRecording(); // Stop audio recording
        setTranscription(""); // Clear the transcription context
      }
    }
  };

  useEffect(() => {
    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'es-MX';

      recognition.onresult = (event) => {
        if (!recognitionActive.current) {
          return; // Ignore results if recognition is not active
        }
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            accumulatedFinalTranscript.current += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentTranscript = accumulatedFinalTranscript.current + interimTranscript;
        setTranscription(currentTranscript);

        if (editorRef.current) {
          editorRef.current.blocks.insert('paragraph', { text: currentTranscript }, {}, 0, true);
        }
      };

      recognition.onend = () => {
        console.log("Recognition service has ended");
      };
    }
  }, [recognition]);

  // Your existing button style logic
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
    backgroundColor: isRecording ? '#ef4444' : '#1E293B',
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
            {/*<div className="live-transcription-output">
        <p>{accumulatedFinalTranscript.current}</p>
      </div>*/}
    </>
  );
};
export { Microphone };
