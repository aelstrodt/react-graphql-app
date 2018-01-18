import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ProductListing from './ProductListing';
import SectionLink from './SectionLink';

const SubdomainList = (props) => {
  if (props.subdomainQuery && props.subdomainQuery.loading) {
    return null;
  };
  if (props.subdomainQuery && props.subdomainQuery.error) {
    return <div>Error</div>;
  };

  const subdomainInfo = props.subdomainQuery.SubdomainsV1Resource.get;
  const subdomain = {
    name: subdomainInfo.name,
    path: '/browse/' + subdomainInfo.id
  };

  const domain = {
    name: props.domain.name,
    path: "/browse/" + props.domain.id
  };

  const imgStyles = {
    backgroundImage: 'url('+subdomainInfo.backgroundImageUrl+')',
    backgroundRepeat: 'repeat'
  };

  return(
    <div>
      <div className='header' style={imgStyles}>
        <SectionLink domain={domain} subdomain={subdomain}/>
        <h1 className='subdomainHeading'>{subdomain.name}</h1>
      </div>
      <div className='listingSection'>
        <div className='subdomainSection'>
          <ProductListing id={subdomainInfo.id} limit={10}/>
        </div>
      </div>
    </div>
  );
}


const SUBDOMAIN_QUERY = gql`
  query SubdomainQuery($id: String!) {
    SubdomainsV1Resource{
      get(id: $id){
        id
        name
        description
        backgroundImageUrl
      }
    }
  }`;

export default graphql(SUBDOMAIN_QUERY, {
  name: 'subdomainQuery',
  options: (props) => ({ variables: {id: props.id} })})(SubdomainList);
