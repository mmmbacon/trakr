export function projectBoardPath(projectKey: string) {
  return `/dashboard/projects/${projectKey}/board`;
}

export function projectListPath(projectKey: string) {
  return `/dashboard/projects/${projectKey}/list`;
}

export function projectIssuePath(projectKey: string, issueNumber: number | string) {
  return `/dashboard/projects/${projectKey}/issues/${issueNumber}`;
}

export function defaultDashboardPath(projectKey: string | null | undefined) {
  if (!projectKey) {
    return '/dashboard';
  }
  return projectBoardPath(projectKey);
}
