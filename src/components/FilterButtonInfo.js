import React from 'react';

import { Link } from 'react-router-dom';
import queryString from 'query-string';

const FilterButtonInfo = (props) => {
  return(
    <div>
      {props.languages.split(',').map(lan => {
        // search --> languages=en%2Cvi&page=1&primaryLanguages=es
        const cleanPath = !props.primary ? 'languages=' + lan : 'primaryLanguages='+lan;
        const search = queryString.stringify(props.params);
        let searchOmitted = search.replace(`%2C${lan}`, '') === search ?
        search.replace(`${lan}%2C`, '') :
        search.replace(`%2C${lan}`, '');
        searchOmitted = searchOmitted === search ? searchOmitted.replace(cleanPath, '') : searchOmitted;
        const path = {pathname: props.path, search: searchOmitted};
        return(
          <Link key={lan} to={path} className="filterBtn">{props.primary ? "Taught in " + lan : lan}</Link>
        );
      }
    )}
    </div>
  );
}

export default FilterButtonInfo;
