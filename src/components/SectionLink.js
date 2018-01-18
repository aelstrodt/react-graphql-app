import React from 'react';

import { Link } from 'react-router-dom';

const SectionLink = (props) => {
  return(
    <ol className="navLinks breadcrumb">
      <li className='breadcrumb-item'>
        <Link to='/browse'>Catalog</Link>
      </li>
      {props.domain ?
      <li className={`breadcrumb-item ${props.subdomain ? null : 'active'}`}>
        <Link to={props.domain.path}>{props.domain.name}</Link>
      </li>
      : null}
      {props.domain && props.subdomain ?
      <li className='breadcrumb-item active'>
        <Link to={props.subdomain.path}>{props.subdomain.name}</Link>
      </li>
      : null}
    </ol>
  );
};

export default SectionLink;
