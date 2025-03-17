import React from 'react';
import { createRoot } from 'react-dom/client'; // ייבוא createRoot
import App from './App';

const root = createRoot(document.getElementById('root')); // יצירת שורש חדש
root.render(<App />); // רינדור האפליקציה
