import { useEffect } from "react";
import { makeAuthClient } from "./auth";

export const LogOut = () => {
    useEffect(() => { 
        (async () => {
            const authClient = await makeAuthClient();
            authClient.logout();
        })();
    }, []);

    return <div>Logging out</div>;
};