import { ApiService } from '@/services/api-service';
import { Assignment, Submission, Workspace, WorkspaceParticipant } from '@/types/workspace-type';

class WorkspaceService extends ApiService {
  public async createSubmission(
    workspaceId: number,
    assignmentId: number,
    code: string,
    language: string,
  ): Promise<void> {
    const url = '/workspaces/:workspaceId/assignments/:assignmentId/submissions'
      .replace(':workspaceId', workspaceId.toString())
      .replace(':assignmentId', assignmentId.toString());

    const formData = new FormData();
    formData.append('sourcecode', new Blob([code]));
    formData.append('language', language.toUpperCase());

    return this.post(url, formData)
      .then(() => {})
      .catch(this.throwError);
  }

  public async listWorkspace(): Promise<Workspace[]> {
    return this.get('/workspaces')
      .then((response) => {
        return response.data.data as unknown as Workspace[];
      })
      .catch(this.throwError);
  }

  public async listWorkspaceParticipant(workspaceId: number): Promise<WorkspaceParticipant[]> {
    const url = '/workspaces/:workspaceId/participants'.replace(
      ':workspaceId',
      workspaceId.toString(),
    );
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as WorkspaceParticipant[];
      })
      .catch(this.throwError);
  }

  public async listAssignment(workspaceId: number): Promise<Assignment[]> {
    const url = '/workspaces/:workspaceId/assignments'.replace(
      ':workspaceId',
      workspaceId.toString(),
    );
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Assignment[];
      })
      .catch(this.throwError);
  }

  public async listSubmission(workspaceId: number, assignmentId: number): Promise<Submission[]> {
    const url = '/workspaces/:workspaceId/assignments/:assignmentId/submissions'
      .replace(':workspaceId', workspaceId.toString())
      .replace(':assignmentId', assignmentId.toString());
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Submission[];
      })
      .catch(this.throwError);
  }

  public async getWorkspace(id: number): Promise<Workspace> {
    const url = '/workspaces/:workspaceId'.replace(':workspaceId', id.toString());
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Workspace;
      })
      .catch(this.throwError);
  }

  public async getAssignment(workspaceId: number, assignmentId: number): Promise<Assignment> {
    const url = '/workspaces/:workspaceId/assignments/:assignmentId'
      .replace(':workspaceId', workspaceId.toString())
      .replace(':assignmentId', assignmentId.toString());
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Assignment;
      })
      .catch(this.throwError);
  }

  public async getAssignmentDetail(url: string): Promise<string> {
    if (url.startsWith('/')) url = window.APP_CONFIG.BACKEND_URL + '/file' + url;
    return this.get(url)
      .then((response) => response.data as unknown as string)
      .catch(this.throwError);
  }
}

export const workspaceService = new WorkspaceService();
