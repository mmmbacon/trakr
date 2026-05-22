const isDemoMode =
  import.meta.env.VITE_DEMO_MODE === 'true' || import.meta.env.DEV;

export default isDemoMode;
