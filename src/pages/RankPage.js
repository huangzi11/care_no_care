import React, {useState} from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ComparisonTable({ info_data }) {
  /* Enabling the pagination function */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Adjust the number of items per page as need

  const rankStyle = {
    padding:'100px'
  };

  const sortedData = [...info_data].sort((a, b) => b.num_cares - a.num_cares);

  // Calculate total pages and paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Correctly mapping over currentItems for the current page
  const rows = currentItems.map((item, index) => {
    return <InfoTableRow key={index} info={item} />;
  });

  // Previous Page
  const previousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Next Page
  const nextPage = () => {
    setCurrentPage((prev) => (prev < Math.ceil(sortedData.length / itemsPerPage) ? prev + 1 : prev));
  };

  return (
    <div style={rankStyle}>
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
              <th scope="col">How Many People Cared🔥</th>
              <th scope="col">Page link</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <div className="pagination">
          <Button onClick={previousPage} variant="primary">Previous</Button>
          <Button onClick={nextPage} variant="primary">Next</Button>
        </div>
      </div>
    </div>
  );
}


function InfoTableRow({ info }) {
  const { category } = info;
  let combinedBadge = category.split(", ");
  let allBadges = combinedBadge.map((badge) => (
    <span key={badge} className="badge rounded-pill bg-light text-dark">
      {badge}
    </span>
  ));

  return (
    <tr id="table">
      <td id="productCell">
        <b>{info.name}</b>
      </td>
      <td id="productCell">{allBadges}</td>
      <td id="productCell">{info.num_cares}</td>
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
