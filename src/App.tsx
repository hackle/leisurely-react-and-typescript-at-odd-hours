import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import './App.css';
import { storeContext, Image } from './StateProvider';

type Props = {
  borderColour: 'blue' | 'red'
};

function App(props: Props) {
  const store = useContext(storeContext);
  const { state: appState, setState: setAppState } = store;

  const currentIndex = inBound(appState.index, appState.images.length);
  const currentImage = appState.images[currentIndex];

  const rotateImage = useCallback(() => {
    setAppState(prevState => ({ 
      ...prevState, 
      images: prevState.images.map((img, idx) => idx === currentIndex ? { ...img, rotation: img.rotation + 30 } : img) 
    }));
  }, []);

  const next = useCallback(
    () => setAppState({ ...appState, index: appState.index + 1 }),
    []
  );
  
  const prev = useCallback(
    () => setAppState({ ...appState, index: appState.index - 1 }),
    []
  );


  return (
    <div className="App">
      <header>
        <Frame image={currentImage} />
      </header>
      <nav style={ { marginTop: '200px' } }>
        <Controls prev={prev} next={next} rotateImage={rotateImage} />
      </nav>
    </div>
  );
}

type ControlsProps = {
  prev: () => void,
  rotateImage: () => void,
  next: () => void,
}

const Controls = memo((props: ControlsProps) => {
  const { prev, next, rotateImage } = props;
  return (
    <>
      <button onClick={ ()=>prev() }>Previous</button>
      <button onClick={ ()=>rotateImage() }>Rotate</button>
      <button onClick={ ()=>next() }>Next</button>
    </>
  );
});

type FrameProps = { image: Image };
function Frame(props: FrameProps) {
  return (
    <img src={ props.image.url } 
    style={ { 
      transform: `rotate(${props.image.rotation}deg)`, 
      borderWidth: '2px', 
      borderStyle: "solid"
    } } 
    alt="logo" />
  );
}

function inBound(idx: number, length: number): number {
  return ((idx % length) + length) % length;
}

export default App;
