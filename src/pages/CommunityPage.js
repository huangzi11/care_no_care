import React from "react";
import { Card, Button, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function CommunityPage(props) {
    console.log(props.restaurants_data)
    return (
        <div>
            <CommunityBody restaurants_data={props.restaurants_data} />
        </div>
    )
}

function CommunityBody({restaurants_data}) {
    return (
        <div className="community">
            <div className="container" >
                {restaurants_data.map((restaurant) => {
                    return <CommunityCard key={restaurant.id} restaurant={restaurant} />
                })}
            </div>
        </div>
    )
}

function CommunityCard({restaurant}) {
    return (
        <Card className="CommunityCard">
            <Card.Img src={restaurant.Picture_link} style={{ height: '400px', width: '100%', objectFit: 'cover'}} alt={`picture of the restaurant ${restaurant.name}`}/>
            <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>{restaurant.comment}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted" style={{backgroundColor: 'white', border: 'none'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Image src={restaurant.user_image} roundedCircle style={{width: '20px', height: '20px', marginRight: '10px'}} alt={`picture of the user ${restaurant.user_name}`}/>
                        <div>{restaurant.user_name}</div>
                    </div>
                    <a href="#" style={{textDecoration: 'none', color: 'inherit'}}>{restaurant.comment_time}</a>
                </div>
            </Card.Footer>
            <Link to={`/community/${restaurant.name}`}>
                <Button variant="warning" className="w-100">Read More</Button>
            </Link>
        </Card>
    )
}