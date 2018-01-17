import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {

  return(
    <div className="sidebar list-group">
      <h4 className="list-group-item">Categories</h4>
      {props.domains.map(({ name, id }) => {
        return (
          <Link key={id} className='sidebarItem list-group-item list-group-item-action' to={'/browse/' + id}>{name}</Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
