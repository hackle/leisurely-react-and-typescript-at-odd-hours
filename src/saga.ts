import { call, put, takeLatest } from 'redux-saga/effects';
import { LoadImagesAction, SetImagesAction } from './store';
import { RotatedImage } from './state';
import { ApiConfig } from './apiConfig';

export function makeImagesSaga(apiConfig: ApiConfig) {
    function* loadImages(
        action: LoadImagesAction
    ): Generator<{}> {
        const images = (yield call(loadFromPixa, action.payload)) as RotatedImage[];

        yield put<SetImagesAction>({ type: 'setImages', payload: images });
    }

    async function loadFromPixa({ term, size }: LoadImagesAction['payload']): Promise<RotatedImage[]> {
        const response = await apiConfig.loadImages(term);
        const images: RotatedImage[] = response.hits.map(h => ({ 
            url: size === 'web' ? h.webformatURL :
                    size === 'large' ? h.largeImageURL : h.previewURL, 
            rotation: 0 
        }));

        return images;
    }

    function* rootSaga() {
        yield takeLatest<LoadImagesAction>('loadImages', loadImages);
    };

    return rootSaga;
}