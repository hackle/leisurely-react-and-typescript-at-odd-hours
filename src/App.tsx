import { connect } from 'react-redux';
import './App.css';
import { LoadImagesAction, LoadUserAction } from './store';
import Frame from './Frame';
import Controls from './Controls';
import Frame2 from './Frame2';
import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Route, BrowserRouter as Router, Switch, Link, HashRouter } from 'react-router-dom';
import { appHistory } from './history';
import { Summary } from './Summary';
import { Grid, Tab, Tabs } from '@material-ui/core';
import Nav from './Nav';
import { AppState, ImageSize } from './state';
import { LogIn, LogInCallback } from './auth/LogIn';
import { LogOut } from './auth/LogOut';
import { AppUser, getCurrentUser } from './auth/auth';

type Props = {
  borderColour: 'blue' | 'red',
  loadImages: () => LoadImagesAction
  loadUser: () => LoadUserAction,
  user?: AppUser
};

export type RouteParam = { term: string, size: ImageSize };

function App({ user, loadUser }: Props) {
  useEffect(() => { loadUser(); }, []);
  
  return (
      <HashRouter>
        <Nav />
        <Switch>
          <Route path="/login/callback">
            <LogInCallback />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/logout/callback">
            You have logged out
          </Route>
          <Route path="/logout">
            <LogOut />
          </Route>
          <Route path="/photos/:term/:size"
            render={props => 
              (user?.permissions ?? []).includes('photo:view')
              ? (<>
                  <Frame />
                  <Controls />
                  <Summary />
                </>)
              : <div>You don't have permission to view photos</div>
            }>
          </Route>
          <Route path="/search"
            render={props => 
              (user?.permissions ?? []).includes('photo:search')
              ? <Search />
              : <div>You don't have permission to search photos</div>
            }>
          </Route>
          <Route path="*">
            Nothing to see here.
          </Route>
        </Switch>
      </HashRouter>
  );
}

export default connect((state: AppState) => ({
  user: state.user
}), {
  loadUser: () => ({ type: 'loadUser' as const }) as LoadUserAction,
  loadImages: () => ({ type: 'loadImages' as const, payload: { term: 'tiger', size: 'preview' } } as LoadImagesAction)
})(App);