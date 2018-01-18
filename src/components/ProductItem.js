import React from 'react';

const ProductItem = (props) => {
  const isCourse = props.product.__typename === 'CoursesV1' ? true: false;
  const className = isCourse ? 'courseItem ' : 'specializationItem ';
  const { product } = props;
  return(
    <div className={className + "productItem list-group-item list-group-item-action"}>
      <div className='productImg'>
        <img alt={product.name} src={isCourse ? product.photoUrl : product.logo}/>
      </div>
      <div className='productInfo'>
        <h4 className='productName'>{product.name}</h4>
        {isCourse ? null : <p className='specializationSize'>{`${product.courseIds.length}-course Specialization`}</p>}
        <p className='partnerName'>{product.partners.elements[0].name}</p>
      </div>
    </div>
  );
};

export default ProductItem;
