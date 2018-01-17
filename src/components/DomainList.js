import React from 'react';

import { Link } from 'react-router-dom';

import ProductListing from './ProductListing';

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
        <h1 className='domainHeading'>{this.props.domain.name}</h1>
        {subdomains.map(({ name, id }) => {
          return(
            <div key={id} className='subdomainSection'>
              <h2 className='subdomainHeading'>{name}</h2>
              <ProductListing id={id} limit={5}/>
              <Link className='toSubdomainBtn btn btn-primary' to={path + id}>
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
