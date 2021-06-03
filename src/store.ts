import { AnyAction, applyMiddleware, createStore } from 'redux';
import { AppState, initialAppState } from './StateProvider';
import createSagaMiddleware from 'redux-saga';
import {call, put, takeLatest} from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    initialAppState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagaRoot);

function rootReducer(state: AppState = initialAppState, action: AnyAction): AppState {
    switch (action.type) {
        case 'setAppState':
            return action.payload
    }
    
    return state;
}

function* sagaRoot() {
    yield takeLatest('loadImages', loadImage);
}

function* loadImage() {
    // @ts-ignore
    const images = yield call(fetchViaHttp, `https://pixabay.com/api/?key=18049587-99bf6238de19f175bd7defcf8&q=yellow+flowers&image_type=photo&pretty=true`);
    yield put({ type: 'setAppState', payload: { images, index: 0 } });
}

async function fetchViaHttp(url: string) {
    const response = await fetch(url);
    const pixa = await response.json();
    return pixa.hits.map((img: any) => ({ url: img.webformatURL, rotation: 0 }));
}