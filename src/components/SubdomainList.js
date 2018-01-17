import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SubdomainList extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    if (this.props.subdomainQuery && this.props.subdomainQuery.loading) {
      return null;
    };
    if (this.props.subdomainQuery && this.props.subdomainQuery.error) {
      return <div>Error</div>;
    };
    const subdomain = this.props.subdomainQuery.SubdomainsV1Resource.get;

    return(
      <h1>{subdomain.name}</h1>
    );
  }
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
  options: ({ id }) => ({ variables: { id } })})(SubdomainList);
