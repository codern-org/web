import { ApiService } from '@/services/ApiService';
import { User } from '@/types/AuthTypes';

class AuthService extends ApiService {
  public async me(): Promise<User> {
    return this.get('/auth/me')
      .then((response) => {
        return response.data.data as unknown as User;
      })
      .catch(this.throwError);
  }

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

  public async signOut(): Promise<void> {
    return this.get('/auth/signout')
      .then(() => {})
      .catch(this.throwError);
  }
}

export const authService = new AuthService();
