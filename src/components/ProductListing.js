import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Link } from 'react-router-dom';

import ProductItems from './ProductItems';
import PaginationLinks from './PaginationLinks';

const ProductListing = (props) => {
  if (props.listingQuery && props.listingQuery.loading) {
    return null;
  };
  if (props.listingQuery && props.listingQuery.error) {
    return <div>Error</div>;
  };
  const start = props.paginationPath ? (parseInt(props.query.page,10) - 1)*props.limit : 0;
  const end = props.paginationPath ? start + props.limit : 5;

  const allProducts = props.listingQuery.CatalogResultsV1Resource.bySubdomain.elements[0].entries;
  const numberResults = allProducts.length;
  const products = allProducts.slice(start, end);

  const courses = products.filter(product => product.courseId);
  const courseIds = courses.map(course => course.courseId);

  const specializations = products.filter(product => product.onDemandSpecializationId);
  const specializationIds = specializations.map(specialization => specialization.onDemandSpecializationId);

  return(
    <div>
      <ProductItems courseIds={courseIds} specializationIds={specializationIds}/>
      {props.paginationPath ?
        <PaginationLinks numberResults={numberResults} path={props.paginationPath} page={props.query.page}/>
        : <Link className='toSubdomainBtn btn btn-primary' to={props.path}>
          See All
        </Link>
      }
    </div>
  );
}

const LISTING_QUERY = gql`
  query ListingQuery($id: String!) {
    CatalogResultsV1Resource{
      bySubdomain(subdomainId: $id, limit: 250){
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
    id: props.id}})
  })(ProductListing);
