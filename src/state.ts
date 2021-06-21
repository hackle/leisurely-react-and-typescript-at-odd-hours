export type ImageSize = 'preview' | 'web' | 'large';
export type RotatedImage = { url: string; rotation: number };
export type AppState = { images: RotatedImage[], index: number };

const images: RotatedImage[] = [
    'https://pixabay.com/get/ga318fb8d1c3715c18097c4ad946803440a20b71426f074669ad38ae61a09c3ee1208741c4e9f3737faaa0e518ffd5c2b193167fefdf50d090cf1fad1a4ad4d3c_640.jpg',
    'https://pixabay.com/get/ge1fa64bb0436c6ea7e582e146c576d4326b604bf9f097c983801d168bccc221f3783292264980044dbf31a10c7cfd3227958468ccd8ccf9d149e75e8ee1319ca_640.jpg',
    'https://pixabay.com/get/g5f4291bfdb57cfad4e5d31219c9e866f216bb8d154036bef29bd09ee65081380b00b958364f9338f9ba28f75b5fa4008_640.jpg'
  ].map(img => ({ url: img, rotation: 0 }));
  
export const initialAppState = {
    images,
    index: 0
};
  