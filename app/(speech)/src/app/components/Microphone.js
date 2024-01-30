// microphone.js
import React, { useState, useContext } from 'react';
import { useRecordVoice } from "app/(speech)/src/hooks/useRecordVoice.js";
import { IconMicrophone } from "app/(speech)/src/app/components/IconMicrophone.js";
import TranscriptionContext from './TranscriptionContext';

const Microphone = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { setTranscription, transcription } = useContext(TranscriptionContext); // Add transcription to the destructured values

  // Define the callback function to handle the transcription completion
  const handleTranscriptionComplete = (transcriptionText) => {
    setTranscription(transcriptionText);
    console.log("Microphone.js - Transcription updated:", transcriptionText);
  };

  const { startRecording, stopRecording } = useRecordVoice(handleTranscriptionComplete);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      startRecording();
      console.log("Microphone.js - Microphone component started recording");
    } else {
      setIsRecording(false);
      stopRecording();
      console.log("Microphone.js - Microphone component stopped recording");
    }
  };

  // Tailwind CSS classes for the button in different states
  const buttonBaseClasses = "w-10 h-10 rounded-full flex items-center justify-center transition duration-300 ease-in-out";
  const recordingClasses = "bg-red-500 animate-pulse text-white";
  const notRecordingClasses = "bg-gray-200 hover:bg-gray-300 text-black";

  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-2">
      <button
        onClick={toggleRecording}
        className={`${buttonBaseClasses} ${isRecording ? recordingClasses : notRecordingClasses}`}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        <IconMicrophone />
      </button>
      <div className="text-sm">
        {isRecording ? (
          <span className="text-red-500">Recording in progress... Click to stop.</span>
        ) : (
          <span>Click the microphone to start recording.</span>
        )}
      </div>
    </div>
  );
};

export { Microphone };
