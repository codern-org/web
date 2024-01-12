import { ApiService } from '@/services/api-service';

class SurveyService extends ApiService {
  public async createSurvey(message: string): Promise<string> {
    return this.post('/survey', { message })
      .then(() => message)
      .catch(this.throwError);
  }
}

export const surveyService = new SurveyService();
