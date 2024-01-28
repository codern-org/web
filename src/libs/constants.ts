import { matchPath } from 'react-router-dom';

export const RoutePath = {
  HONE: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',

  CHANGE_PASSWORD: '/change-password',

  ACCOUNT_SETTINGS: (settings: AccountSettingsContent) => `/settings/${settings}`,
  FALLBACK_ACCOUNT_SETTINGS: `/settings/profile`,

  DASHBOARD: '/dashboard',
  /** For CodernLogo component only */
  FALLBACK_DASHBOARD: '/dashboard/*',

  WORKSPACE: (workspaceId: bigint, content: WorkspaceContent) =>
    `/dashboard/workspace/${workspaceId}/${content}`,
  FALLBACK_WORKSPACE: (workspaceId: bigint) => `/dashboard/workspace/${workspaceId}/assignment`,

  WORKSPACE_SETTINGS: (workspaceId: bigint, settings: WorkspaceSettingsContent) =>
    `/dashboard/workspace/${workspaceId}/settings/${settings}`,
  FALLBACK_WORKSPACE_SETTINGS: (workspaceId: bigint) =>
    `/dashboard/workspace/${workspaceId}/settings/general`,

  ASSIGNMENT: (workspaceId: bigint, assignmentId: bigint) =>
    `/dashboard/workspace/${workspaceId}/assignment/${assignmentId}`,
  CREATE_ASSIGNMENT: (workspaceId: bigint) =>
    `/dashboard/workspace/${workspaceId}/assignment/create`,
  EDIT_ASSIGNMENT: (workspaceId: bigint, assignmentId: bigint) =>
    `/dashboard/workspace/${workspaceId}/assignment/${assignmentId}/edit`,
  LIST_SUBMISSION: (workspaceId: bigint, assignmentId: bigint) =>
    `/dashboard/workspace/${workspaceId}/assignment/${assignmentId}/submission`,
};

export const getBaseRoutePath = (pathname: string) =>
  matchPath(RoutePath.FALLBACK_DASHBOARD, pathname)?.pathnameBase === RoutePath.DASHBOARD
    ? RoutePath.DASHBOARD
    : RoutePath.HONE;

export enum AccountSettingsContent {
  PROFILE = 'profile',
  SECURITY = 'security',
}

export const isValidAccountSettingsContent = (content: string = '') =>
  Object.values(AccountSettingsContent).includes(content as AccountSettingsContent);

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
