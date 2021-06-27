import createAuth0Client, { User } from "@auth0/auth0-spa-js";
import {decode} from 'jsonwebtoken';

export const makeAuthClient = () => createAuth0Client({
    domain: 'hacks.au.auth0.com',
    client_id: 'owW42bVgGNZE65tspVC79lfMtmgKt4Iv',
    redirect_uri: 'https://reactoddhours.com:3000/login/callback',
    audience: 'https://api.reactoddhours.com:3001/'
});

export async function getCurrentUser(): Promise<AppUser | undefined> {
    const authClient = await makeAuthClient();
    const user = await authClient.getUser();
    if (user == null) return undefined;

    return {
        name: user.name ?? 'Unnamed',
        picture: user.picture,
        permissions: decodeToken(await authClient.getTokenSilently())
    }
}
export type Permission = 'photo:search' | 'photo:view' | 'photo:rotate';
export type AppUser = {
    name: string,
    picture?: string,
    permissions: Permission[]
}

function decodeToken(raw?: string): Permission[] {
    const payload = decode(raw ?? '');
    if (payload == null || typeof payload === 'string') {
        return [];
    }

    return (payload ?? {}).permissions;
}