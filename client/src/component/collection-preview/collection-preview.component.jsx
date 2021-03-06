import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';
import { withRouter } from 'react-router-dom';

const CollectionPreview = ({ title,history,match,routeName, items }) => { 
  return(
  <div className='collection-preview'>
    <h1 onClick={()=>history.push(`${match.url}/${routeName}`)}   
        className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item ={item} />
        ))}  
    </div>
  </div>);
}

export default withRouter(CollectionPreview);