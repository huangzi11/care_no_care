import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Outlet, useNavigate } from 'react-router-dom';

export function FilterForm(props) {
    const navigate = useNavigate();

    // Assuming filterOptions is managed outside and passed as props,
    // if not, here's how to manage it locally including persisting across reloads.
    let parts = ['Information Category'];
    let questions = ['What category of information do you care about?']
    let type = ["Student Organization", "Election", "Scholarships", "Diversity", "Industry", "Career Opportunities", "Panel Talk"]
    let categoryTitleArray = parts.map((title) => {
        return (<h3 className="parts">{title}</h3>)
    })

    let QuestionArray = questions.map((directions) => {
        return (<p className="questions">{directions}</p>)
    })

    let typeArray = type.map((obj) => {
        return obj;
    })

    let checkboxforEach = (array) => {
        let typeCheckbox = array.map((item, index) => {
            return (
                <div className="form-check" key={item}>
                    <input className="form-check-input" onChange={props.handleCheckbox} name={item} type="checkbox" checked={props.filterOptions[item]} id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor={item}>
                        {item}
                    </label>
                </div>
            )
        })
        return typeCheckbox
    }

    // Function to handle the combined logic
    const handleSubmitAndNavigate = () => {
        // First, execute any submission logic or callback
        props.applyFilterCallback();

        // Then, navigate to the HomePage
        navigate('/HomePage');
    };
    
    
    return (
        <div className="quiz">
            <div className="quiz_title">
                <h1>Take a Quiz to Find Your Most Cared</h1>
                <p className="description">This short quiz will help us find all your most cared information within iSchool</p>
            </div>

            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Quiz Content</Accordion.Header>
                    <Accordion.Body>
                        <div className="check-container">
                            <div className="one-checkbox col-md-4">
                                <p></p>
                                {categoryTitleArray[0]}
                                {QuestionArray[0]}
                                {checkboxforEach(typeArray)}
                                <p></p>
                            </div>
                        </div>
                        <button onClick={handleSubmitAndNavigate} className="btn btn-primary btn-lg qb" type="button">
                            Submit
                        </button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Outlet />
        </div>

    )

}