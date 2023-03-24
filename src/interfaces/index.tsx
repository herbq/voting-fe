import { AxiosResponse } from "axios";
import { EVENT_STATUS } from "../services/general";

export namespace ICurrentActiveElement {

  export type CurrentActiveElement = HTMLElement | null;

  export interface CurrentActiveElementState {
    value: HTMLElement | null,
    set: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  }

  export interface Context {
    currentActiveElement: CurrentActiveElementState | null,
  }
}

export namespace IKeys {
  export type PublicKey = string;
  export type PrivateKey = string;
  export type IV = string;

  export interface Keys {
    publicKey: PublicKey,
    privateKey: PrivateKey,
    iv?: IV
  }
}

export namespace IUserResponse {
  export type Token = string;
  export type Keys = IKeys.Keys;

  export interface Response {
    token: Token,
    keys: Keys,
    immediate?: boolean
  }

  export interface Context {
    user: Response | null,
    setUser: React.Dispatch<React.SetStateAction<Response | null>> | any,
  }
}

export namespace IUser {
  export interface User extends IUserResponse.Response {
    email?: string,
    name?: {
      firstName: string,
      lastName: string
    },
    phoneNumber?: string,
  }
}

export namespace IElection {
  export interface Election {
    title: string;
    candidates: IElection.Candidate[];
    dates: IElection.Date;
    interests: Interest[],
    color: string,
    keys: IKeys.Keys;
    votes: IElection.Vote[];
    eventStatus?: EVENT_STATUS,
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Candidate {
    id: string,
    name: string,
    description: string,
    image: string
  }

  export interface Vote {
    id: string,
    votes: string[],
    signature: string,
  }
  
  export interface Interest {
    id: string,
  }

  export interface Date {
    start: number,
    finish: number
  }

  export interface ElectionsResponse extends AxiosResponse {
    data: Election[]
  }

  export interface ElectionResponse extends AxiosResponse {
    data: {
      title: string,
    }
  }
}

export namespace IDatabase {
  export interface User {
    identification: string;
    email?: string;
    password: string;
    name: {
      firstName: string;
      lastName: string;
    };
    profileImage?: string;
    phoneNumber?: string;
    keys: IKeys.Keys;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Election {
    title: string;
    candidates: IElection.Candidate[];
    dates: IElection.Date;
    interests: number,
    color: string,
    keys: IKeys.Keys;
    votes: IElection.Vote;
    createdAt: Date;
    updatedAt: Date;
  }
}