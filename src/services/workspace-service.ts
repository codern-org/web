import { Axios } from '@/libs/axios';
import { resolveFileUrl } from '@/libs/utils';
import { ApiService } from '@/services/api-service';
import { CreateAssignmentSchemaValues } from '@/types/schema/assignment-schema';
import {
  CreateInvitationSchemaValues,
  CreateWorkspaceFormSchemaValues,
  UpdateWorkspaceFormSchemaValues,
} from '@/types/schema/workspace-schema';
import {
  Assignment,
  Invitation,
  Submission,
  Workspace,
  WorkspaceParticipant,
  WorkspaceRank,
} from '@/types/workspace-type';

class WorkspaceService extends ApiService {
  public async createWorkspace(workspace: CreateWorkspaceFormSchemaValues): Promise<Workspace> {
    const url = '/workspaces';

    const formData = new FormData();
    formData.append('name', workspace.name);

    if (workspace.profileUrl) {
      const profileUrl = resolveFileUrl(workspace.profileUrl);
      const profile = await Axios.get(profileUrl, {
        baseURL: '',
        responseType: 'blob',
      }).then((response) => new File([response.data], 'profile'));
      formData.append('profile', profile, 'profile');
    }

    return this.post(url, formData)
      .then((response) => response.data.data as unknown as Workspace)
      .catch(this.throwError);
  }

  public async createAssignment(
    workspaceId: bigint,
    assignment: CreateAssignmentSchemaValues,
  ): Promise<CreateAssignmentSchemaValues> {
    const url = '/workspaces/:workspaceId/assignments'.replace(
      ':workspaceId',
      workspaceId.toString(),
    );

    const formData = new FormData();
    formData.append('name', assignment.name);
    formData.append('description', assignment.description);
    formData.append('memoryLimit', assignment.memoryLimit.toString());
    formData.append('timeLimit', assignment.timeLimit.toString());
    formData.append('level', assignment.level);
    formData.append('detail', new Blob([assignment.detail]), 'detail.md');

    if (assignment.dueDate) {
      formData.append('dueDate', assignment.dueDate.toISOString());
    }

    assignment.testcases.forEach((testcase, i) => {
      formData.append('testcaseInput', new Blob([testcase.in + '\n']), `${i + 1}.in`);
      formData.append('testcaseOutput', new Blob([testcase.out + '\n']), `${i + 1}.out`);
    });

    return this.post(url, formData)
      .then(() => assignment)
      .catch(this.throwError);
  }

  public async createInvitation(
    workspaceId: bigint,
    invitation: CreateInvitationSchemaValues,
  ): Promise<CreateInvitationSchemaValues> {
    const url = '/workspaces/:workspaceId/invitation'.replace(
      ':workspaceId',
      workspaceId.toString(),
    );

    return this.post(url, {
      validAt: new Date(invitation.validAt).toISOString(),
      validUntil: new Date(invitation.validUntil).toISOString(),
    })
      .then(() => invitation)
      .catch(this.throwError);
  }

