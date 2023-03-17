import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Users } from "../interfaces/user.interface";

interface IContext {
    user: Users.IUser | null,
    setUser: Dispatch<SetStateAction<Users.IUser | null>>,
}


export const UserContext = React.createContext<IContext>({ user: null, setUser: () => { } });

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Users.IUser | null>(null);

    useEffect(() => {
        console.log(`user updated`);
        localStorage.setItem(`token`, user?.token as any);
    }, [user])

    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}

export default UserProvider;