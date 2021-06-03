import { Children, createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export type Image = { url: string; rotation: number };
export type AppState = { images: Image[], index: number };

type StateContext = {
    state: AppState,
    setState: Dispatch<SetStateAction<AppState>>
}

export const storeContext = createContext<StateContext>({
    state: { 'images': [], index: 0 },
    setState: _ => {}
});

const images: Image[] = ['Loading...'].map(img => ({ url: img, rotation: 0 }));

export const initialAppState = {
  images,
  index: 0
};

export function StateProvider(props: { children: ReactNode }) {
    const {Provider} = storeContext;  
    
    const [appState, setAppState] = useState<AppState>(initialAppState);

    return <Provider value={
        {
            state: appState,
            setState: setAppState
        }
    }>{props.children}</Provider>
}