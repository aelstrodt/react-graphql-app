import React from 'react';
import { Link } from 'react-router-dom';
import { modifyQuery } from '../helpers/modifyQuery';

import langs from '../langs/langs';

const FilterButtonInfo = (props) => {
  return(
      props.languages.split(',').map(lan => {
        const searchOmitted = modifyQuery(props.primary, lan, props.search);
        const path = {pathname: props.path, search: searchOmitted};
        const name = props.primary ? langs.primaryLanguages.find(lang => lang.id === lan).name : langs.languages.find(lang => lang.id === lan).name;
        return(
          <Link key={lan} to={path} className="filterBtn btn btn-dark">{props.primary ? "Taught in " + name : name}</Link>
        );}
      )
  );
}


export default FilterButtonInfo;
