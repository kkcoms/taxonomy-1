// TranscriptionContext.js
import React from 'react';

const TranscriptionContext = React.createContext({ transcription: '', setTranscription: () => {} });

console.log('TranscriptionContext.js - TranscriptionContext executed');
console.log('TranscriptionContext.js - TranscriptionContext values:', TranscriptionContext);

export default TranscriptionContext;