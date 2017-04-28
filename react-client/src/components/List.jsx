import React from 'react';
import ListPic from './ListPic.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.pics.length } items.
    { props.pics.map(pics => <ListPic pics={pics}/>)}
  </div>
)

export default List;