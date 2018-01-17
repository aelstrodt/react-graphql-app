import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Sidebar from './Sidebar';
import CourseList from './CourseList';

class Catalog extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.domainQuery && this.props.domainQuery.loading) {
      return <div>Loading</div>;
    };
    if (this.props.domainQuery && this.props.domainQuery.error) {
      return <div>Error</div>;
    };
    const domains = this.props.domainQuery.DomainsV1Resource.getAll.elements;

    return (
      <div className='app container-fluid'>
        <Sidebar domains={domains}/>
        <CourseList domains={domains} filter={this.props.match.params}/>
      </div>
    );
  }
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
