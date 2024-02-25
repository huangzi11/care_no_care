import React, { useState, useEffect } from 'react';
import { Card, Button, Image, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function CommunityDetail({ info_data, comment_data }) {
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

  // Toggle care and update localStorage
  const handleCareClick = () => {
    const newCaredStatus = !isCared;
    setIsCared(newCaredStatus);

    // Update the number of cares in the local state and localStorage
    const updatedInfo = {
      ...info,
      num_cared: newCaredStatus ? info.num_cared + 1 : Math.max(0, info.num_cared - 1),
      cared: newCaredStatus,
    };

    setInfo(updatedInfo);
    localStorage.setItem(`cared-${infoName}`, newCaredStatus.toString());
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100vh'}}>
      <Card className="m-auto" style={{maxWidth: '80%'}}>
        <div className="d-flex">
          <Card.Img 
            variant="top" 
            src={info.Picture_link}
            style={{width: '70%', objectFit: 'cover'}}
            alt={`picture of the info ${info.name}`}
          />
          <Card.Body style={{width: '50%', position: 'relative'}}>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>{info.name}</Card.Title>
              <Button 
                variant={isCared ? "secondary" : "danger"} 
                onClick={handleCareClick}
              >
                {isCared ? "Cancel" : "Care"}
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
            <div style={{position: 'absolute', bottom: '0', width: '92%', display: 'flex', justifyContent: 'space-between'}}>
              <Form.Group className="mb-3" style={{flex: 1, marginRight: '10px'}}>
                <Form.Control type="text" placeholder="Add a comment..." />
              </Form.Group>
              <Button variant="primary" type="submit" style={{height: '38px'}}>
                Submit
              </Button>
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}
