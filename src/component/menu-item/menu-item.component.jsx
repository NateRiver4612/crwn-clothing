import React from 'react';
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom';

const MenuItem = ({size,title,img,linkUrl,history,match})=>(
    <div 
        className={`${size}  menu-item`} 
        onClick={()=>history.push(`${match.url}${linkUrl}`)}> 
        <div  
            style={{
                backgroundImage:`url(${img})`
            }}
            className="background-image"
        />
        <div className="content">
           <h1 className="title">{title.toUpperCase()}</h1>
           <span className="subtitle">Shop Now</span>          
        </div>
    </div>

)
export default withRouter(MenuItem);