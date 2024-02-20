import React from "react";
import { Card, Button, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function CommunityPage(props) {
    console.log(props.info_data)
    return (
        <div>
            <CommunityBody info_data={props.info_data} />
        </div>
    )
}

function CommunityBody({info_data}) {
    return (
        <div className="community">
            <div className="container" >
                {info_data.map((info) => {
                    return <CommunityCard key={info.id} info={info} />
                })}
            </div>
        </div>
    )
}

function CommunityCard({info}) {
    return (
        <Card className="CommunityCard">
            <Card.Img src={info.Picture_link} style={{ height: '400px', width: '100%', objectFit: 'cover'}} alt={`picture of the info ${info.name}`}/>
            <Card.Body>
                <Card.Title>{info.name}</Card.Title>
                <Card.Text>{info.comment}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted" style={{backgroundColor: 'white', border: 'none'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Image src={info.user_image} roundedCircle style={{width: '20px', height: '20px', marginRight: '10px'}} alt={`picture of the user ${info.user_name}`}/>
                        <div>{info.user_name}</div>
                    </div>
                    <a href="#" style={{textDecoration: 'none', color: 'inherit'}}>{info.comment_time}</a>
                </div>
            </Card.Footer>
            <Link to={`/community/${info.name}`}>
                <Button variant="warning" className="w-100">Read More</Button>
            </Link>
        </Card>
    )
}