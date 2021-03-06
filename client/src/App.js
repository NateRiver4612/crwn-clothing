import React,{useEffect} from 'react';
import { Switch, Route ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './component/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import CheckoutPage from './page/checkout/checkout.component';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import { selectCollectionFetching } from './redux/shop/shop.selector';
import {fetchCollectionsStartAsync} from './redux/shop/shop.actions'
import {checkUserSession} from './redux/user/user.actions'

const App=({checkUserSession,currentUser})=>{

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return(
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' 
            render={ ()=>
              currentUser 
               ? (<Redirect to='/'></Redirect>) 
               : (<SignInAndSignUpPage/>)
            } />
        </Switch>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isCollectionFetching:selectCollectionFetching
});

const mapDispatchToProps = dispatch => ({
  // setCurrentUser: user => dispatch(setCurrentUser(user)),
  // fetchCollectionsStartAsync : ()=>dispatch(fetchCollectionsStartAsync())
  checkUserSession:()=>dispatch(checkUserSession())
});


export default connect(
  mapStateToProps,mapDispatchToProps
)(App);