import { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import './App.css';
import { Image, AppState } from './StateProvider';

type Props = {
  borderColour: 'blue' | 'red',
  appState: AppState,
  loadImages: () => AnyAction,
  setAppState: (state: AppState) => AnyAction,
};

function App({ appState, loadImages, setAppState }: Props) {
  useEffect(() => { loadImages(); }, []);

  const currentIndex = inBound(appState.index, appState.images.length);
  const currentImage = appState.images[currentIndex];

  const rotateImage = () => {
    setAppState({
      ...appState, 
      images: appState.images.map((img, idx) => idx === currentIndex ? { ...img, rotation: img.rotation + 30 } : img) 
    });
  };

  const next = () => setAppState({ ...appState, index: appState.index + 1 });
  const prev = () => setAppState({ ...appState, index: appState.index - 1 });


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

function Controls(props: ControlsProps) {
  const { prev, next, rotateImage } = props;
  return (
    <>
      <button onClick={ ()=>prev() }>Previous</button>
      <button onClick={ ()=>rotateImage() }>Rotate</button>
      <button onClick={ ()=>next() }>Next</button>
    </>
  );
}

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

export default connect(
  (st: AppState) => ({ appState: st }),
  dispatch => ({
    loadImages: () => dispatch({ type: 'loadImages' }),
    setAppState: (state: AppState) => dispatch({ type: 'setAppState', payload: state })
  })
)(App);
