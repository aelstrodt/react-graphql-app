import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Link } from 'react-router-dom';
import queryString from 'query-string';

import ProductItems from './ProductItems';
import PaginationLinks from './PaginationLinks';

const ProductListing = (props) => {
  if (props.listingQuery && props.listingQuery.loading) {
    return null;
  };
  if (props.listingQuery && props.listingQuery.error) {
    return <div>Error</div>;
  };

  const query = queryString.parse(props.location.search);
  query.page = query.page ? parseInt(query.page, 10) : 1;

  const domainPage = props.limit > 5 ? false : true;

  const start = domainPage ? 0 : (query.page - 1)*props.limit;
  const end = domainPage ? 5 : start + props.limit;

  const allProducts = props.listingQuery.CatalogResultsV1Resource.bySubdomain.elements[0].entries;
  const numberResults = allProducts.length;
  const products = allProducts.slice(start, end);

  const courses = products.filter(product => product.courseId);
  const courseIds = courses.map(course => course.courseId);

  const specializations = products.filter(product => product.onDemandSpecializationId);
  const specializationIds = specializations.map(specialization => specialization.onDemandSpecializationId);

  return(
    <div className="productListing">
      <ProductItems courseIds={courseIds} specializationIds={specializationIds}/>
      {domainPage ?
        <Link className='toSubdomainBtn btn btn-primary' to={props.location.pathname + '/' + props.id}>
          See All
        </Link>
        :
        <PaginationLinks numberResults={numberResults} path={props.location.pathname} page={query.page}/>
      }
    </div>
  );
}

const LISTING_QUERY = gql`
  query ListingQuery($id: String!, $langs: [String!]!, $pLangs: [String!]!) {
    CatalogResultsV1Resource{
      bySubdomain(subdomainId: $id, languages: $langs, primaryLanguages: $pLangs, limit: 250){
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
    langs: props.langs,
    pLangs: props.pLangs}})
  })(ProductListing);
