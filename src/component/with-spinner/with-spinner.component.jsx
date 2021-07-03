import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styled';

const WithSpinner = WrappedComponent =>({isLoading,...otherProps})=>{
    console.log(WrappedComponent)
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ):(
        <WrappedComponent {...otherProps}/>
    );

}

export default WithSpinner;