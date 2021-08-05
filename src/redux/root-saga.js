import { all,call } from "redux-saga/effects";
import { cartSaga } from "./cart/cart.saga";
import { onfetchCollectionsStart } from "./shop/shop.saga";
import { userSaga } from "./user/user.saga";

export default function* rootSaga(){
    yield all([call(onfetchCollectionsStart),call(userSaga),call(cartSaga)])
}
