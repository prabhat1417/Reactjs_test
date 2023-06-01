import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Row.css';

function Row({ title }) {
  const [shows, setShows] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
      } catch (error) {
        console.log('Error fetching shows:', error);
      }
    }

    fetchData();
  }, []);

  const openDescription = (show) => {
    let newPath;
   newPath = `/description/${show.id}`;
    window.location.href = newPath;
  };

  return (
    <div className="row">
      <h2 className="title">{title}</h2>
      <div className="row_posters">
        {shows.map((item) => {
          const show = item.show;
          return (
            <div
              className="row_poster"
              key={show.id}
              onClick={() => openDescription(show)}
            >
              <LazyLoadImage
                src={show.image?.medium || show.image?.original}
                alt={show.name}
                effect="blur"
                className="row_posterImage"
                onClick={()=> {openDescription(show)}}
              />
              <div className="row_posterTitle">{show.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Row;
