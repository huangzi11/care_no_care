import React from 'react';

function EachCard({ card }) {
  let combinedBadge = card.category.split(', ');
  let allBadges = combinedBadge.map((badge) => (
    <span key={badge} className="badge rounded-pill bg-light text-dark same">{badge}</span>
  ));

  return (
    <div className="col-md-4 col-lg-3 d-flex mt-4">
      <div className="card-quiz">
        <div className='card-body'>
          <img src={card.Picture_link} className="card-quiz-img-top" alt={card.name} />
          <h2 className="card-text-name">{card.name}</h2>
        </div>
        <div className="card-footer">
          {allBadges}
        </div>
      </div>
    </div>
  );
}

export function AllCards({ data }) {
  let cardList = data.map((info) => (
    <EachCard key={info.name} card={info} />
  ));

  return (
    <section className="products-list">
      <div className="row">
        {cardList}
        {cardList.length < 1 && <h2 className="sorry">Sorry, there are no info to display with your filters. Please try again.</h2>}
      </div>
    </section>
  );
}
