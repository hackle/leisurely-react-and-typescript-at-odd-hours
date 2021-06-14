import { AnyAction, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

export type RotatedImage = { url: string; rotation: number };
export type AppState = { images: RotatedImage[], index: number };
const images: RotatedImage[] = [].map(img => ({ url: img, rotation: 0 }));

export const initialAppState = {
  images,
  index: 0
};


const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    reducer,
    initialAppState,
    composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

// (State, Action) -> State
function reducer(
    state: AppState = initialAppState, 
    action: RotateImageAction | SetImagesAction
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
                index: 0,
                images: action.payload
            };

        default:
            return state;
    }
}

export function selectCurrentImage(state: AppState): RotatedImage {
    return state.images[state.index] ?? {
        url: 'loading',
        rotation: 90
    };
}

export type RotateImageAction = {
    type: 'rotateImage',
    payload: number,
};

export type SetImagesAction = {
    type: 'setImages',
    payload: RotatedImage[],
};

export type LoadImagesAction = {
    type: 'loadImages',
    payload: string,
};

function inBound(idx: number, length: number): number {
    return ((idx % length) + length) % length;
  }

