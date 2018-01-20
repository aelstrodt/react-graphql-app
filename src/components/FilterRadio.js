import React from 'react';

const FilterRadio = (props) => {
  const isSelected = props.selectedLangs.indexOf(props.lang.id) === -1 ? false : true;
  const value = props.isPrimary ? 'pLang:' + props.lang.id : 'lang:' + props.lang.id;
  return(
    <div className="form-check">
      <label className="form-check-label">
        <input className="form-check-input" value={value} onChange={props.onRadioChange} type="checkbox" checked={isSelected}/>
        {props.lang.name}
      </label>
    </div>
  );
};

export default FilterRadio;
