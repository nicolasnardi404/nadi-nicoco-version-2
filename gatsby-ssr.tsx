import React from 'react';

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: `en` });

  // Add styles for loading and content transitions
  setHeadComponents([
    <style key="loading-styles">{`
      #gatsby-initial-loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom right, #235CDC, #78B3F7);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.3s ease-out;
      }

      #___gatsby {
        opacity: 0;
        transition: opacity 0.3s ease-in;
      }
    `}</style>,
    // Google Analytics
    <script
      key="google-analytics"
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-4RY1M5NECP"
    />,
    <script
      key="google-analytics-config"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4RY1M5NECP');
        `,
      }}
    />,
  ]);

  // Add initial loading state
  setPreBodyComponents([
    <div
      key="loading-overlay"
      id="gatsby-initial-loading"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom right, #235CDC, #78B3F7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: 'Tahoma, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '6px',
          padding: '25px 40px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          minWidth: '300px',
        }}
      >
        <div>
          <p style={{ color: '#000', margin: 0, fontSize: '13px', fontWeight: 'bold' }}>
            WELCOME TO THE INTERNET
          </p>
          <p style={{ color: '#666', margin: 0, fontSize: '11px' }}>
            Loading settings...
          </p>
        </div>
        <div
          style={{
            width: '250px',
            height: '22px',
            background: '#E3E3E3',
            border: '1px solid #919B9C',
            borderRadius: '3px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <style>
            {`
              @keyframes loadingAnimation {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(250px); }
              }
              #gatsby-initial-loading-bar {
                position: absolute;
                width: 40px;
                height: 100%;
                background: linear-gradient(to right, transparent, #2683FF 20%, #7AB7FF 80%, transparent);
                animation: loadingAnimation 1.2s infinite ease-in-out;
              }
            `}
          </style>
          <div id="gatsby-initial-loading-bar" />
        </div>
      </div>
    </div>,
  ]);
};
