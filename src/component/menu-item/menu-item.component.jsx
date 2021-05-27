import React from 'react';
import './menu-item.styles.scss';


const MenuItem = ({size,title,img})=>(
    <div className={`${size}  menu-item`}> 
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
export default MenuItem;