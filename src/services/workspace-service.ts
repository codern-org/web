import { ApiService } from '@/services/api-service';
import { Assignment, Workspace, WorkspaceSelectorQuery } from '@/types/workspace-type';

class WorkspaceService extends ApiService {
  public async listWorkspace(selector?: WorkspaceSelectorQuery[]): Promise<Workspace[]> {
    let url = '/workspaces';
    if (selector) url += '?fields=' + selector.join(',');
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Workspace[];
      })
      .catch(this.throwError);
  }

  public async listRecentWorkspace(): Promise<Workspace[]> {
    return this.get('/workspaces?order=recent')
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

  public async getWorkspace(id: number, selector?: WorkspaceSelectorQuery[]): Promise<Workspace> {
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
}

export const workspaceService = new WorkspaceService();
