import React from 'react';

import queryString from 'query-string';
import { Link } from 'react-router-dom';

import FilterRadio from './FilterRadio';
import langs from '../langs/langs';

class FiltersModal extends React.Component{
  constructor(props){
    super(props);
    const query = queryString.parse(this.props.search);
    const languages = query.languages ? query.languages.split(',') : [];
    const primaryLanguages = query.primaryLanguages ? query.primaryLanguages.split(',') : [];
    this.state={
      languages: languages,
      primaryLanguages: primaryLanguages
    };
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onFilterSubmit = this.onFilterSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const query = queryString.parse(nextProps.search);
    const languages = query.languages ? query.languages.split(',') : [];
    const primaryLanguages = query.primaryLanguages ? query.primaryLanguages.split(',') : [];
    this.setState({
      languages: languages,
      primaryLanguages: primaryLanguages
    });
  }

  onRadioChange({ target }){
    const lang = target.value.split(':');
    const isPrimary = lang[0] == 'pLang' ? true : false;
    const langId = lang[1];
    if(isPrimary){
      if(target.checked){
        const newPrimaryLangs = this.state.primaryLanguages.concat(langId);
        this.setState({
            primaryLanguages: newPrimaryLangs
        });
      }else{
        const newPrimaryLangs = this.state.primaryLanguages.filter(id => id != langId);
        this.setState({
            primaryLanguages: newPrimaryLangs
        });
      }
    } else {
      if(target.checked){
        const newLangs = this.state.languages.concat(langId);
        this.setState({
          languages: newLangs
        });
      } else {
        const newLangs = this.state.languages.filter(id => id != langId);
        this.setState({
          languages: newLangs
        });
      }
    }
  }

  onFilterSubmit(){
    const query = queryString.parse(this.props.search);
    query.languages = this.state.languages.length === 0 ? null : this.state.languages.join(',');
    if(!query.languages){delete query.languages;};
    query.primaryLanguages = this.state.primaryLanguages.length === 0 ? null : this.state.primaryLanguages.join(',');
    if(!query.primaryLanguages){delete query.primaryLanguages;};
    if(query){this.props.history.push(this.props.path + '?' + queryString.stringify(query))}
    else{
      this.props.history.push(this.props.path);
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
                <div className="container">
                  <div className="row">
                    <div className='col'>
                      <h4 className='modalSubheading'>Subtitle Languages</h4>
                      {langs.languages.map(lang => {
                        return(
                          <FilterRadio isPrimary={false} key={"lang:" + lang.id} lang={lang} onRadioChange={(e)=>this.onRadioChange(e)} selectedLangs={this.state.languages} />
                        );
                      })}
                    </div>
                    <div className='col'>
                      <h4 className='modalSubheading'>Course Languages</h4>
                      {langs.primaryLanguages.map(lang => {
                        return(
                          <FilterRadio isPrimary={true} key={"pLang:" + lang.id} lang={lang} onRadioChange={(e)=>this.onRadioChange(e)} selectedLangs={this.state.primaryLanguages} />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'/>
                <button className='btn btn-primary' onClick={this.onFilterSubmit} id="submitFilters" type="submit" data-dismiss="modal">Update Results</button>
              </div>
            </div>
          </div>
    );
  }
}

export default FiltersModal;
