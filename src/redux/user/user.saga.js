import { all, call,takeLatest,put } from "redux-saga/effects";
import { auth,createUserProfileDocument,firestore,getCurrentUser,provider } from "../../firebase/firebase.utils";
import { signInSuccess,signInFailure ,signOutFailure,signOutSuccess,signUpSuccess, signUpFailure} from "./user.actions";
import UserActionTypes from "./user.types";

export function* getSnapshotFromUserAuth(user,additionalData){
    try{
        const userRef = yield call(createUserProfileDocument,user,additionalData)
        const userSnapshot =yield userRef.get()
        yield put(signInSuccess(userSnapshot.data()))
    }catch(error){
        yield(put(signInFailure(error)))
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(provider)
        console.log(user)
        yield getSnapshotFromUserAuth(user)       
    }catch(error){
        yield(put(signInFailure(error)))
    }
}


export function * signOut(){
    try{
        yield auth.signOut()
        yield put(signOutSuccess())
    }catch(error){
        yield put(signOutFailure(error.message))
    }
}

export function * signUp({payload:{email,password,displayName}}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email,password) 
        console.log(displayName)
        yield put(signUpSuccess({user,additionalData:{displayName}}))
    }catch(error){
        yield put(signUpFailure(error.message))
    }
}

export function * signInAfterSignUp({payload:{user,additionalData}}){
    yield getSnapshotFromUserAuth(user,additionalData)
}



export function * isUserAuthenticated(){
    try{
        const user = yield getCurrentUser()
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(signInFailure(error))
    }
}



export function * signInWithEmail({payload:{email,password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email,password)
        yield getSnapshotFromUserAuth(user)         
    }catch(error){
        yield(put(signInFailure(error)))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
  
export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}
  
export function * onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
} 

export function * onSignOut(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

export function *onSignUp(){
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}

export function * onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp)
}

export function * userSaga(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOut),
        call(onSignUp),
        call(onSignUpSuccess)
    ])
}