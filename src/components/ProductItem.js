import React from 'react';

const ProductItem = (props) => {
  const isCourse = props.product.__typename === 'CoursesV1' ? true: false;
  const className = isCourse ? 'courseItem ' : 'specializationItem ';
  const { product } = props;
  const { instructors } = product;
  const instructor = instructors.elements[0];
  console.log(instructor);
  return(
    <div className={className + "productItem list-group-item list-group-item-action"}>
      <div className='row'>
        <div className='productImg col-12 col-sm-3 col-md-3 col-lg-3 col-xl-2'>
          <img alt={product.name} src={isCourse ? product.photoUrl : product.logo}/>
        </div>
        <div className='productInfo col'>
          <h4 className='productName'>{product.name}</h4>
          {isCourse ? null : <p className='specializationSize'>{`${product.courseIds.length}-course Specialization`}</p>}
          <p className='partnerName'>{product.partners.elements[0].name}</p>
        </div>
        <div className='instructorInfo col-3'>
          <img className='instructorPhoto' alt={instructor.name} src={instructor.photo}/>
          <p className='instructorName'>{instructor.fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
