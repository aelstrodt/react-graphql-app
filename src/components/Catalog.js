import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import omit from 'object.omit';

import Sidebar from './Sidebar';
import CourseList from './CourseList';

const Catalog = (props) => {
  if (props.domainQuery && props.domainQuery.loading) {
    return <div>Loading</div>;
  };
  if (props.domainQuery && props.domainQuery.error) {
    return <div>Error</div>;
  };
  const domains = props.domainQuery.DomainsV1Resource.getAll.elements;
  const { domainId } = props.match.params;
  const domain = domainId ? domains.find(domain => domain.id == domainId) : null;

  const { subdomainId } = props.match.params;
  const subdomainIds = subdomainId ? [subdomainId] : domain ? domain.subdomainIds : null;

  return (
    <div className='app container-fluid'>
      <Sidebar domains={domains}/>
      {domain ?
        <CourseList domain={domain} subdomainIds={subdomainIds} {...omit(props, 'domainQuery')}/>
      : null}
    </div>
  );
}

const DOMAIN_QUERY = gql`
    query DomainQuery {
    DomainsV1Resource{
      getAll{
        elements{
          id
          name
          description
          displayColor
          backgroundImageUrl
          subdomainIds
        }
      }
    }
  }
`;

export default graphql(DOMAIN_QUERY, {name: 'domainQuery'})(Catalog);
