export type AsyncStatus = 'idle' | 'loading' | 'failed' | 'succeeded';

export type Priority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at?: string;
}

export interface Project {
  id: number;
  key: string;
  name: string;
  color: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowState {
  id: number;
  name: string;
  slug: string;
  position: number;
  category: 'backlog' | 'active' | 'done';
}

export interface ActivityActor {
  type: 'human' | 'agent' | 'system';
  id: number | null;
  name: string;
}

export interface Activity {
  id: number;
  kind: string;
  body: string | null;
  actor: ActivityActor;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at?: string;
}

export interface Issue {
  id: number;
  number: number;
  identifier: string;
  title: string;
  description: string;
  priority: Priority;
  project: Project;
  workflow_state: WorkflowState;
  activities?: Activity[];
  created_at: string;
  updated_at: string;
}

export interface AuthSessionResponse {
  logged_in?: boolean;
  logged_out?: boolean;
  user?: User;
  status?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateUserPayload {
  userId: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ActivityPayload {
  body: string;
  kind?: string;
}

export interface IssuePayload {
  issue: {
    title: string;
    description?: string;
    priority?: Priority;
    workflow_state_id?: number;
    workflow_slug?: string;
  };
  activity?: {
    body: string;
    kind?: string;
  };
}

export interface AuthState {
  user: User | null;
  status: AsyncStatus;
  loggingInStatus: AsyncStatus;
  signUpStatus: AsyncStatus;
  updateStatus: AsyncStatus;
}

export interface ProjectsState {
  projects: Project[];
  activeProjectKey: string | null;
  workflowStates: WorkflowState[];
  status: AsyncStatus;
  workflowStatus: AsyncStatus;
}

export interface IssuesState {
  issues: Issue[];
  selectedIssue: Issue | null;
  selectedIssueStatus: AsyncStatus;
  status: AsyncStatus;
  addIssueStatus: AsyncStatus;
  editIssueStatus: AsyncStatus;
  deleteIssueStatus: AsyncStatus;
  transitionIssueStatus: AsyncStatus;
  createActivityStatus: AsyncStatus;
}
