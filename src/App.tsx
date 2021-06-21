import { connect } from 'react-redux';
import './App.css';
import { LoadImagesAction } from './store';
import Frame from './Frame';
import Controls from './Controls';
import Frame2 from './Frame2';
import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import { appHistory } from './history';
import { Summary } from './Summary';
import { Grid, Tab, Tabs } from '@material-ui/core';
import { Nav } from './Nav';
import { ImageSize } from './state';

type Props = {
  borderColour: 'blue' | 'red',
  loadImages: () => LoadImagesAction
};

export type RouteParam = { term: string, size: ImageSize };

function App(props: Props) {
  return (
      <Router>
        <Nav />
        <Switch>
          <Route path="/photos/:term/:size">
            <Frame />
            <Controls />
            <Summary />
          </Route>
          <Route path="*">
            <Search />
          </Route>
        </Switch>
      </Router>
  );
}

export default connect(undefined, {
  loadImages: () => ({ type: 'loadImages' as const, payload: { term: 'tiger', size: 'preview' } } as LoadImagesAction)
})(App);
