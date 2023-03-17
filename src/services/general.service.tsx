import { request } from 'http';
import { v4 as uuidv4 } from 'uuid';

const setElementOpacity = (identifier: string, opacity: number) => {
    const element = document.querySelector(identifier) as HTMLElement;
    element.style.opacity = `${opacity}`;
}

export const RequestType = {
    GET: `GET`,
    POST: `POST`,
    PUT: `PUT`,
    DELETE: `DELETE`
}

export async function sendRequest(path: string = "", requestType: string = RequestType.GET, data: object = {}) {
    const body = requestType != 'GET' ? JSON.stringify(data) : null
    const response = await fetch(`http://127.0.0.1:8000/${path}`, {
        method: requestType,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body
    });
    if (requestType == RequestType.GET) return response.json();
    if (requestType == RequestType.PUT || requestType == RequestType.POST) return response;
}


const generateRandomNumber = (n: number) => ((Math.ceil(Math.random() * 10)) % n);

const generateRandomUUID = () => uuidv4();

export { setElementOpacity, generateRandomUUID, generateRandomNumber }