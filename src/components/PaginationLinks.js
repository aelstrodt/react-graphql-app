import React from 'react';

import { Link } from 'react-router-dom';

import _ from 'lodash';

const PaginationLinks = (props) => {
  const prevPath = {
    pathname: props.path,
    search: `?page=${props.page - 1}`
  };
  const nextPath = {
    pathname: props.path,
    search: `?page=${props.page + 1}`
  };

  const maxPage = Math.ceil(props.numberResults/25);

  return(
    <nav aria-label="course pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${props.page === 1 ? 'disabled' : ''}`}>
          <Link to={prevPath} className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </Link>
        </li>
        {_.range(maxPage).map(page => {
          const path = {pathname: props.path, search: `?page=${page+1}`};
          return(
            <li key={page} className="page-item">
              <Link to={path} className="page-link" href="#">{page+1}</Link>
            </li>
          );
        })}
        <li className={`page-item ${props.page === 10 ? 'disabled' : ''}`}>
          <Link to={nextPath} className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}


export default PaginationLinks;
