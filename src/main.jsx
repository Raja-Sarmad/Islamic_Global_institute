import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import WhatsAppIcon from './WhatsAppIcon';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WhatsAppIcon />
    <App />
  </StrictMode>
);
