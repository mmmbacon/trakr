import { LinkInputField, type LinkInputAction } from './ui';

export type { LinkInputAction };

interface LinkInputProps {
  id: string;
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  action?: LinkInputAction;
  className?: string;
  mailtoSubject?: string;
  mailtoBody?: string;
  ariaLabel?: string;
}

export default function LinkInput(props: LinkInputProps) {
  return <LinkInputField {...props} />;
}
