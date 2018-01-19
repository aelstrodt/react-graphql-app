import React from 'react';

import queryString from 'query-string';

class FiltersModal extends React.Component{
  constructor(props){
    super(props);
    this.state={
      languages: this.props.query.languages,
      primaryLanguages: this.props.query.primaryLanguages
    };
  }
  render() {
    return (
        <div id="filtersModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Refine Your Search</h5>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                    <label className="form-check-label">
                      Default checkbox
                    </label>
                  </div>
                  <button className='btn btn-primary' id="submitFilters" type="submit">Submit</button>
                  <button type="button" id="closeFilters" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default FiltersModal;
