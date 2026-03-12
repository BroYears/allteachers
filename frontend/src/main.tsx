import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Import Global Styles from existing assets copied to public/
import '../public/css/reset.css';
import '../public/css/common.css';
import '../public/css/style.css';
import '../public/css/responsive.css';
import '../public/css/swiper-bundle.min.css';
import '../public/css/fontawesome/all.min.css';
import '../public/css/animate.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
