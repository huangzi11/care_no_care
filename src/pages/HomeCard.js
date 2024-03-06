import React, { useState } from "react";
import { Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function EachCard({ card, onRemoveCard }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleCareClick = (event) => {
    event.stopPropagation(); // Prevent the card flip on the entire card click
    navigate(`/community/${card.name}`);
  };

  let combinedBadge = card.category.split(", ");
  let allBadges = combinedBadge.map((badge) => (
    <span key={badge} className="badge rounded-pill bg-light text-dark">
      {badge}
    </span>
  ));
  const navigate = useNavigate();
  const handleDontCareClick = (event) => {
    event.stopPropagation(); // Prevent any parent click handlers from being executed
    onRemoveCard(); // Existing functionality to remove card from view
  };
  return (
    <div className={"card-containe"}>
      <Card className="CommunityCard">
            <Card.Img
              src={card.Picture_link}
              style={{ height: "400px", width: "100%", objectFit: "contain" }}
              alt={`picture of the info ${card.name}`}
            />
            <Card.Body>
              <Card.Title>{card.name}</Card.Title>
              <Card.Text>{card.comment}</Card.Text>
              <div>{allBadges}</div>
              
            </Card.Body>
            <Card.Footer
              className="text-muted"
              style={{ backgroundColor: "white", border: "none" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={card.user_image}
                  roundedCircle
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                  alt={`picture of the user ${card.user_name}`}
                />
                <div>{card.user_name}</div>
              </div>
            </Card.Footer>
            {/* Care button */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Existing Care button */}
              <Button variant="warning" onClick={handleCareClick} className="w-100">
                Care
              </Button>
              {/* New Don't Care button */}
              <Button variant="secondary" onClick={handleDontCareClick} className="w-100 ml-2">
                Don't Care
              </Button>
            </div>
        </Card>
    </div>
  );
}



export function AllCards({ data }) {
  const [cards, setCards] = useState(data);

  const removeCard = (cardName) => {
    setCards(cards.filter(card => card.name !== cardName));
  };

  let cardList = cards.map((info) => (
    <div className="col-md-4" key={info.name}>
      <EachCard card={info} onRemoveCard={() => removeCard(info.name)} />
    </div>
  ));


  return (
    <section className="products-list">
      <header className="rank-header">
        <h1>Your Most Cared INFO</h1>
        <p>Based on your QUIZ</p>
      </header>
      <div className="container">
        <div className="row">
          {cardList}
          {cardList.length < 1 && (
            <h2 className="sorry">
              Sorry, there are no info to display with your filters. Please try
              again.
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
