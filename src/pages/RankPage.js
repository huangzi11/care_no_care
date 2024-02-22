import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ComparisonTable({ info_data }) {
  const sortedData = [...info_data].sort((a, b) => b.num_cares - a.num_cares);
  const rows = sortedData.map((item, index) => {
    return <InfoTableRow key={index} info={item} />;
  });

  return (
    <div>
      <header className="rank-header">
        <h1>Weekly Ranking of The Most Cared INFO</h1>
        <p>Update every Monday</p>
      </header>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr id="columnHeader">
              <th scope="col">Information</th>
              <th scope="col">Category</th>
              <th scope="col">How Many People Cared&#128293;</th>
              <th scope="col">Page link</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

function InfoTableRow({ info }) {
  const { category } = info; // Destructure data for easier access
  let combinedBadge = category.split(", ");
  let allBadges = combinedBadge.map((badge) => (
    <span key={badge} className="badge rounded-pill bg-light text-dark same">
      {badge}
    </span>
  ));
  let numCare = info.num_cares;

  return (
    <tr id="table">
      <td id="productCell">
        <b>{info.name}</b>
      </td>
      <td id="productCell">{allBadges}</td>
      <td id="productCell">{numCare}</td>
      <td id="productCell">
        <Link to={`/community/${info.name}`}>
          <Button variant="warning" className="w-100">
            View
          </Button>
        </Link>
      </td>
    </tr>
  );
}
