import React, { useState, useEffect } from 'react';
import { Card, Button, Image, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function CommunityDetail({ info_data, comment_data, username}) {
  
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
            <div className='commentList' >
                {comment_list}
            </div>
            <label htmlFor='comment_submit'>comment</label>
            <div className='commentSection'>
                <Form.Group className="commentForm mb-3">
                    <Form.Control type="comment_submit" placeholder="Add a comment..." value={comment} onChange={changeComment}/>
                </Form.Group>
                <Button className='commentButton' variant="primary" type="submit" onClick={submitComment}>
                    Submit
                </Button>
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}
