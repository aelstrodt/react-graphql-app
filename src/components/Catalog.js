import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import omit from 'object.omit';
import { Link } from 'react-router-dom';
import Loading from 'react-loading-components';
import Sidebar from './Sidebar';
import CatalogPage from './CatalogPage';

const Catalog = (props) => {
  if (props.domainQuery && props.domainQuery.loading) {
    return (
      <div className="pageLoading">
        <Loading type="oval" width={60} height={60} fill='#4a89dc'/>;
      </div>
    );
  };
  if (props.domainQuery && props.domainQuery.error) {
    return <div>Error</div>;
  };
  const domains = props.domainQuery.DomainsV1Resource.getAll.elements;
  const { domainId } = props.match.params;
  const domain = domainId ? domains.find(domain => domain.id == domainId) : null;

  const { subdomainId } = props.match.params;
  const subdomainIds = subdomainId ? [subdomainId] : domain ? domain.subdomainIds : null;

  return (
    <div className='app container-fluid'>
      <Sidebar search={props.location.search} domains={domains}/>
      {domain ?
      <CatalogPage domain={domain} subdomainIds={subdomainIds} {...omit(props, 'domainQuery')}/>
      :
      <div className="catalogHome container-fluid">
        <div className="homeBanner">
          <h4 className="homeHeading">Hundreds of Specializations and Courses in
            <Link to="/browse/business">Business</Link>,
            <Link to="/browse/computer-science">Computer Science</Link>,
            <Link to="/browse/data-science">Data Science</Link>,
            and more.</h4>
        </div>
      </div>
      }
    </div>
  );
}

const DOMAIN_QUERY = gql`
    query DomainQuery {
    DomainsV1Resource{
      getAll{
        elements{
          id
          name
          description
          displayColor
          backgroundImageUrl
          subdomainIds
        }
      }
    }
  }
`;

export default graphql(DOMAIN_QUERY, {name: 'domainQuery'})(Catalog);
