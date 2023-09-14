import { ApiService } from '@/services/api-service';
import { User } from '@/types/auth-type';

class AuthService extends ApiService {
  public async me(): Promise<User> {
    return this.get('/auth/me')
      .then((response) => {
        return response.data.data as unknown as User;
      })
      .catch(this.throwError);
  }

  public async signIn(email: string, password: string): Promise<User> {
    return this.post('/auth/signin', { email, password })
      .then(() => {
        return {} as User;
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