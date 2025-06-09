import React from "react"

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  // Inject critical styles that will show immediately
  setHeadComponents([
    <style key="critical-loading-styles">{`
      #gatsby-preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom right, #235CDC, #78B3F7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 1;
        transition: opacity 0.3s ease-out;
      }

      #gatsby-preloader .loading-box {
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 6px;
        padding: 25px 40px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        min-width: 300px;
        backdrop-filter: blur(5px);
        animation: loadingBoxAppear 0.3s ease-out;
      }

      @keyframes loadingBoxAppear {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      #gatsby-preloader .loading-text {
        color: #000;
        margin: 0;
        font-family: 'Tahoma', sans-serif;
        font-size: 13px;
        font-weight: bold;
      }

      #gatsby-preloader .loading-subtext {
        color: #666;
        margin: 0;
        font-family: 'Tahoma', sans-serif;
        font-size: 11px;
      }

      #gatsby-preloader .loading-bar {
        width: 250px;
        height: 22px;
        background: #E3E3E3;
        border: 1px solid #919B9C;
        border-radius: 3px;
        position: relative;
        overflow: hidden;
      }

      #gatsby-preloader .loading-bar::after {
        content: '';
        position: absolute;
        width: 40px;
        height: 100%;
        background: linear-gradient(
          to right,
          transparent,
          #2683FF 20%,
          #7AB7FF 80%,
          transparent
        );
        animation: loading 1.2s infinite ease-in-out;
      }

      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(250px); }
      }

      /* Hide page content until fully loaded */
      #___gatsby {
        opacity: 0;
        transition: opacity 0.3s ease-in;
      }

      #___gatsby.loaded {
        opacity: 1;
      }

      /* Ensure smooth transitions between pages */
      .gatsby-page-transition {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease-in-out;
      }

      .gatsby-page-transition.entered {
        opacity: 1;
        transform: translateY(0);
      }
    `}</style>,
  ])

  // Inject preloader HTML
  setPreBodyComponents([
    <div key="gatsby-preloader" id="gatsby-preloader">
      <div className="loading-box">
        <div>
          <p className="loading-text">Welcome to nadinicoco</p>
          <p className="loading-subtext">Loading settings...</p>
        </div>
        <div className="loading-bar" />
      </div>
    </div>,
  ])
}
