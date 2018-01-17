import React from 'react';

import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class DomainList extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if (this.props.subdomainsQuery && this.props.subdomainsQuery.loading) {
      return null;
    };
    if (this.props.subdomainsQuery && this.props.subdomainsQuery.error) {
      return <div>Error</div>;
    };
    const subdomains = this.props.subdomainsQuery.SubdomainsV1Resource.multiGet.elements;

    const path = "/browse/" + this.props.domain.id + "/";

    return(
      <div>
        <h1 className='domain-heading'>{this.props.domain.name}</h1>
        {subdomains.map(({ name, id }) => {
          return(
            <div key={id} className='subdomain-section'>
              <h2 className='subdomain-heading'>{name}</h2>
              <Link className='to-subdomain-btn btn btn-primary' to={path + id}>
                See All
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

const SUBDOMAINS_QUERY = gql`
  query SubdomainsQuery($ids: [String!]!) {
    SubdomainsV1Resource {
      multiGet(ids: $ids) {
        elements {
          id
          name
          description
          backgroundImageUrl
        }
      }
    }
  }`;

export default graphql(SUBDOMAINS_QUERY, {
  name: 'subdomainsQuery',
  options: ({ ids }) => ({ variables: { ids } })})(DomainList);
