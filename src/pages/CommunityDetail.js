import React from 'react';
import { Card, Button, Image, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export default function CommunityDetail({ info_data, comment_data }) {
    let { infoName } = useParams();
    const info = info_data.find(info => info.name === infoName);
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
                        <Card.Title>{info.name}</Card.Title>
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
    )
}
