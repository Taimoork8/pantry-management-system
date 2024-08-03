// src/pages/_app.js
import React from 'react';
import '../styles/globals.css'; // Example global CSS import

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
