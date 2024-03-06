import React, { useState, useEffect } from 'react';
import { Card, Button, Image, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

export default function ChatDetail({info_data, comment_data, username}) {
  let navigate = useNavigate();
  let { infoName } = useParams();
  const [info, setInfo] = useState({});
  const [isCared, setIsCared] = useState(false);

  const handleGoBack = () => {
    navigate('/chat'); // Navigate to the homepage
  };
  useEffect(() => {
    // Assuming info_data is an array of objects where each object has a name property
    const foundInfo = info_data.find(info => info.name === infoName);
    if (foundInfo) {
      setInfo(foundInfo);
    }
  }, [infoName, info_data]);
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

    // prepare the comment data

    const [comments, setComments] = React.useState(() => {
        const existingList = localStorage.getItem('commentList');
        return existingList ? JSON.parse(existingList) : comment_data;
    });
    const [comment, setComment] = React.useState('');
    
    useEffect(() => {
        localStorage.setItem('commentList', JSON.stringify(comments));
    }, [comments]);

    // prepare the comment form
    const submitComment = (e) => {
        setComments([...comments, {name: detail.name, comment_user_name: username, comment_under: comment}]);
        setComment('');
    }

    const changeComment = (e) => {
        setComment(e.target.value);
    }

    const comment_list = comments.map((comment) => {
        if (comment.name !== detail.name) {
            return null
        }
        return (
            <div key={comment.comment_under}>
                <strong>{comment.comment_user_name}</strong>
                <p>{comment.comment_under}</p>
            </div>
        )
    })

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '80vh', paddingTop: "-5vh"}}>
      <Card className="m-auto" style={{ maxWidth: '80%', width: '80%', height: "70%"}}>
        <div className="d-flex">
          <Card.Body>
          <Card.Title><h2>{info.name}</h2></Card.Title>
            <div className='commentList' >
                {comment_list}
            </div>
            <label htmlFor='comment_submit'>Message</label>
            <div className='commentSection'>
                <Form.Group className="commentForm mb-3">
                    <Form.Control type="comment_submit" placeholder="Send Message" value={comment} onChange={changeComment}/>
                </Form.Group>
                <Button className='commentButton' variant="primary" type="submit" onClick={submitComment}>
                    Send
                </Button>
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}