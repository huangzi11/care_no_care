import React from 'react';
import { Card, Button, Image, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export default function CommunityDetail({ restaurants_data, comment_data }) {
    let { restaurantName } = useParams();
    const restaurant = restaurants_data.find(restaurant => restaurant.name === restaurantName);
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100vh'}}>
            <Card className="m-auto" style={{maxWidth: '80%'}}>
                <div className="d-flex">
                    <Card.Img 
                        variant="top" 
                        src={restaurant.Picture_link}
                        style={{width: '70%', objectFit: 'cover'}}
                        alt={`picture of the restaurant ${restaurant.name}`}
                    />
                    <Card.Body style={{width: '50%', position: 'relative'}}>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <div className="d-flex align-items-center mb-2">
                            <Image src={restaurant.user_image} roundedCircle style={{width: '20px', height: '20px', marginRight: '10px'}} alt={`picture of the user ${restaurant.user_name}`}/>
                            <div>{restaurant.user_name}</div>
                        </div>
                        <Card.Text>
                            {restaurant.comment}
                        </Card.Text>
                        <small className="text-muted">{restaurant.publishDate}</small>
                        <div>
                            {
                                comment_data.map((comment) => {
                                    if (comment.name !== restaurant.name) {
                                        return null
                                    }
                                    return (
                                        <div key={comment.name}>
                                            <strong>{comment.comment_user_name}</strong>
                                            <p>{comment.comment_under}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
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
