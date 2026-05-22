export type DemoPreset = {
  label: string;
  description: string;
  email: string;
  password: string;
};

export const demoPresets: DemoPreset[] = [
  {
    label: 'Sample Dashboard',
    description: 'Pre-loaded kanban board with jobs and events',
    email: 'beetman@shrutefarms.com',
    password: 'demo',
  },
];
