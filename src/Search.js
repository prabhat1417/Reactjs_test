import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import './Search.css';

function SearchResults() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setResults(response.data);
      } catch (error) {
        console.log('Error fetching results:', error);
      }
    };

    fetchAllResults();
  }, []);
  
  const openDescription = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="search">
      <Nav />
      <div className="posters">
        {results.map((result) => (
          <div key={result.show.id} className="poster">
            <img src={result.show.image?.medium} alt={result.show.name} onClick={() => openDescription(result.show.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
