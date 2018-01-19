import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import FilterButtonInfo from './FilterButtonInfo';

const FilterButtons = (props) => {
  const query = queryString.parse(props.location.search);
  return(
    <div className='filterButtons'>
      {query.languages ?
        <FilterButtonInfo primary={false} languages={query.languages} params={query} path={props.location.pathname}/>
      : null}
      {query.primaryLanguages ?
        <FilterButtonInfo primary={true} languages={query.primaryLanguages} params={query} path={props.location.pathname}/>
      : null}
    </div>
  );
}

export default FilterButtons;
