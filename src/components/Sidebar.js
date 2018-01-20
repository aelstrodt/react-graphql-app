import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const sidebarClass = props.path === '/browse' ? 'main' : '';
  return(
    <div className={`sidebar ${sidebarClass} list-group`}>
      <h4 className="list-group-item">Categories</h4>
      {props.domains.map(({ name, id }) => {
        const path = {
          pathname: '/browse/' + id,
          search: props.search
        };
        return (
          <Link key={id} className='sidebarItem list-group-item list-group-item-action' to={path}>{name}</Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
