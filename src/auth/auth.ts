import createAuth0Client, { User } from "@auth0/auth0-spa-js";
import {decode} from 'jsonwebtoken';

export const makeAuthClient = () => createAuth0Client({
    domain: 'hacks.au.auth0.com',
    client_id: process.env.REACT_APP_AUTH_CLIENT_ID!,
    redirect_uri: process.env.REACT_APP_AUTH_REDIRECT_URI,
    audience: process.env.REACT_APP_AUTH_AUDIENCE
});

export async function getCurrentUser(): Promise<AppUser | undefined> {
    const authClient = await makeAuthClient();
    const user = await authClient.getUser();
    if (user == null) return undefined;

    const authToken = await authClient.getTokenSilently();
    return {
        name: user.name ?? 'Unnamed',
        picture: user.picture,
        permissions: decodeToken(authToken),
        authToken,
    }
}
export type Permission = 'photo:search' | 'photo:view' | 'photo:rotate';
export type AppUser = {
    name: string,
    picture?: string,
    permissions: Permission[],
    authToken: string,
}

function decodeToken(raw?: string): Permission[] {
    const payload = decode(raw ?? '');
    if (payload == null || typeof payload === 'string') {
        return [];
    }

    return (payload ?? {}).permissions;
}