  public async createSubmission(
    workspaceId: bigint,
    assignmentId: bigint,
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

  public async joinWorkspace(code: string): Promise<Workspace> {
    return this.get(`/workspaces/join/${code}`)
      .then((response) => {
        return response.data.data as unknown as Workspace;
      })
      .catch(this.throwError);
  }

  public async listWorkspace(): Promise<Workspace[]> {
    return this.get('/workspaces')
      .then((response) => {
        return response.data.data as unknown as Workspace[];
      })
      .catch(this.throwError);
  }

  public async getWorkspace(id: bigint): Promise<Workspace> {
    const url = '/workspaces/:workspaceId'.replace(':workspaceId', id.toString());
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Workspace;
      })
      .catch(this.throwError);
  }

  public async getScoreboard(workspaceId: bigint): Promise<WorkspaceRank[]> {
    const url = '/workspaces/:workspaceId/scoreboard'.replace(
      ':workspaceId',
      workspaceId.toString(),
    );
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as WorkspaceRank[];
      })
      .catch(this.throwError);
  }

  public async listWorkspaceParticipant(workspaceId: bigint): Promise<WorkspaceParticipant[]> {
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

  public async listAssignment(workspaceId: bigint): Promise<Assignment[]> {
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

  public async listInvitation(workspaceId: bigint): Promise<Invitation[]> {
    const url = '/workspaces/:workspaceId/invitation'.replace(
      ':workspaceId',
      workspaceId.toString(),
    );
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Invitation[];
      })
      .catch(this.throwError);
  }

  public async getAssignment(workspaceId: bigint, assignmentId: bigint): Promise<Assignment> {
    const url = '/workspaces/:workspaceId/assignments/:assignmentId'
      .replace(':workspaceId', workspaceId.toString())
      .replace(':assignmentId', assignmentId.toString());
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Assignment;
      })
      .catch(this.throwError);
  }

  public async listSubmission(
    workspaceId: bigint,
    assignmentId: bigint,
    all: boolean,
  ): Promise<Submission[]> {
    let url = '/workspaces/:workspaceId/assignments/:assignmentId/submissions'
      .replace(':workspaceId', workspaceId.toString())
      .replace(':assignmentId', assignmentId.toString());
    if (all) url += '?all=true';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as Submission[];
      })
      .catch(this.throwError);
  }

  public async getSubmissionCode(url: string): Promise<string> {
    return this.getFileContent(url);
  }

  public async getAssignmentDetail(url: string): Promise<string> {
    return this.getFileContent(url, true);
  }

  public async getAssignmentTestcase(url: string): Promise<string> {
    return this.getFileContent(url, true).then((data) => data.replace(/\n$/, ''));
  }

  public async updateWorkspace(
    workspaceId: bigint,
    workspace: UpdateWorkspaceFormSchemaValues,
  ): Promise<void> {
    const url = '/workspaces/:workspaceId'.replace(':workspaceId', workspaceId.toString());

    const formData = new FormData();
    if (workspace.name) {
      formData.append('name', workspace.name);
    }

    if (workspace.favorite !== undefined) {
      formData.append('favorite', workspace.favorite.toString());
    }

    if (workspace.profileUrl) {
      const profileUrl = resolveFileUrl(workspace.profileUrl);
      const profile = await Axios.get(profileUrl, {
        baseURL: '',
        responseType: 'blob',
      }).then((response) => new File([response.data], 'profile'));
      formData.append('profile', profile, 'profile');
    }

    return this.patch(url, formData)
      .then(() => {})
      .catch(this.throwError);
  }

  public async updateAssignment(
    workspaceId: bigint,
    assignmentId: bigint,
    assignment: CreateAssignmentSchemaValues,
  ): Promise<void> {
    const url = '/workspaces/:workspaceId/assignments/:assignmentId'
      .replace(':workspaceId', workspaceId.toString())
      .replace(':assignmentId', assignmentId.toString());

    const formData = new FormData();
    formData.append('name', assignment.name);
    formData.append('description', assignment.description);
    formData.append('memoryLimit', assignment.memoryLimit.toString());
    formData.append('timeLimit', assignment.timeLimit.toString());
    formData.append('level', assignment.level);
    formData.append('detail', new Blob([assignment.detail]), 'detail.md');

    if (assignment.dueDate) {
      formData.append('dueDate', assignment.dueDate.toISOString());
    }

    assignment.testcases.forEach((testcase, i) => {
      formData.append('testcaseInput', new Blob([testcase.in + '\n']), `${i + 1}.in`);
      formData.append('testcaseOutput', new Blob([testcase.out + '\n']), `${i + 1}.out`);
    });

    return this.patch(url, formData)
      .then(() => {})
      .catch(this.throwError);
  }

  public async deleteWorkspace(workspaceId: bigint): Promise<void> {
    const url = '/workspaces/:workspaceId'.replace(':workspaceId', workspaceId.toString());
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }

  public async deleteAssignment(workspaceId: bigint, assignmentId: bigint): Promise<void> {
    const url = '/workspaces/:workspaceId/assignments/:assignmentId'
      .replace(':workspaceId', workspaceId.toString())
      .replace(':assignmentId', assignmentId.toString());
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }

  public async deleteInvitation(workspaceId: bigint, invitationId: number): Promise<void> {
    const url = '/workspaces/:workspaceId/invitation/:invitationId'
      .replace(':workspaceId', workspaceId.toString())
      .replace(':invitationId', invitationId.toString());
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }
}

export const workspaceService = new WorkspaceService();
