import React from "react"
import "../components/layout.css"
import Layout from "../components/layout"
import styled from "styled-components"

const Win98Container = styled.div`
  font-family: 'MS Sans Serif', sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Win98Window = styled.div`
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  box-shadow: inset -1px -1px #858585, inset 1px 1px #dadada;
  padding: 2px;
`;

const Win98TitleBar = styled.div`
  background: linear-gradient(90deg, #000080, #1084d0);
  color: white;
  padding: 3px 6px;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Win98Content = styled.div`
  padding: 16px;
  background: #c0c0c0;
`;

const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 20px;
  background: #ffffff;
  border: 2px solid #858585;
  border-right-color: #fff;
  border-bottom-color: #fff;
  padding: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  
  img {
    width: 100%;
    height: auto;
    border: 2px solid #000;
    box-shadow: 2px 2px 0 #858585;
  }
`;

const BioText = styled.div`
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #000;

  h2 {
    font-size: 16px;
    color: #000080;
    margin: 0 0 16px 0;
  }

  p {
    margin-bottom: 16px;
  }

  a {
    color: #000080;
    text-decoration: underline;
    
    &:hover {
      text-decoration: none;
    }
  }
`;

const ContactSection = styled.div`
  background: #ffffff;
  border: 2px solid #858585;
  border-right-color: #fff;
  border-bottom-color: #fff;
  padding: 16px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const SocialButton = styled.a`
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  padding: 6px 12px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  text-decoration: none;
  color: #000;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  &:active {
    border: 2px solid #000;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }
`;

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Win98Container>
        <Win98Window>
          <Win98TitleBar>
            <span>👤 About Nadi Nicoco</span>
          </Win98TitleBar>
          <Win98Content>
            <ProfileSection>
              <ImageContainer>
                <img src="/icons/R1-04716-008A.png" alt="Nadi Nicoco" />
              </ImageContainer>
              <BioText>
                <h2>Nadi Nicoco</h2>
                <p>
                  A multidisciplinary artist whose work spans across various mediums and forms of expression. 
                  From digital art and web experiences to tattoo artistry, video art, and experimental music, 
                  Nadi creates immersive works that blur the lines between different artistic disciplines.
                </p>
                <p>
                  Their practice explores themes of digital identity, body modification, cyborg aesthetics, 
                  and the intersection of technology with human expression. Through a combination of traditional 
                  and digital techniques, they create works that challenge conventional boundaries and invite 
                  viewers into unique artistic experiences.
                </p>
              </BioText>
            </ProfileSection>
            
            <ContactSection>
              <BioText>
                <h2>Connect & Collaborate</h2>
                <p>
                  Whether you're interested in art, tattoos, or potential collaborations, 
                  feel free to reach out through any of these channels:
                </p>
              </BioText>
              <SocialLinks>
                <SocialButton href="https://instagram.com/nadinicoco" target="_blank">
                  📸 Art Instagram
                </SocialButton>
                <SocialButton href="https://instagram.com/nicocotatus" target="_blank">
                  💉 Tattoo Work
                </SocialButton>
                <SocialButton href="mailto:nadinicoco@gmail.com">
                  ✉️ Email
                </SocialButton>
              </SocialLinks>
            </ContactSection>
          </Win98Content>
        </Win98Window>
      </Win98Container>
    </Layout>
  )
}

export default AboutPage
