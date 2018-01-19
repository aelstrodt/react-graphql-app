import React from 'react';

import { Link } from 'react-router-dom';

const SectionLink = (props) => {
  return(
    <li className={`breadcrumb-item ${props.active ? 'active' : null}`}>
      <Link to={props.path}>{props.name}</Link>
    </li>
  );
};

export default SectionLink;
