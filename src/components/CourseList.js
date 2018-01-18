import React from 'react';

import DomainList from './DomainList';
import SubdomainList from './SubdomainList';
import Home from './Home';

const CourseList = (props) => {
  const { domainId, subdomainId, courseSlug } = props.filter;

  const domain = domainId ? props.domains.find(domain => domain.id === domainId) : null;

  return(
    <div className='courseList container-fluid'>
        {domainId && !subdomainId ?
          <DomainList domain={domain} ids={domain.subdomainIds} /> :
          domainId && subdomainId ?
          <SubdomainList domain={domain} id={subdomainId} /> :
          <Home />}
    </div>
  );
}


export default CourseList;
