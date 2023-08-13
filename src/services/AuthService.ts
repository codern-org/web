import { ApiService } from '@/services/ApiService';

class AuthService extends ApiService {
  public async getGoogleAuthUrl(): Promise<string> {
    return this.get('/auth/google')
      .then((response) => {
        if ('url' in response.data.data && response.data.data.url) {
          return response.data.data.url as string;
        }
        this.throwError('Cannot get the Google auth url');
      })
      .catch(this.throwError);
  }
}

export const authService = new AuthService();
