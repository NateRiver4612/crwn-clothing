import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.style.scss';
import {selectDirectorySelections} from '../../redux/directory/direcotry.selector';
import {createStructuredSelector} from 'reselect';
import { connect } from 'react-redux';

const Directory =({sections}) =>{
        return (
            <div className="directory-menu">
                {
                  sections.map(({id,...otherSectionProps}) =>(
                    <MenuItem 
                       key={id}
                       {...otherSectionProps }/>
                    ))
                }
            </div>
        )
}

const mapStateToProps = createStructuredSelector({
    sections:selectDirectorySelections
})

export default connect(mapStateToProps)(Directory);