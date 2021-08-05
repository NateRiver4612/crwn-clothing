import React from 'react';

import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';
import { googleSignInStart,emailSignInStart } from '../../redux/user/user.actions';
import {connect} from 'react-redux'

class SignIn extends React.Component{
    constructor(props){
      super(props);
      this.state={
        email:'',
        password:'',
      }
    }
    
    handleSubmit = async (event) =>{
        event.preventDefault();
        const {email,password}  = this.state;
        const {emailSignInStart} = this.props

        emailSignInStart(email,password)
        // try{
        //     await auth.signInWithEmailAndPassword(email,password);
        //     this.setState({email:'',password:''});
        // }catch(error){
        //     console.log(error);
        // }
    }
    handleChange = (event)=>{
        const {name,value} = event.target;
        this.setState({[name]:value});

    }

    render(){
        return(
            <div className="sign-in">
                <h2 className='title'>I already have an account</h2>  
                <span>Sign in with your email and password</span>
                <form onSubmit = {this.handleSubmit}>
                    <FormInput 
                        name="email"
                        handleChange={this.handleChange}
                        type = 'email'
                        label = 'Email' 
                        value = {this.state.email} 
                        required/>
                    <FormInput 
                        name="password" 
                        handleChange={this.handleChange} 
                        type = 'password'
                        label = 'Password' 
                        value = {this.state.password} 
                        required/>
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton  
                            type = 'button'
                            onClick={this.props.googleSignInStart} 
                            isGoogleSignIn
                        >
                              Sign in with Google
                        </CustomButton>
                    </div>
                </form>

            </div>

        )
    }
}

const mapDispatchToProps = (dispatch)=>({
    emailSignInStart:(email,password)=>dispatch(emailSignInStart({email,password})),
    googleSignInStart:()=>dispatch(googleSignInStart())
})

export default connect(null,mapDispatchToProps)(SignIn);