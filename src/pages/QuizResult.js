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
              </div>
          </div>
      </div>
  )

}

export function AllCards(props) {

  console.log(props)
  const sortedData = props.data;
  console.log(sortedData)
  
  let cardList = sortedData.map((info) => {
      return (<EachCard key={info.name} card={info} />)
  })

  return (
    <section className="products-list">
      <div className="row">
          {cardList}
          { cardList.length < 1 && <h2 className="sorry">Sorry, there are no info to display with your filters. Please try again.</h2>}
      </div>
    </section>
  )
}