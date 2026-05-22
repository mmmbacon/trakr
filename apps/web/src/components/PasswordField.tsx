import { PasswordInput } from './ui';

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  marginBottom?: number;
}

export default function PasswordField({
  label,
  value,
  onChange,
  className,
  marginBottom,
}: PasswordFieldProps) {
  return (
    <PasswordInput
      label={label}
      value={value}
      onChange={onChange}
      className={className}
      marginBottom={marginBottom}
    />
  );
}
