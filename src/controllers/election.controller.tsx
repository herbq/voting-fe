import axios, { AxiosError, AxiosResponse } from 'axios';
import { NotificationContext } from '../components/base/notification/notification-container/notification-container.component';
import { UserContext } from '../contexts/user.context';
import { IDatabase, IElection, IKeys, IUser } from '../interfaces';

export const createNewElection = async (title: string, candidates: IElection.Candidate[], dates: IElection.Date, keys: IKeys.Keys): Promise<AxiosResponse> => {
  const response = await axios.post<AxiosResponse>(`http://localhost:8000/election/new`,
    { title, candidates, dates, keys }
  );
  return response;
};

export const getElections = async (): Promise<IElection.ElectionsResponse> => {
  const response = (await axios.get(`http://localhost:8000/election`)) as IElection.ElectionsResponse;
  console.log(`response`, response)
  return response as IElection.ElectionsResponse;
}

export const getElection = async (id: string): Promise<IElection.ElectionResponse> => {
  const response = (await axios.get(`http://localhost:8000/election/${id}`)) as IElection.ElectionResponse;
  return response as IElection.ElectionResponse;
}

export const deleteElection = async (id: string) => {
  const response = await axios.delete<AxiosResponse>(`http://localhost:8000/election/${id}`);
  return response;
}