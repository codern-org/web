export const RoutePath = {
  HONE: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',

  CHANGE_PASSWORD: '/changepassword',

  DASHBOARD: '/dashboard',

  WORKSPACE: (workspaceId: number, content: WorkspaceContent) =>
    `/dashboard/workspace/${workspaceId}/${content}`,
  WORKSPACE_SETTINGS: (workspaceId: number) => `/dashboard/workspace/${workspaceId}/settings`,

  ASSIGNMENT: (workspaceId: number, assignmentId: number) =>
    `/dashboard/workspace/${workspaceId}/assignment/${assignmentId}`,
  CREATE_ASSIGNMENT: (workspaceId: number) =>
    `/dashboard/workspace/${workspaceId}/assignment/create`,
};

export enum WorkspaceContent {
  ASSIGNMENT = 'assignment',
  SCOREBOARD = 'scoreboard',
  PARTICIPANT = 'participant',
  SETTINGS = 'settings',
}

export enum WorkspaceSettingsContent {
  GENERAL = 'general',
  ADMIN = 'admin',
  INVITATION = 'invitation',
}
