import React, { useState, useEffect } from 'react';
import { Card, Button, Image, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

export default function CommunityDetail({ info_data}) {
  let navigate = useNavigate();
  let { infoName } = useParams();
  const [info, setInfo] = useState({});
  const [isCared, setIsCared] = useState(false);

  // Initialize component with data from localStorage
  useEffect(() => {
    const foundInfo = info_data.find(info => info.name === infoName);
    if (foundInfo) {
      setInfo(foundInfo);
      // Check if there's a cared state stored in localStorage
      const caredState = localStorage.getItem(`cared-${infoName}`);
      setIsCared(caredState === 'true' ? true : foundInfo.cared ?? false);
    }
  }, [infoName, info_data]);

  const handleGoBack = () => {
    navigate('/homepage'); // Navigate to the homepage
  };
  const handleJoinGroupChat = () => {
    // Retrieve existing names from localStorage, or initialize an empty array if none exist
    const existingNames = JSON.parse(localStorage.getItem('groupChatInterests')) || [];
  
    // Check if the current info.name is already in the array to avoid duplicates
    if (!existingNames.includes(info.name)) {
      const updatedNames = [...existingNames, info.name];
      localStorage.setItem('groupChatInterests', JSON.stringify(updatedNames));
    }
  
    navigate('/chat');
  };
  
  let { detailName } = useParams();

    const [details_data, setdetails_data] = useState([]);
    const [detail, setdetail] = useState({});

    useEffect(() => {
        fetch('/data/info_data.json')
        .then((response) => response.json())
        .then((data) => setdetails_data(data))
    }, []); 

    useEffect(() => {
        if (details_data.length) {
            const founddetail = details_data.find(r => r.name === detailName);
            setdetail(founddetail);
        }
    }, [details_data, detailName]);

  // Adjusted styling for Card.Body to include a fixed height and make it scrollable
  const cardBodyStyle = {
    width: '50%',
    position: 'relative',
    height: '600px',
    maxHeight: '100%',
    overflowY: 'auto' 
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100vh'}}>
      
      <Card className="m-auto" style={{maxWidth: '90%'}}>
        <div className="d-flex">
          <Card.Img 
            variant="top" 
            src={info.Picture_link}
            style={{width: '50%', objectFit: 'cover'}}
            alt={`picture of the info ${info.name}`}
          />
          <Card.Body style={cardBodyStyle}>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>{info.name}</Card.Title>
              <Button 
                variant="light" 
                style={{margin: '10px', alignSelf: 'flex-start'}} 
                onClick={handleGoBack}
              >
                Close
              </Button>

            </div>
            <div className="d-flex align-items-center mb-2">
              <Image src={info.user_image} roundedCircle style={{width: '20px', height: '20px', marginRight: '10px'}} alt={`picture of the user ${info.user_name}`}/>
              <div>{info.user_name}</div>
            </div>
            <Card.Text>
              {info.descr}
            </Card.Text>
            <small className="text-muted">{info.publish_time}</small>
            <Button
              className="questions"
              style={{ backgroundColor: 'lightblue',borderColor: "black", color: 'black', margin: '10px', alignSelf: 'flex-start' }}
              onClick={handleJoinGroupChat}
            >
              Have Question? Join Group Chat!
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}