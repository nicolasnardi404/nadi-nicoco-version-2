import React, { useEffect } from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
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
  font-family: 'Tahoma', sans-serif;
`;

const WindowsLogo = styled.div`
  margin-bottom: 30px;
  color: white;
  font-size: 48px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 15px;

  &:before {
    content: '🪟';
  }
`;

const LoadingBox = styled.div`
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
`;

const LoadingBar = styled.div`
  width: 250px;
  height: 22px;
  background: #E3E3E3;
  border: 1px solid #919B9C;
  border-radius: 3px;
  position: relative;
  overflow: hidden;

  &:after {
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
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(250px);
    }
  }
`;

const LoadingText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const MainText = styled.p`
  color: #000;
  margin: 0;
  font-size: 13px;
  font-weight: bold;
`;

const SubText = styled.p`
  color: #666;
  margin: 0;
  font-size: 11px;
`;

const Copyright = styled.div`
  position: fixed;
  bottom: 20px;
  color: white;
  font-size: 11px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const Loading: React.FC = () => {
  useEffect(() => {
    // Remove the initial loading element when React's loading component mounts
    const initialLoading = document.getElementById('gatsby-initial-loading');
    if (initialLoading) {
      initialLoading.style.opacity = '0';
      initialLoading.style.transition = 'opacity 0.3s ease-out';
      setTimeout(() => {
        initialLoading.remove();
      }, 300);
    }
  }, []);

  return (
    <LoadingWrapper>
      <LoadingBox>
        <LoadingText>
          <MainText>Welcome to nadinicoco</MainText>
          <SubText>Loading settings...</SubText>
        </LoadingText>
        <LoadingBar />
      </LoadingBox>
    </LoadingWrapper>
  );
};

export default Loading; 