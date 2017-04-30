import React from 'react';

const ListPic = ({pic, index}) => {
  if (index === 0) {
    return (
      <div className="one"><a href={pic.regular} target="blank">
      <img src={pic.regular}/></a>
      </div>
    )
  } else {
    return (
      <div className="col"><a href={pic.regular} target="blank">
      <img src={pic.small}/></a>
      </div>
    )
  }
}
  

export default ListPic;