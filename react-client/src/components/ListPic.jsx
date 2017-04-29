import React from 'react';

const ListPic = ({pic, index}) => {
  if (index === 0) {
    return (
      <div className="one">
      <img src={pic.regular}/>
      </div>
    )
  } else {
    return (
      <div className="col">
      <img src={pic.small}/>
      </div>
    )
  }
}
  

export default ListPic;