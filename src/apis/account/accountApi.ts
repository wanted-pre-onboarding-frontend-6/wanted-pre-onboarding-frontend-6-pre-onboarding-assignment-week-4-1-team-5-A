import Http from 'apis/coreApi';
import TokenService from 'services/TokenService';

interface ParamsType {
  params?: string | object;
  data?: any;
  userId?: number | undefined;
}

class AccountApi {
  http: any;
  path: string;

  constructor(token: string | null | undefined) {
    this.http = new Http(process.env.REACT_APP_API_URL, token ? token : undefined);
    this.path = '/accounts';
  }

  public getList({ params }: ParamsType) {
    return this.http.get(this.path, params);
  }

  public getListALL() {
    return this.http.get(this.path);
  }

  public getInfo({ params }: ParamsType) {
    return this.http.get(this.path, params);
  }

  public getCount(userId: number) {
    return this.http.get(`/accounts/?user_id=${userId}`);
  }
}
export default new AccountApi(TokenService.getToken(process.env.REACT_APP_TOKEN_KEY as string));
