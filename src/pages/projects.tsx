import * as React from "react"
import { useState, useRef } from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { FaLinkedin, FaGithub, FaEnvelope, FaFolder, FaList, FaThLarge } from "react-icons/fa"

const ProjectsContainer = styled.div`
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  padding: 2px;
  margin: 20px;
`;

const TitleBar = styled.div`
  background: #000080;
  color: white;
  padding: 3px 2px 3px 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'MS Sans Serif', sans-serif;
`;

const ToolBar = styled.div`
  background: #c0c0c0;
  padding: 4px;
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #808080;
`;

const ToolbarButton = styled.button`
  background: #c0c0c0;
  border: 1px solid #808080;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  cursor: pointer;

  &:active {
    border: 1px solid #000;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }
`;

const IntroCard = styled.div`
  background: white;
  margin: 16px;
  padding: 16px;
  border: 2px solid #000;
  border-right-color: #fff;
  border-bottom-color: #fff;
  font-family: 'MS Sans Serif', sans-serif;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000080;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const ProjectsGrid = styled.div<{ viewMode: 'grid' | 'list' }>`
  display: ${props => props.viewMode === 'grid' ? 'grid' : 'flex'};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  flex-direction: ${props => props.viewMode === 'list' ? 'column' : 'row'};
  gap: 16px;
  padding: 16px;
`;

const ProjectCard = styled.div<{ viewMode: 'grid' | 'list' }>`
  background: white;
  border: 2px solid #000;
  border-right-color: #fff;
  border-bottom-color: #fff;
  padding: 16px;
  cursor: pointer;
  
  ${props => props.viewMode === 'list' ? `
    display: flex;
    align-items: center;
    gap: 16px;
  ` : ''}

  &:hover {
    background: #efefef;
  }
`;

const StatusBar = styled.div`
  background: #c0c0c0;
  border-top: 2px solid #808080;
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
`;

const projects = [
  {
    id: 1,
    title: "CYBER PLANTA",
    tags: ["Python", "React", "JavaScript", "Multi Modal AI", "LangChain", "RAG", "Hugging Face", "OpenAI"],
    description: "Permaculture Chat Bot",
    imageName: "/images/cyberplanta.png",
    url: "https://www.cyberplanta.com",
    longDescription: "Cyber Planta is an AI-driven project focused on sharing knowledge about bio-agriculture, fungi, and eco-feminism."
  },
  {
    id: 2,
    title: "RANDOM RAINBOW",
    description: "Queer Video Art Platform",
    imageName: "/images/randomrainbow.png",
    tags: ["React", "JavaScript", "Java", "Spring Boot", "PostgreSQL", "Docker", "Deployment"],
    url: "https://www.randomrainbow.art",
    longDescription: "Random Rainbow is a cyber art project designed to connect queer video art through a random experience."
  },
  {
    id: 3,
    title: "I WANNA BE NADI NICOCO",
    description: "AI Generative Poetry",
    imageName: "/images/iwannabenadinicoco.png",
    tags: ["JavaScript", "React", "Node.js", "Express", "PostgreSQL", "OpenAI", "Vercel"],
    url: "https://www.iwannabe.nadinicoco.com",
    longDescription: "An AI-generated poetry blog inspired by the works of Nadi Nicoco."
  },
  {
    id: 4,
    title: "NADI NICOCO",
    tags: ["HTML", "CSS", "JavaScript"],
    description: "Artist Portfolio",
    imageName: "/images/nadinicoco.png",
    url: "https://www.nadinicoco.com",
    longDescription: "Portfolio website showcasing Nadi Nicoco's diverse creative output."
  },
  {
    id: 5,
    title: "QUARTO AMBIENTE",
    tags: ["HTML", "CSS", "JavaScript"],
    description: "Art Collective Portfolio",
    imageName: "/images/quarto-ambiente.png",
    url: "https://www.quartoambiente.com.br",
    longDescription: "Website for Brazilian art collective showcasing experimental films and zines."
  }
];

const ProjectsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showEmail, setShowEmail] = useState(false);

  return (
    <Layout>
      <Seo title="Projects" />
      <ProjectsContainer>
        <TitleBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaFolder size={14} />
            My Portfolio - File Explorer
          </div>
        </TitleBar>

        <ToolBar>
          <ToolbarButton>
            <FaFolder size={14} /> File
          </ToolbarButton>
          <ToolbarButton onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <FaThLarge size={14} /> : <FaList size={14} />}
            {viewMode === 'grid' ? " Grid View" : " List View"}
          </ToolbarButton>
        </ToolBar>

        <IntroCard>
          <p>
            Nicolas Nardi is a web developer, permaculture gardener, and artist who blends technology 
            with creative expression. Through their AI-driven project, Cyber Planta, Nicolas focuses 
            on sharing knowledge about bio-agriculture, fungi, and eco-feminism.
          </p>
          <SocialLinks>
            <SocialLink href="https://www.linkedin.com/in/nícolas-nardi" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={14} /> LinkedIn
            </SocialLink>
            <SocialLink href="https://github.com/nicolasnardi404" target="_blank" rel="noopener noreferrer">
              <FaGithub size={14} /> GitHub
            </SocialLink>
            <SocialLink as="button" onClick={() => setShowEmail(!showEmail)}>
              <FaEnvelope size={14} />
              {showEmail ? "nicolasnardi404@gmail.com" : "Email"}
            </SocialLink>
          </SocialLinks>
        </IntroCard>

        <ProjectsGrid viewMode={viewMode}>
          {projects.map((project) => (
            <ProjectCard key={project.id} viewMode={viewMode}>
              <div>
                <h3 style={{ margin: '0 0 8px 0' }}>{project.title}</h3>
                <p style={{ margin: '0 0 8px 0' }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} style={{
                      background: '#000080',
                      color: 'white',
                      padding: '2px 6px',
                      fontSize: '12px',
                      borderRadius: '2px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ProjectCard>
          ))}
        </ProjectsGrid>

        <StatusBar>
          <span>{projects.length} items</span>
          <span>3.72 MB free of 521 MB</span>
        </StatusBar>
      </ProjectsContainer>
    </Layout>
  );
};

export const Head = () => <Seo title="Projects" />;

export default ProjectsPage; 