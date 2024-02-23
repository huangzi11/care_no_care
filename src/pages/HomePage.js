import React, { useState } from "react";
import { Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage(props) {
  const info_data = props.info_data;
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  // Filter infos based on search query
  const filteredinfos = info_data.filter((info) => {
    return info.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="sentence-container">
        <Sentence />
        <div className="search-bar-container">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      <HomeBody info_data={filteredinfos} />
    </div>
  );
}

function Sentence() {
  return (
    <main>
      <div className="home">
        <p className="welcome">
          Welcome to iDawg<span className="highlight">Know</span>
        </p>
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

function HomeBody({ info_data }) {
  return (
    <div className="community">
      <div className="container">
        {info_data.map((info) => {
          return <HomeCard key={info.id} info={info} />;
        })}
      </div>
    </div>
  );
}

function HomeCard({ info }) {
  return (
    <Card className="my-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={info.Picture_link} />
      <Card.Body>
        <Card.Title>{info.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title.
        </Card.Text>
        <Link to={`/community/${info.name}`}>
          <Button variant="primary">Read More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
