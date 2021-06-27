import { call, put, takeLatest } from 'redux-saga/effects';
import { LoadImagesAction, LoadUserAction, SetAppUserAction, SetImagesAction } from './store';
import { RotatedImage } from './state';
import { ApiConfig } from './apiConfig';
import { AppUser, getCurrentUser } from './auth/auth';

export function makeImagesSaga(apiConfig: ApiConfig) {
    function* loadImages(
        action: LoadImagesAction
    ): Generator<{}> {
        const images = (yield call(loadFromPixa, action.payload)) as RotatedImage[];

        yield put<SetImagesAction>({ type: 'setImages', payload: images });
    }

    function* loadUser(): Generator<{}> {
        const user = (yield call(getCurrentUser)) as AppUser | undefined;
        if (user != null) {
            yield put<SetAppUserAction>({ type: 'setAppUser', payload: user });
        }
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
        yield takeLatest<LoadUserAction>('loadUser', loadUser);
    };

    return rootSaga;
}