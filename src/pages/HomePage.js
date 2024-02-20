import React, { useState } from "react";
import { Card } from 'react-bootstrap';

export default function HomePage(props) {
  const restaurants_data = props.restaurants_data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  // Filter restaurants based on search query
  const filteredRestaurants = restaurants_data.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="sentence-container">
        <Sentence />
        <div className="search-bar-container">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
      <HomeBody restaurants_data={filteredRestaurants} />
    </div>
  );
}

function Sentence() {
  return (
    <main>
      <div className="home">
        <p className="welcome">Welcome to iDawg<span className="highlight">Know</span></p>
        <p className="what">What do you care today?</p>
      </div>
    </main>
  );
}

function SearchBar({ searchQuery, setSearchQuery }) {
    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search For Information"
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>
    );
  }

function HomeBody({ restaurants_data }) {
  return (
    <div className="community">
      <div className="container">
        {restaurants_data.map((restaurant) => {
          return <HomeCard key={restaurant.id} restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
}

function HomeCard({ restaurant }) {
  return (
    <Card className="Card">
      <Card.Img
        src={restaurant.Picture_link}
        alt={restaurant.name}
        style={{
          height: '260px',
          width: '100%',
          objectFit: 'cover',
          border: '3px solid #ddd'
        }}
      />
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>Info Type: {restaurant.category}</Card.Text>
      </Card.Body>
      <Card.Footer
        className="text-muted"
        style={{ backgroundColor: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        </div>
      </Card.Footer>
    </Card>
  );
}

