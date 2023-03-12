import { httpApi } from '@app/api/http.api';
import { User } from '@app/domain/User';


export const getUser = (address: string): Promise<User> =>
  httpApi.get<User>('/api/users/' + address).then(({ data }) => data);

