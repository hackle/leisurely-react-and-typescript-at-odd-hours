import { User } from "@auth0/auth0-spa-js";
import { Tabs, Tab } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { AppUser } from "./auth/auth";
import { AppState } from "./state";

const Nav = ({ user }: { user?: AppUser }) => {
    const location = useLocation();
    const appHistory = useHistory();

    const permissions = user?.permissions ?? [];

    return (
        <Tabs value={location.pathname.split('/')[1] ?? 'search'}>
            {
                permissions.includes('photo:search')
                ? <Tab label="Search" value={'search'} onClick={() => appHistory.push('/search')} />
                : null
            }
            {
                permissions.includes('photo:view')
                ? <Tab label="Photos" value={'photos'} disabled />
                : null
            }
            {
                user != null 
                ? <Tab 
                    label={ 
                        <div className="user-profile">
                            <img src={user.picture} className="user-picture" alt={user.name} />
                            <a href="#" onClick={() => appHistory.push('/logout')}>Log out</a>
                        </div>
                    }/>
                : <Tab label="Log in" value={'login'} onClick={() => appHistory.push('/login')}></Tab>
            }
        </Tabs>
    );
}

export default connect((state: AppState) => ({ user: state.user }))(Nav);