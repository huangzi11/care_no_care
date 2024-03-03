import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';

export function FilterForm(props) {
    const quizStyle = {
        padding: '100px'
    }
    const navigate = useNavigate();

    const parts = ['Information Category'];
    const questions = ['What category of information do you care about?']
    const type = ["Student Organization", "Election", "Scholarships", "Diversity", "Industry", "Career Opportunities", "Panel Talk", 'Mentorship', 'Research', 'Lecture', 'Data Science', 'Competition', 'Entrepreneurship', 'Women in Technology', 'UIUX', 'Software Development', 'Study Abroad'];

    // Function to handle card click, toggling the selection state
    const handleCardClick = (item) => {
        props.setFilterOptions(prevOptions => ({
            ...prevOptions,
            [item]: !prevOptions[item]
        }));
    };

    // Convert each type into a clickable card
    const renderCards = () => type.map((item) => (
        <div className="quiz">
            <div 
                key={item} 
                className={`card ${props.filterOptions[item] ? 'card-selected' : ''}`} 
                onClick={() => handleCardClick(item)}
            >
                <div className="card-body">
                    {item}
                </div>
            </div>
        </div>
    ));

    // Function to handle submit and navigate
    const handleSubmitAndNavigate = () => {
        props.applyFilterCallback(); // Apply filter based on the selections
        navigate('/HomePage'); // Navigate to HomePage
    };

    return (
        <div className="quiz" style={quizStyle}>
            <div className="quiz_title">
                <h1>Take a Quiz to Find Your Most Cared INFO</h1>
                <p className="description">This short quiz will help us find all your most cared information within iSchool</p>
            </div>

            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Quiz Content</Accordion.Header>
                    <Accordion.Body>
                        {parts.map((part, index) => (
                            <div key={index}>
                                <h3 className="parts">{part}</h3>
                                <p className="questions">{questions[index]}</p>
                                <div className="card-container">
                                    {renderCards()}
                                </div>
                            </div>
                        ))}
                        <button onClick={handleSubmitAndNavigate} className="btn btn-primary btn-lg qb" type="button">
                            Submit
                        </button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
