import { ApiService } from '@/services/api-service';
import { Assignment, Workspace, WorkspaceSelectorQuery } from '@/types/workspace-type';

class WorkspaceService extends ApiService {
  public async listWorkspace(selector?: WorkspaceSelectorQuery[]): Promise<Workspace[]> {
    let url = '/workspaces/';
    if (selector) url += '?fields=' + selector.join(',');
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Workspace[];
      })
      .catch(this.throwError);
  }

  public async listAssignment(workspaceId: number): Promise<Assignment[]> {
    const url = '/workspaces/:id/assignments'.replace(':id', workspaceId.toString());
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Assignment[];
      })
      .catch(this.throwError);
  }

  public async getWorkspace(id: number, selector?: WorkspaceSelectorQuery[]): Promise<Workspace> {
    let url = '/workspaces/:id'.replace(':id', id.toString());
    if (selector) url += '?fields=' + selector.join(',');
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Workspace;
      })
      .catch(this.throwError);
  }
}

export const workspaceService = new WorkspaceService();
