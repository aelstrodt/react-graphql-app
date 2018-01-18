import React from 'react';

import queryString from 'query-string';

import DomainList from './DomainList';
import SubdomainList from './SubdomainList';
import Home from './Home';

const CourseList = (props) => {

  const { domainId, subdomainId, courseSlug } = props.filter.match.params;
  const domain = domainId ? props.domains.find(domain => domain.id === domainId) : null;

  const query = queryString.parse(props.filter.location.search);
  if(!query.page){query.page = 1};

  return(
    <div className='courseList container-fluid'>
        {domainId && !subdomainId ?
          <DomainList query={query} domain={domain} ids={domain.subdomainIds} /> :
          domainId && subdomainId ?
          <SubdomainList query={query} domain={domain} id={subdomainId} /> :
          <Home />}
    </div>
  );
}


export default CourseList;
