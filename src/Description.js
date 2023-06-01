import React, { useState, useEffect } from 'react';
import Nav from "./Nav";
import Row from './Row';
import Preloader from "./Preloader";
import './Description.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
import imdb from './images/imdb.png';

function Description() {
  const { movieId } = useParams();
  const [show, setShowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=all`);
        const data = response.data.find((item) => item.show.id === parseInt(movieId));
        setShowData(data.show);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching show data:', error.message);
      }
    };

    fetchShowData();
  }, [movieId]);

  const bannerStyle = {
    backgroundImage: `url("${show?.image?.original}")`,
    backgroundPosition: "left center",
    backgroundSize: "cover",
    height: "100vh",
  };

  return (
    <div>
      {isLoading ? (
        <Preloader />
      ) : (
        <div>
          <Nav />
          <div className="description">
            <header className='description' style={bannerStyle}>
              <div className='movie_content'>
                <h1>{show?.name}</h1>
                <div className='rat'>
                  <img src={imdb} alt="imdb" />
                  <p className='vote'>{show?.rating?.average}<span className='line'>|</span>{show?.premiered && show.premiered.substr(0, 4)}<span className='line'>|</span>{show.runtime} m</p>
                </div>
                <div className='rat'>
                  <p className='vote extra'>{show?.status}<span className='line'>|</span>{show?.network?.country.code}<span className='line'>|</span>{show?.network?.name}</p>
                </div>
                <p>
                  {show?.genres.map((genre) => (
                    <span className='genres' key={genre}>{genre}</span>
                  ))}
                </p>
                <h1 className='movie_description'>
                  <p dangerouslySetInnerHTML={{ __html: show?.summary }}></p>
                </h1>
              </div>
              <div className='banner--fadeBottom' />
            </header>
          </div>
          <Row title="Recommended" />
        </div>
      )}
    </div>
  );
}

export default Description;
