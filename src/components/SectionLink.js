import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const SectionLink = (props) => {
  const search = queryString.parse(props.search);
  if(search.page){delete search.page};
  const path = {
    pathname: props.path,
    search: queryString.stringify(search)
  }
  return(
    <li className={`breadcrumb-item ${props.active ? 'active' : null}`}>
      <Link to={path}>{props.name}</Link>
    </li>
  );
};

export default SectionLink;
