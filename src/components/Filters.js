import React from 'react';

import FilterButtons from './FilterButtons';
import FiltersModal from './FiltersModal';

const Filters = (props) => {
  return(
    <div className='filtersBox row no-gutters'>
      <div className='col-12 col-sm-2'>
        <p className='filterLabel align-top'>Active Filters:</p>
      </div>
      <div className='col'>
        <FilterButtons {...props}/>
      </div>
      <div className='col-1 col-sm-1'>
        <button type='button' className='modalBtn btn btn-light' data-toggle="modal" data-target="#filtersModal">
          <img
            src='https://d3njjcbhbojbot.cloudfront.net/web/bundles/catalog-browse/images/filter-modal-button.svg'
            alt='modalBtn'
          />
        </button>
      </div>
      <FiltersModal history={props.history} path={props.location.pathname} search={props.location.search}/>
    </div>
  );
};

export default Filters;
