import { toast } from '@/hooks/toast-hook';
import { surveyService } from '@/services/survey-service';
import { useMutation } from '@tanstack/react-query';

export const useCreateSurvey = () => {
  return useMutation({
    mutationFn: (message: string) => surveyService.createSurvey(message),
    onSuccess: () => {
      toast({
        title: 'Send survey successfully',
        description: `Your survey has been sent. Thank you for your feedback!`,
      });
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot submit your survey',
        description: error.message,
      });
    },
  });
};
