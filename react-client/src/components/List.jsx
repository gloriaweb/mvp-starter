import React from 'react';
import ListPic from './ListPic.jsx';

const List = (props) => (
  <div className="flex-grid">
    {props.pics.map((pic, index) => (
      <ListPic pic={pic} index={index} key={pic.pic_id} />
      )
    )}
  </div>
)

export default List;