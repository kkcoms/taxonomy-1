// microphone.tsx

"use client";

import React, { useState } from 'react';
import { useRecordVoice } from "app/(speech)/src/hooks/useRecordVoice.js";
import { IconMicrophone } from "app/(speech)/src/app/components/IconMicrophone.js";

const Microphone = () => {
  const { startRecording, stopRecording, text } = useRecordVoice();
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      startRecording();
    } else {
      setIsRecording(false);
      stopRecording();
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
          text ? <span className="text-green-500">Recording complete. Click to start a new recording.</span> : <span>Click the microphone to start recording.</span>
        )}
      </div>
      {text && <p className="mt-2">{text}</p>}
    </div>
  );
};

export { Microphone };
