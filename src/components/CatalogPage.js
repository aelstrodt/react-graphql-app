import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import omit from 'object.omit';
import queryString from 'query-string';
import Loading from 'react-loading-components';

import ProductListing from './ProductListing';
import SectionLink from './SectionLink';
import Filters from './Filters';



const CatalogPage = (props) => {
  if (props.subdomainsQuery && props.subdomainsQuery.loading) {
    return (
      <div className="pageLoading">
        <Loading type="oval" width={60} height={60} fill='#4a89dc'/>
      </div>
    );
  };
  if (props.subdomainsQuery && props.subdomainsQuery.error) {
    return <div>Error</div>;
  };

  const subdomains = props.subdomainsQuery.SubdomainsV1Resource.multiGet.elements;
  const { domainId, subdomainId } = props.match.params;
  const subdomain = subdomainId ? subdomains.find(subdomain => subdomain.id == subdomainId) : null;
  const activeSubdomains = subdomain ? [subdomain] : subdomains;

  const domainIsActive = domainId && !subdomainId ? true : false;
  const subdomainIsActive = subdomainId ? true : false;
  const catalogIsActive = !domainId && !subdomainId ? true : false;

  const activePage = domainIsActive ? props.domain : subdomainIsActive ? subdomain : null;

  const imgStyles = !subdomain ? {
    backgroundImage: 'url('+props.domain.backgroundImageUrl+')',
    backgroundRepeat: 'repeat'
  } : {
    backgroundImage: 'url('+subdomain.backgroundImageUrl+')',
    backgroundRepeat: 'repeat'
  };

  return(
    <div className='courseList container-fluid'>
      <div className='header' alt='headerImg' style={imgStyles}>
        <div className='headerInfo'>
          <ol className="navLinks breadcrumb">
            <SectionLink name='Catalog' path="/browse" active={catalogIsActive}/>
            {domainId ?
            <SectionLink name={props.domain.name} path={"/browse/" + props.domain.id} active={domainIsActive}/>
            : null}
            {subdomainId ?
            <SectionLink name={subdomain.name} path={"/browse/" + props.domain.id + "/" + subdomain.id} active={subdomainIsActive}/>
            : null}
          </ol>
            <h1 className='catalogHeading'>{activePage.name}</h1>
            <p className='catalogDescription'>{activePage.description}</p>
        </div>
      </div>
      <div className='listingSection'>
        <Filters {...omit(props, ['domain','subdomainIds','subdomainsQuery'])}/>
          {activeSubdomains.map(({ name, id }) => {
            const limit = activeSubdomains.length > 1 ? 5 : 25;
            const query = queryString.parse(props.location.search);
            const langs = query.languages ? query.languages : [];
            const pLangs = query.primaryLanguages? query.primaryLanguages : [];
            return(
              <div key={id} className='subdomainSection'>
                <h2 className='subdomainHeading'>{name}</h2>
                <ProductListing langs={langs} pLangs={pLangs} {...omit(props, ['domain','subdomainIds','subdomainsQuery'])} id={id} limit={limit}/>
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
  options: (props) => ({ variables: {ids: props.subdomainIds} })})(CatalogPage);
