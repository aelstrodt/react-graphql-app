import React from 'react';

import FilterButtons from './FilterButtons';
import FiltersModal from './FiltersModal';

import queryString from 'query-string';

const Filters = (props) => {
  return(
    <div className='filtersBox'>
      <p className='filterLabel'>Active Filters:</p>
      <FilterButtons {...props}/>
      <button type='button' className='modalBtn btn btn-light' data-toggle="modal" data-target="#filtersModal">
        <img
          src='https://d3njjcbhbojbot.cloudfront.net/web/bundles/catalog-browse/images/filter-modal-button.svg'
          alt='modalBtn'
        />
      </button>
      <FiltersModal query={queryString.parse(props.location.search)}/>
    </div>
  );
};

export default Filters;
