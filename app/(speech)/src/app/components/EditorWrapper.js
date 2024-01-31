// EditorWrapper.js
"use client";
import React, { useState } from 'react';
import { Editor } from '@/components/editor';
import { Microphone } from '@/app/(speech)/src/app/components/Microphone';
import TranscriptionContext from 'app/(speech)/src/app/components/TranscriptionContext.js';
import LiveTranscriptionMicrophone from 'app/(speech)/src/app/components/LiveTranscription.tsx';


const EditorWrapper = ({ post }) => {
  const [transcription, setTranscription] = useState('');

  console.log('EditorWrapper.js:', 'Initializing EditorWrapper');

  return (
    <TranscriptionContext.Provider value={{ transcription, setTranscription }}>
      <Editor post={post} />
      <Microphone /> 
      {/*<LiveTranscriptionMicrophone /> */} 
    </TranscriptionContext.Provider>
  );
};

export default EditorWrapper;
