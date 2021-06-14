import { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { LoadImagesAction, RotatedImage, SetImagesAction } from './store';
import Frame from './Frame';
import Controls from './Controls';
import Search from './Search';

type Props = {
  borderColour: 'blue' | 'red',
};



function App(props: Props) {
  return (
    <div className="App">
      <header>
        <Frame />
      </header>
      <nav style={ { marginTop: '200px' } }>
        <Controls />
        <Search />
      </nav>
    </div>
  );
}

// const actionCreators: Pick<Props, 'loadImages'> = {
//     loadImages: (term: string) => ({ 'type': 'loadImages', payload: term }) as LoadImagesAction
// }

export default connect(undefined)(App);
