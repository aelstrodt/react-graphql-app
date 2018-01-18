import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ProductItems from './ProductItems';

const ProductListing = (props) => {
  if (props.listingQuery && props.listingQuery.loading) {
    return null;
  };
  if (props.listingQuery && props.listingQuery.error) {
    return <div>Error</div>;
  };

  const productIds = props.listingQuery.CatalogResultsV1Resource.bySubdomain.elements[0].entries;

  const courses = productIds.filter(product => product.courseId);
  const courseIds = courses.map(course => course.courseId);

  const specializations = productIds.filter(product => product.onDemandSpecializationId);
  const specializationIds = specializations.map(specialization => specialization.onDemandSpecializationId);

  return(
    <ProductItems courseIds={courseIds} specializationIds={specializationIds}/>
  );
}

const LISTING_QUERY = gql`
  query ListingQuery($id: String!, $limit: Int!) {
    CatalogResultsV1Resource{
      bySubdomain(subdomainId: $id, limit: $limit){
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
  options: (props) => ({variables:{
    id: props.id, 
    limit: props.limit}})
  })(ProductListing);
