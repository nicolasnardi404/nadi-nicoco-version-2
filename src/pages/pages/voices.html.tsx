import React, { useEffect, useState } from 'react';

const PagesVoicesRedirect: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate loading dots
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Redirect after a short delay to show the loading state
    const redirectTimer = setTimeout(() => {
      window.location.replace('https://archive.nadinicoco.com/pages/voices.html');
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'VCR OSD Mono, monospace',
      backgroundColor: '#000000',
      color: '#00ff00',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        border: '2px solid #00ff00',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0', 
          fontSize: '18px',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          /// esquizo ciborgue ///
        </h2>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #00ff00',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ margin: 0, fontSize: '14px' }}>
            Redirecting to archive{dots}
          </p>
        </div>
        
        <p style={{ 
          margin: 0, 
          fontSize: '12px', 
          opacity: 0.7,
          lineHeight: '1.4'
        }}>
          Taking you to the sonic brainchild<br/>
          of nadi nicoco's experimental fusion
        </p>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PagesVoicesRedirect;
