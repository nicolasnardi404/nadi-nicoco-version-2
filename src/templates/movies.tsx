import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import styled from 'styled-components';
import "../components/layout.css";
import Layout from '../components/layout';
import { ShortMovieResponse } from '../types/GraphQLResponses';
import { graphql } from 'gatsby';

const Win98Container = styled.div`
  font-family: 'MS Sans Serif', sans-serif;
  padding: 20px;
`;

const Win98Window = styled.div`
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  box-shadow: inset -1px -1px #858585, inset 1px 1px #dadada;
  padding: 2px;
  margin: 20px auto;
  max-width: 800px;
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

const MovieCard = styled.div`
  background: #ffffff;
  border: 2px solid #858585;
  border-right-color: #fff;
  border-bottom-color: #fff;
  margin-bottom: 20px;
  padding: 2px;
`;

const MovieTitle = styled.h1`
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 14px;
  color: #000080;
  background: #c0c0c0;
  padding: 6px;
  margin: 0;
  border-bottom: 2px solid #858585;
`;

const VideoContainer = styled.div`
  padding: 16px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  
  iframe {
    border: 2px solid #000;
    box-shadow: 2px 2px 0 #858585;
  }
`;

const Description = styled.div`
  padding: 16px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  line-height: 1.4;
  
  a {
    color: #000080;
    text-decoration: underline;
  }
`;

const MenuBar = styled.div`
  background: #c0c0c0;
  border-bottom: 2px solid #858585;
  padding: 2px 0;
  display: flex;
  gap: 8px;
`;

const MenuItem = styled.button`
  background: #c0c0c0;
  border: 1px solid #858585;
  border-right-color: #fff;
  border-bottom-color: #fff;
  padding: 2px 8px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  cursor: pointer;
  
  &:active {
    border: 1px solid #fff;
    border-right-color: #858585;
    border-bottom-color: #858585;
  }
`;

const options = {
    renderMark: {
        [MARKS.BOLD]: (text) => (<b style={{ fontWeight: 'bold' }}>{text}</b>),
        [MARKS.ITALIC]: (text) => (<i>{text}</i>),
        [MARKS.UNDERLINE]: (text) => (<u>{text}</u>),
        [MARKS.CODE]: (text) => (<code>{text}</code>),
    },
    renderNode: {
        [INLINES.HYPERLINK]: (node, children) => {
            const { uri } = node.data;
            return (
                <a href={uri} style={{ color: '#000080', textDecoration: 'underline' }}>
                    {children}
                </a>
            );
        },
        [BLOCKS.HEADING_2]: (node, children) => {
            return <h2 style={{ fontSize: '13px', color: '#000080', marginBottom: '8px' }}>{children}</h2>;
        },
    },
};

export const query = graphql`
  query ShortMoviesQuery {
    allContentfulShortMovies {
      edges {
        node {
          idControl
          title
          description {
            raw
          }
          link
        }
      }
    }
  }
`;

interface MoviesProps {
  data: {
    allContentfulShortMovies: {
      edges: {
        node: ShortMovieResponse;
      }[];
    };
  };
}

const Movies: React.FC<MoviesProps> = ({ data }) => {
  const unsortedMovies = data?.allContentfulShortMovies?.edges?.map(edge => edge.node) || [];
  
  // Sort movies: first by idControl (if present), then the rest
  const movies = [...unsortedMovies].sort((a, b) => {
    // If both have idControl, sort by idControl
    if (a.idControl && b.idControl) {
      return parseInt(a.idControl) - parseInt(b.idControl);
    }
    // If only a has idControl, it comes first
    if (a.idControl) return -1;
    // If only b has idControl, it comes first
    if (b.idControl) return 1;
    // If neither has idControl, maintain original order
    return 0;
  });

  const formatYouTubeUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }

    if (url.includes('youtube.com/embed/')) {
      return url;
    }

    return url;
  };

  return (
    <Layout>
      <Win98Container>
        <Win98Window>
          <Win98TitleBar>
            <span>🎥 Short Movies Player</span>
            <div>
              <button style={{
                background: '#c0c0c0',
                border: '2px solid #fff',
                borderRightColor: '#000',
                borderBottomColor: '#000',
                padding: '0px 5px',
                fontSize: '11px',
                cursor: 'pointer',
                marginLeft: '2px'
              }}>?</button>
              <button style={{
                background: '#c0c0c0',
                border: '2px solid #fff',
                borderRightColor: '#000',
                borderBottomColor: '#000',
                padding: '0px 5px',
                fontSize: '11px',
                cursor: 'pointer',
                marginLeft: '2px'
              }}>×</button>
            </div>
          </Win98TitleBar>
          
          <MenuBar>
            <MenuItem>File</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>View</MenuItem>
            <MenuItem>Help</MenuItem>
          </MenuBar>

          <Win98Content>
            {movies.length === 0 ? (
              <div style={{
                padding: '20px',
                textAlign: 'center',
                fontFamily: 'MS Sans Serif',
                fontSize: '12px'
              }}>
                No movies found. Please add some content in Contentful.
              </div>
            ) : (
              movies.map((movie, index) => (
                <MovieCard key={movie.idControl || index}>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <VideoContainer>
                    <iframe 
                      width="560" 
                      height="315" 
                      src={formatYouTubeUrl(movie.link)} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      title={movie.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </VideoContainer>
                  <Description>
                    {movie.description && renderRichText(movie.description, options)}
                  </Description>
                </MovieCard>
              ))
            )}
          </Win98Content>
        </Win98Window>

        {/* Status Bar */}
        <div style={{
          background: '#c0c0c0',
          border: '2px solid #858585',
          borderRightColor: '#fff',
          borderBottomColor: '#fff',
          padding: '2px 5px',
          fontSize: '11px',
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>{movies.length} movies loaded</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </Win98Container>
    </Layout>
  );
};

export default Movies; 