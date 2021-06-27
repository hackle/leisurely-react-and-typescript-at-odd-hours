import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { ApiConfig } from "./apiConfig";
import { AppUser } from "./auth/auth";
import { makeImagesSaga } from "./saga";
import { initialAppState, AppState, ImageSize, RotatedImage } from "./state";

export function createStoreWithApiConfig(apiConfig: ApiConfig) {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        reducer,
        initialAppState,
        composeWithDevTools(applyMiddleware(sagaMiddleware)));

    const imageSaga = makeImagesSaga(apiConfig);
    sagaMiddleware.run(imageSaga);

    return store;
}

type AllActions = RotateImageAction 
    | SetImagesAction 
    | NextImageAction 
    | PrevImageAction 
    | SetAppUserAction;

// (State, Action) -> State
function reducer(
    state: AppState = initialAppState, 
    action: AllActions
): AppState {
    switch (action.type) {
        case 'rotateImage': 
            return { 
                ...state, 
                images: state.images.map(
                    (img, idx) => idx === inBound(state.index, state.images.length) 
                        ? { ...img, rotation: img.rotation + action.payload } 
                        : img)
            }
        case 'setImages':
            return {
                ...state,
                index: 0,
                images: action.payload
            };
        case 'nextImage': 
            return {
                ...state,
                index: state.index + 1
            };
        case 'prevImage': 
            return {
                ...state,
                index: state.index - 1
            };
        case 'setAppUser':
            return {
                ...state,
                user: action.payload
            };
        default: return state;
    }
}

export function selectCurrentImage(state: AppState): RotatedImage {
    return state.images[inBound(state.index, state.images.length)] 
        ?? { url: undefined, rotation: 45 };
}

export type RotateImageAction = {
    type: 'rotateImage',
    payload: number,
};

export type NextImageAction = {
    type: 'nextImage'
};

export type PrevImageAction = {
    type: 'prevImage'
};

export type LoadImagesAction = {
    type: 'loadImages',
    payload: { term: string, size: ImageSize },
};

export type SetImagesAction = {
    type: 'setImages',
    payload: RotatedImage[],
};

export type SetAppUserAction = {
    type: 'setAppUser',
    payload: AppUser
}

export type LoadUserAction = {
    type: 'loadUser'
}

function inBound(idx: number, length: number): number {
    return ((idx % length) + length) % length;
  }

