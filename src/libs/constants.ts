import { matchPath } from 'react-router-dom';

export const RoutePath = {
  HONE: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',

  CHANGE_PASSWORD: '/changepassword',

  DASHBOARD: '/dashboard',

  /** For CodernLogo component only */
  FALLBACK_DASHBOARD: '/dashboard/*',

  WORKSPACE: (workspaceId: number, content: WorkspaceContent) =>
    `/dashboard/workspace/${workspaceId}/${content}`,
  FALLBACK_WORKSPACE: (workspaceId: number) => `/dashboard/workspace/${workspaceId}/assignment`,

  WORKSPACE_SETTINGS: (workspaceId: number, settings: WorkspaceSettingsContent) =>
    `/dashboard/workspace/${workspaceId}/settings/${settings}`,
  FALLBACK_WORKSPACE_SETTINGS: (workspaceId: number) =>
    `/dashboard/workspace/${workspaceId}/settings/general`,

  ASSIGNMENT: (workspaceId: number, assignmentId: number) =>
    `/dashboard/workspace/${workspaceId}/assignment/${assignmentId}`,
  CREATE_ASSIGNMENT: (workspaceId: number) =>
    `/dashboard/workspace/${workspaceId}/assignment/create`,
};

export const getBaseRoutePath = (pathname: string) =>
  matchPath(RoutePath.FALLBACK_DASHBOARD, pathname)?.pathnameBase === RoutePath.DASHBOARD
    ? RoutePath.DASHBOARD
    : RoutePath.HONE;

export enum WorkspaceContent {
  ASSIGNMENT = 'assignment',
  SCOREBOARD = 'scoreboard',
  PARTICIPANT = 'participant',
  SETTINGS = 'settings',
}

export const isValidWorkspaceContent = (content: string = '') =>
  Object.values(WorkspaceContent).includes(content as WorkspaceContent);

export enum WorkspaceSettingsContent {
  GENERAL = 'general',
  ADMIN = 'admin',
  INVITATION = 'invitation',
}

export const isValidWorkspaceSettingsContent = (content: string = '') =>
  Object.values(WorkspaceSettingsContent).includes(content as WorkspaceSettingsContent);
