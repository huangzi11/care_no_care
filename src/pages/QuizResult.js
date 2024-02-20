import React from 'react';

function EachCard(props) {

  let combinedBadge = [...props.card.category.split(', ')];
  let allBadges = combinedBadge.map((badge) => {
      return (<span key={badge} className="badge rounded-pill bg-light text-dark same">{badge}</span>)
  })

  return (
      <div className="col-md-4 col-lg-3 d-flex mt-4">
          <div className="card-quiz">
              <div className='card-body'>
                  <img src={props.card.Picture_link} className="card-quiz-img-top" alt={props.card.name} />
                  <h2 className="card-text-name">{props.card.name}</h2>
              </div>
              <div className="card-footer">
                  {allBadges}
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={props.card.user_image} roundedCircle style={{width: '20px', height: '20px', marginRight: '10px'}} alt={`picture of the user ${props.card.user_name}`}/>
                        <div>{props.card.user_name}</div>
                    </div>
                    <a href="#" style={{textDecoration: 'none', color: 'inherit'}}>{props.card.comment_time}</a>
                  </div>
              </div>
          </div>
      </div>
  )

}

export function AllCards(props) {

  console.log(props)
  const sortedData = props.data;
  console.log(sortedData)
  
  let cardList = sortedData.map((restaurant) => {
      return (<EachCard key={restaurant.name} card={restaurant} />)
  })

  return (
    <section className="products-list">
      <div className="row">
          {cardList}
          { cardList.length < 1 && <h2 className="sorry">Sorry, there are no restaurant to display with your filters. Please try again.</h2>}
      </div>
    </section>
  )
}