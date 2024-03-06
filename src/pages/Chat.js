import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export function CommunityPage() {
  const [interestedCardNames, setInterestedCardNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cardNames = JSON.parse(localStorage.getItem('groupChatInterests')) || [];
    setInterestedCardNames(cardNames);
  }, []);

  const handleChatClick = (cardName) => {
    navigate(`/chat/${cardName}`);
  };

  return (
    <div style={{height: '80vh', paddingLeft: "10%", paddingRight: "10%"}}>
      <header className="rank-header">
        <h1>Find Group Chat of Your Cared INFO</h1>
        <p>Based on your cared list</p>
      </header>
      <Row xs={1} md={4} className="g-4 justify-content-center"> {/* Adjust the number of cards per row as needed */}
        {interestedCardNames.map((cardName, index) => (
          <Col key={index}>
            <Card className="h-100"> {/* 'h-100' makes sure all cards in a row have equal height */}
              <Card.Body>
                <Card.Title>{cardName}</Card.Title>
                <Button variant="primary" onClick={() => handleChatClick(cardName)}>Chat</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}