import axios, { AxiosError, AxiosResponse } from 'axios';
import { NotificationContext } from '../components/base/notification/notification-container/notification-container.component';
import { UserContext } from '../contexts/user.context';
import { IKeys, IUser } from '../interfaces';

export const createNewUser = async (identification: string, password: string, keys: IKeys.Keys): Promise<AxiosResponse> => {
  const response = await axios.post<AxiosResponse>('http://localhost:8000/user/new',
    { identification, password, keys }
  );
  return response;
};

export const authUser = async (identification: string, password: string): Promise<AxiosResponse> => {
  const response = await axios.post<AxiosResponse>(`http://localhost:8000/user/auth`,
    { identification, password }
  );
  return response;
}

export const authToken = async (token: string): Promise<AxiosResponse> => {
  const response = await axios.post<AxiosResponse>(`http://localhost:8000/user/auth`,
    { token }
  );
  return response;
}

export const deleteUser = async (id: string) => {
  const response = await axios.delete<AxiosResponse>(`http://localhost:8000/user/${id}`);
  return response;
}

export const getUserLocalData = (): IUser.User => {
  const token = localStorage.getItem(`token`) as string;
  const keys = localStorage.getItem(`keys`) ? JSON.parse(localStorage.getItem(`keys`) ?? '') : null;
  return { token, keys };
}