import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ProductItem from './ProductItem';

class ProductItems extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if (this.props.productQuery && this.props.productQuery.loading) {
      return null;
    };
    if (this.props.productQuery && this.props.productQuery.error) {
      return <div>Error</div>;
    };
    const productsRoot = this.props.productQuery;
    const courses = productsRoot.CoursesV1Resource.multiGet.elements;
    const specializations = productsRoot.OnDemandSpecializationsV1Resource.multiGet.elements;
    const products = specializations.concat(courses);

    return(
      <div className="product-list list-group">
        {products.map((product) => {
          return (
            <ProductItem key={product.id} product={product}/>
          );
        })}
      </div>
    );
  }
}

const PRODUCT_QUERY = gql`
  query productQuery($courseIds: [String!]!, $specializationIds: [String!]!){
    CoursesV1Resource{
      multiGet(ids: $courseIds){
        elements{
          id
          slug
          name
          photoUrl
          description
          partners{
            elements{
              name
            }
          }
          instructors{
            elements{
              fullName
              photo
            }
          }
        }
      }
    }
    OnDemandSpecializationsV1Resource {
      multiGet(ids: $specializationIds) {
        elements{
          id
          name
          slug
          logo
          tagline
          courseIds
          partners {
            elements {
              name
            }
          }
          instructors {
            elements {
              fullName
              photo
            }
          }
        }
      }
    }
  }`;

export default graphql(PRODUCT_QUERY, {
  name: 'productQuery',
  options: ({ courseIds, specializationIds }) => ({ variables: { courseIds, specializationIds } })})(ProductItems);