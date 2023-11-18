import { ApiService } from '@/services/api-service';
import { Assignment, Submission, Workspace, WorkspaceFilter } from '@/types/workspace-type';

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

  public async listWorkspace(selector?: WorkspaceFilter[]): Promise<Workspace[]> {
    let url = '/workspaces';
    if (selector) url += '?fields=' + selector.join(',');
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Workspace[];
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

  public async getWorkspace(id: number, selector?: WorkspaceFilter[]): Promise<Workspace> {
    let url = '/workspaces/:workspaceId'.replace(':workspaceId', id.toString());
    if (selector) url += '?fields=' + selector.join(',');
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
