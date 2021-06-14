import { LoadImagesAction, RotatedImage, RotateImageAction, SetImagesAction } from "./store";
import { call, put, takeLatest } from 'redux-saga/effects';

export function* rootSaga() {
    yield takeLatest<LoadImagesAction>('loadImages', loadImages);
}

export function* loadImages(action: LoadImagesAction): Generator<any> {
    const images = (yield call(loadImagesFromPixa, action.payload)) as RotatedImage[];

    const setImagesAction: SetImagesAction = { type: 'setImages', payload: images };
    
    yield put(setImagesAction);
}

async function loadImagesFromPixa(term: string): Promise<RotatedImage[]> {
    const response  = await fetch(`https://pixabay.com/api/?key=21822877-4625fbad8b8037ce8338143fd&q=${encodeURIComponent(term)}&image_type=photo&pretty=true`);
    const responseBody: PixaBayResponse = await response.json(); 
    const images = responseBody.hits.map(h => ({ url: h.webformatURL, rotation: 0 }) as RotatedImage);
    return images;
}


type PixaBayResponse =
    {
        "total": number,
        "totalHits": number,
        "hits": [
            {
                "id": number,
                "pageURL": string,
                "type": string,
                "tags": string,
                "previewURL": string,
                "previewWidth": number,
                "previewHeight": number,
                "webformatURL": string,
                "webformatWidth": number,
                "webformatHeight": number,
                "largeImageURL": string,
                "fullHDURL": string,
                "imageURL": string,
                "imageWidth": number,
                "imageHeight": number,
                "imageSize": number,
                "views": number,
                "downloads": number,
                "favorites": number,
                "likes": number,
                "comments": number,
                "user_id": number,
                "user": string,
                "userImageURL": string,
            }
        ]
    }