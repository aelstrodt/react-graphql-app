import React from 'react';

class CourseItem extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <p>{this.props.id}</p>
    );
  }
}

export default CourseItem;
