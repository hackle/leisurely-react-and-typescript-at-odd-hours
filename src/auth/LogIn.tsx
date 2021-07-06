import { AuthenticationError } from "@auth0/auth0-spa-js";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { AppState } from "../state";
import { LoadUserAction } from "../store";
import { AppUser, makeAuthClient } from "./auth";

export const LogIn = () => {
    useEffect(() => {
        (async () => {
            const authClient = await makeAuthClient();
            await authClient.loginWithRedirect();
        })();
    }, []);

    return <p>Redirecting to log in</p>;
};

type Props = { user?: AppUser, loadUser: () => LoadUserAction };
const LogInCallbackInner = ({ loadUser, user }: Props) => {
    const history = useHistory();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (user != null) {
            window.location.href = '/#/search';
            return;
        }
    }, [user]);

    useEffect(() => {        
        (async () => {
            const authClient = await makeAuthClient();
            authClient.handleRedirectCallback()
                .then(() => {
                    loadUser();
                })
                .catch((err: AuthenticationError) => setError(err));
        })();
    }, []);

    return error 
        ? <p>Log in failed. Error: {error.message}</p> 
        : <p>
            You have logged in. 
            Click <Link to="/search">here</Link> to search for photos
        </p>
};

export const LogInCallback = connect((state: AppState) => ({
    user: state.user
}), {
    loadUser: () => ({ type: 'loadUser' }) as LoadUserAction
})(LogInCallbackInner);