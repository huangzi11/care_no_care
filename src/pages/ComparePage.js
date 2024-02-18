import React from "react";
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

export default function Compare(props) {
  const { restaurants_data } = props;
  const [restaurant1, setRestaurant1] = useState(""); // State for restaurant 1
  const [restaurant2, setRestaurant2] = useState(""); // State for restaurant 2

  const filteredRestaurants1 = restaurants_data.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(restaurant1.toLowerCase());
  });

  const filteredRestaurants2 = restaurants_data.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(restaurant2.toLowerCase());
  });

  const displayCards = filteredRestaurants1.slice(0, 1).concat(filteredRestaurants2.slice(0, 1));

  return (
    <div>
      <div className="container">
        <h1 className="main-heading">Compare Restaurants</h1>
        <p className="description">Can't decide between two restaurants? Enter their names down below to compare them!</p>
        <hr />
        <div className="row compare-label">
          <div className="col">
            <label htmlFor="restaurant1" className="bold-label">Enter Restaurant 1:</label>
            <input
              type="text"
              id="restaurant1"
              name="restaurant1"
              className="compare-input-field"
              value={restaurant1}
              onChange={(e) => setRestaurant1(e.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="restaurant2" className="bold-label">Enter Restaurant 2:</label>
            <input
              type="text"
              id="restaurant2"
              name="restaurant2"
              className="input-field"
              value={restaurant2}
              onChange={(e) => setRestaurant2(e.target.value)}
            />
          </div>
        </div>
        <div className="compare-container">
            <Button variant="warning" className="compare-button">Compare</Button>
            <div className="card-container">
                {displayCards.map(restaurant => (
                  <HomeCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

function HomeCard({ restaurant }) {
  return (
    <Card className="CompareCard">
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
        <Card.Text>
            Rating: 
            <span className="compare-rating" style={{ color: 'rgb(255, 183, 0)'}}> {restaurant.star} &#9733;</span>
        </Card.Text>
        <Card.Text>Price: {restaurant.price}</Card.Text>
        <Card.Text>Location: {restaurant.area}</Card.Text> 
        <Card.Text>Food Type: {restaurant.category}</Card.Text>
      </Card.Body>
    </Card>
  );
}
