import React from 'react';

import { Link } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';

const PaginationLinks = (props) => {
  props.query.page = props.page - 1
  const prevPath = {
    pathname: props.path,
    search: queryString.stringify(props.query)
  };
  props.query.page = props.page + 1
  const nextPath = {
    pathname: props.path,
    search: queryString.stringify(props.query)
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
          props.query.page = page + 1
          const path = {pathname: props.path, search: queryString.stringify(props.query)};
          return(
            <li key={page} className="page-item numberLink">
              <Link to={path} className="page-link" href="#">{page+1}</Link>
            </li>
          );
        })}
        <li className={`page-item ${props.page === maxPage ? 'disabled' : ''}`}>
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
