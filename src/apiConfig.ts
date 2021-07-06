import { AppUser, getCurrentUser } from "./auth/auth";
import { ImageSize } from "./state";

export type PixaResponse = { 
    hits: {
        webformatURL: string,
        previewURL: string,
        largeImageURL: string,
    }[] 
};

const apiKey = '18049587-99bf6238de19f175bd7defcf8';
const makeUrl = (term: string) => `http://localhost:8080/photos/${encodeURIComponent(term)}`;

export type ApiConfig = {
    loadImages: (term: string) => Promise<PixaResponse>;
    loadUser: () => Promise<AppUser | undefined>;
};

async function loadImages(term: string): Promise<PixaResponse> {
    const user = await getCurrentUser();
    const response = await fetch(makeUrl(term), { headers: { Authorization: `Bearer ${user?.authToken!}` } });
    const json: PixaResponse = await response.json();

    return json;
}

export const apiConfig: ApiConfig = {
    loadImages,
    loadUser: getCurrentUser
};