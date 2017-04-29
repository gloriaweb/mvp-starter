import React from 'react';
import ListPic from './ListPic.jsx';

const List = ({pics}) => (
  <div className="flex-grid">
    {pics.map((pic, index) => (
      <ListPic pic={pic} index={index} key={pic.pic_id} />
      )
    )}
  </div>
)

export default List;