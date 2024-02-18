import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Outlet } from 'react-router-dom';


// takes in entire props.data as props.data
export function FilterForm(props) {


    let parts = ['Part1. Cuisine and Dietary Restrictions', 'Part2. Restaurants Preference', 'Part3. Personal Preference'];
    let questions = ['What types of cuisine do you prefer?', 'Do you have any dietary restrictions?', 'What type of restaurant are you looking for?', 'What ratings do you prefer?', 'What are all your accepted budget?', 'Do you have any specific food want to eat today?']
    let cuisine = ["American", "Chinese", "Indian", "Hawaiian", "Vietnamese", "Japanese", "Mexican", "Mediterranean", "Italian", "Korean"]
    let dietary = ["Vegetarian", "Vegan", "Gluten-free", "Seafood"]
    let type = ["Bar", "Barbeque", "Venues & Event Spaces", "Cafe", "Breakfast & Brunch", "Bakeries"]
    let rate = ['1', '2', '3', '4', '5']
    let budget = ["$", "$$", "$$$", "$$$$"]
    let food = ["Desserts", "Noodles", "Burgers", "Bubble Tea", "Hot Pot","Tacos"]
    let categoryTitleArray = parts.map((title) => {
        return (<h3 className="parts">{title}</h3>)
    })

    let QuestionArray = questions.map((directions) => {
        return (<p className="questions">{directions}</p>)
    })

    let cuisineArray = cuisine.map((obj) => {
        return obj;
    })
    let dietaryArray = dietary.map((obj) => {
        return obj;
    })

    let typeArray = type.map((obj) => {
        return obj;
    })

    let budgeteArray = budget.map((obj) => {
        return obj;
    })

    let ratingArray = rate.map((obj) => {
        return obj;
    })

    let foodArray = food.map((obj) => {
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

    return (
        <div className="quiz">
            <div className="quiz_title">
                <h1>Take a Quiz to Find the Right Restaurants for You</h1>
                <p className="description">This short quiz will help us find all the right restaurants to serve you best</p>
            </div>

            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Quiz Content</Accordion.Header>
                    <Accordion.Body>
                        <div className="check-container">
                            <div className="one-checkbox col-md-4">
                                {categoryTitleArray[0]}
                                {QuestionArray[0]}
                                {checkboxforEach(cuisineArray)}
                                <p></p>
                                {QuestionArray[1]}
                                {checkboxforEach(dietaryArray)}
                            </div>
                            <div className="one-checkbox col-md-4">
                                <p></p>
                                {categoryTitleArray[1]}
                                {QuestionArray[2]}
                                {checkboxforEach(typeArray)}
                                <p></p>
                                {QuestionArray[3]}
                                {checkboxforEach(ratingArray)}
                            </div>
                            <div className="one-checkbox col-md-4" >
                                <p></p>
                                {categoryTitleArray[2]}
                                {QuestionArray[4]}
                                {checkboxforEach(budgeteArray)}
                                <p></p>
                                {QuestionArray[5]}
                                {checkboxforEach(foodArray)}
                            </div>
                        </div>
                        <button onClick={props.applyFilterCallback} className="btn btn-outline-dark btn-sm submit">Submit</button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Outlet />
        </div>

    )

}