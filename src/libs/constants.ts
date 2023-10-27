export enum RoutePath {
  GOOGLE_AUTH_CALLBACK = '/auth/google/callback',

  HONE = '/',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  DASHBOARD = '/dashboard',
  WORKSPACE = '/dashboard/workspace/:workspaceId',
  ASSIGNMENT = '/dashboard/workspace/:workspaceId/assignment/:assignmentId',

  ORGANIZER_DASHBOARD = '/organizer',
  ORGANIZER_WORKSPACE = '/organizer/workspace/:workspaceId',
  ORGANIZER_WORKSPACCE_SETTINGS = '/organizer/workspace/:workspaceId/settings/:settings',
}

export enum OrganizerWorkspaceTab {
  ASSIGNMENT = 'assignment',
  PARTICIPANT = 'participant',
  SETTINGS = 'settings',
}

export enum OrganizerWorkspaceSettingsTab {
  GENERAL = 'general',
  ADMIN = 'admin',
  INVITATION = 'invitation',
}
