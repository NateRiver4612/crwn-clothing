import React from 'react';
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

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
      const {checkUserSession} = this.props
      checkUserSession()
  //   const { setCurrentUser} = this.props;
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //     console.log(userAuth)
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);
  //       userRef.onSnapshot(snapShot => {
  //         setCurrentUser({ 
  //           id: snapShot.id,
  //           ...snapShot.data()
  //         });
  //       });
  //     }
  //     setCurrentUser(userAuth);
  //   });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log(this.props.currentUser)
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' 
            render={ ()=>
              this.props.currentUser 
               ? (<Redirect to='/'></Redirect>) 
               : (<SignInAndSignUpPage/>)
            } />
        </Switch>
      </div>
    );
  }
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