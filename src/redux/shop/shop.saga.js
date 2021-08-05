import {takeEvery,takeLatest,call, put} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';

export function* fetchCollectionsAsync(){
        const collectionRef = firestore.collection('collections');
        console.log('hellos')
        try{
            const snapShot = yield collectionRef.get()
            console.log(snapShot)
            const collectionMap = yield call(convertCollectionsSnapshotToMap,snapShot)

            yield put(fetchCollectionsSuccess(collectionMap))
        }catch(error){
            yield put(fetchCollectionsFailure(error.message))
        }
} 

export function* onfetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, fetchCollectionsAsync);
}




