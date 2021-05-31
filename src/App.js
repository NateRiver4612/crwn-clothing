import React from 'react';
import './App.css';
import HomePage from './page/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './page/shop/shop.component';
import Header from './component/header/header.component';
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth} from './firebase/firebase.utils';
 

const HatsPage=()=>(
  <div>
    <h1>Hate pages</h1>
  </div>
)

class App extends React.Component {
  constructor(){
    super();

    this.state={
      currentUser : null
    }
  }
  unsubscribeFromAuth = null
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user)=>{
      this.setState({currentUser:user})
      console.log(user.displayName)
    });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
    console.log('Unmount');
  }

  render(){
  return (
    <div className="App">
      <Header currentUser ={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/hats' component={HatsPage}/>
        <Route path='/signIn' component={SignInAndSignUpPage}/>
      </Switch>
    </div>
  );}
}

export default App;
