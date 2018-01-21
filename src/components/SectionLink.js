import React from 'react';
import { Link } from 'react-router-dom';

const SectionLink = (props) => {
  const path = {
    pathname: props.path,
    search: props.search
  }
  return(
    <li className={`breadcrumb-item ${props.active ? 'active' : null}`}>
      <Link to={path}>{props.name}</Link>
    </li>
  );
};

export default SectionLink;
