import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Image } from "react-bootstrap";

function EachCard({ card }) {
  let combinedBadge = card.category.split(", ");
  let allBadges = combinedBadge.map((badge) => (
    <span key={badge} className="badge rounded-pill bg-light text-dark same">
      {badge}
    </span>
  ));
  return (
    <Card className="CommunityCard">
      <Card.Img
        src={card.Picture_link}
        style={{ height: "400px", width: "100%", objectFit: "contain" }}
        alt={`picture of the info ${card.name}`}
      />
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        <Card.Text>{card.comment}</Card.Text>
        <div>
            {allBadges}
        </div>
      </Card.Body>
      <Card.Footer
        className="text-muted"
        style={{ backgroundColor: "white", border: "none" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
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
        </div>
      </Card.Footer>
      <Link to={`/community/${card.name}`}>
        <Button variant="warning" className="w-100">
          Read More
        </Button>
      </Link>
    </Card>
  );
}

export function AllCards({ data }) {
  let cardList = data.map((info) => (
    // Wrap EachCard in a div with Bootstrap grid classes
    <div className="col-md-4" key={info.name}>
      <EachCard card={info} />
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
