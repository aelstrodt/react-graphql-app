import React from 'react';

class SpecializationItem extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <p>{this.props.id}</p>
    );
  }
}

export default SpecializationItem;
