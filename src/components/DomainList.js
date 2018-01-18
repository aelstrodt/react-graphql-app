import React from 'react';

import { Link } from 'react-router-dom';

import ProductListing from './ProductListing';
import SectionLink from './SectionLink';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const DomainList = (props) => {
  if (props.subdomainsQuery && props.subdomainsQuery.loading) {
    return null;
  };
  if (props.subdomainsQuery && props.subdomainsQuery.error) {
    return <div>Error</div>;
  };
  const subdomains = props.subdomainsQuery.SubdomainsV1Resource.multiGet.elements;

  const path = "/browse/" + props.domain.id + "/";

  const domain = {
    name: props.domain.name,
    path: "/browse/" + props.domain.id
  };

  const imgStyles = {
    backgroundImage: 'url('+props.domain.backgroundImageUrl+')',
    backgroundRepeat: 'repeat'
  };

  return(
    <div>
      <div className='header' alt='headerImg' style={imgStyles}>
        <SectionLink domain={domain} subdomain={null}/>
        <h1 className='domainHeading'>{props.domain.name}</h1>
      </div>
      <div className='listingSection'>
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
    </div>
  );
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
