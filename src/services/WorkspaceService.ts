import { ApiService } from '@/services/ApiService';
import { Workspace, WorkspaceSelectorQuery } from '@/types/WorkspaceTypes';

class WorkspaceService extends ApiService {
  public async listFromUserId(
    userId: string = 'me',
    selector?: WorkspaceSelectorQuery[],
  ): Promise<Workspace[]> {
    let url = '/user/:userId/workspace'.replace(':userId', userId);
    if (selector) url += '?fields=' + selector.join(',');
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Workspace[];
      })
      .catch(this.throwError);
  }

  public async getWorkspace(id: number, selector?: WorkspaceSelectorQuery[]): Promise<Workspace> {
    let url = '/workspace/:id'.replace(':id', id.toString());
    if (selector) url += '?fields=' + selector.join(',');
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Workspace;
      })
      .catch(this.throwError);
  }
}

export const workspaceService = new WorkspaceService();
