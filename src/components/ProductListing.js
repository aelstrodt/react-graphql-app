import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CourseItem from './CourseItem';
import SpecializationItem from './SpecializationItem';

class ProductListing extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if (this.props.listingQuery && this.props.listingQuery.loading) {
      return null;
    };
    if (this.props.listingQuery && this.props.listingQuery.error) {
      return <div>Error</div>;
    };

    const productIds = this.props.listingQuery.CatalogResultsV1Resource.bySubdomain.elements[0].entries;

    return(
      <div className="list-group">
        {productIds.map(ids => {
          return(
            ids.courseId ?
            <CourseItem key={ids.courseId} id={ids.courseId}/> :
            <SpecializationItem key={ids.onDemandSpecializationId} id={ids.onDemandSpecializationId}/>
          );
        })}
      </div>
    );
  }
}

const LISTING_QUERY = gql`
  query ListingQuery($id: String!) {
    CatalogResultsV1Resource{
      bySubdomain(subdomainId: $id, limit: 5){
        elements{
          entries{
            courseId
            onDemandSpecializationId
          }
        }
      }
    }
  }`;

export default graphql(LISTING_QUERY, {
  name: 'listingQuery',
  options: ({ id }) => ({ variables: { id } })})(ProductListing);
