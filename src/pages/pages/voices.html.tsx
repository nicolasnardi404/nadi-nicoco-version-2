import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

const PagesVoicesRedirect: React.FC = () => {
  useEffect(() => {
    // Redirect to the archive page
    window.location.replace('https://archive.nadinicoco.com/pages/voices.html');
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'VCR OSD Mono, monospace',
      backgroundColor: '#000000',
      color: '#ffffff'
    }}>
      <p>Redirecting to archive...</p>
    </div>
  );
};

export default PagesVoicesRedirect;
