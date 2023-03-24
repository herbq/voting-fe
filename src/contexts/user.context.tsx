import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { authToken, getUserLocalData } from "../controllers/user.controller";
import { IKeys, IUser, IUserResponse } from "../interfaces";
import { Users } from "../interfaces/user.interface";
import { decryptData } from "../services/subtle/rsa.service";

export const UserContext = React.createContext<IUserResponse.Context>({ user: null, setUser: null });

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser.User | null>(null);

    useEffect(() => {
        const { token, keys } = getUserLocalData();
        if (token == null || keys == null) return;

        authToken(token).then((res) => {
            console.log(`nice signal`)
            setUser({ ...res.data, token, keys, immediate: true });
        }).catch((err) => {
            console.error(`Your previous session has been expired!`);
        })
    }, [])

    useEffect(() => {
        if (!user || !user?.token || !user?.keys || !user?.keys?.publicKey || !user?.keys?.privateKey) {
            localStorage.clear();
            return;
        }
        const { token: encryptedToken, keys, immediate } = user;

        if (immediate) {
            localStorage.setItem(`token`, encryptedToken);
            localStorage.setItem(`keys`, JSON.stringify(keys));
            return;
        }
        decryptData(encryptedToken, keys.privateKey).then((res) => {
            console.log(`decrypted res: `, res)
            localStorage.setItem(`token`, res);
            if (keys) localStorage.setItem(`keys`, JSON.stringify(keys));
        }).catch((err: any) => {
            console.log(`An error occured while decrypting the key: `, err);
            setUser(null)
        })
    }, [user])

    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}

export default UserProvider;