export type AsyncStatus = 'idle' | 'loading' | 'failed' | 'succeeded';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at?: string;
}

export interface JobEvent {
  id?: number;
  job_id?: number;
  title: string;
  details: string;
  date: string;
  location: string;
  expired?: boolean;
}

export interface Job {
  id: number;
  company: string;
  title: string;
  details: string;
  location: string;
  salary: number | null;
  status: number;
  url: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  contact_socialmedia: string;
  resume_url: string;
  coverletter_url: string;
  extra_url: string;
  events: JobEvent[];
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

export interface JobPayload {
  job: Partial<Job> & Pick<Job, 'company' | 'title' | 'status'>;
  event?: Partial<JobEvent>;
}

export interface AuthState {
  user: User | null;
  status: AsyncStatus;
  loggingInStatus: AsyncStatus;
  signUpStatus: AsyncStatus;
  updateStatus: AsyncStatus;
}

export interface JobsState {
  jobs: Job[];
  status: AsyncStatus;
  addJobStatus: AsyncStatus;
  editJobStatus: AsyncStatus;
  deleteJobStatus: AsyncStatus;
}
