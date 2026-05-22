import type {
  CSSProperties,
  ElementType,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';

export type Spacing = number;

export interface BoxProps {
  children?: ReactNode;
  className?: string;
  id?: string;
  role?: string;
  component?: ElementType;
  display?: CSSProperties['display'];
  flexDirection?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  alignContent?: CSSProperties['alignContent'];
  flex?: CSSProperties['flex'];
  flexGrow?: number;
  flexShrink?: number;
  minWidth?: number | string;
  minHeight?: number | string;
  width?: number | string;
  height?: number | string;
  gap?: Spacing;
  overflow?: CSSProperties['overflow'];
  position?: CSSProperties['position'];
  borderRadius?: CSSProperties['borderRadius'];
  p?: Spacing;
  px?: Spacing;
  py?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  m?: Spacing;
  mx?: Spacing;
  my?: Spacing;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  src?: string;
  alt?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler;
  onKeyDown?: KeyboardEventHandler;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'neutral';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  className?: string;
}

export interface TextFieldProps {
  id?: string;
  label: string;
  name?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'password';
  required?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  maxRows?: number;
  className?: string;
  marginBottom?: Spacing;
  startAdornment?: ReactNode;
  inputMode?: 'numeric' | 'text';
  min?: number;
}

export interface SelectOption {
  readonly value: string | number;
  readonly label: string;
}

export interface SelectFieldProps {
  id?: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  emptyOption?: boolean;
  className?: string;
  marginLeft?: Spacing;
  width?: string | number;
  marginBottom?: Spacing;
}

export interface SearchFieldProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  className?: string;
  marginBottom?: Spacing;
}

export type AlertSeverity = 'error' | 'info' | 'success' | 'warning';

export interface AlertProps {
  children: ReactNode;
  severity?: AlertSeverity;
  onClose?: () => void;
  className?: string;
  square?: boolean;
}

export interface TypographyProps {
  children: ReactNode;
  id?: string;
  variant?: 'h4' | 'h5' | 'subtitle1' | 'body1' | 'body2' | 'caption';
  component?: ElementType;
  className?: string;
  color?: 'primary' | 'secondary' | 'error' | 'inherit';
  align?: 'left' | 'center' | 'right';
  noWrap?: boolean;
  marginTop?: Spacing;
  marginBottom?: Spacing;
  marginLeft?: Spacing;
  fontWeight?: number;
  style?: CSSProperties;
}

export interface PaperProps {
  children: ReactNode;
  className?: string;
  elevation?: number;
  variant?: 'elevation' | 'outlined';
  square?: boolean;
  component?: ElementType;
  'aria-label'?: string;
}

export interface DividerProps {
  children?: ReactNode;
  className?: string;
  marginBottom?: Spacing;
}

export interface IconButtonProps {
  'aria-label': string;
  'aria-pressed'?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
  className?: string;
  edge?: 'start' | 'end';
}

export interface TooltipProps {
  title: string;
  children: ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg';
  id?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  onClick?: MouseEventHandler;
}

export interface ModalContentProps {
  children: ReactNode;
  dividers?: boolean;
  className?: string;
}

export interface ModalTitleProps {
  children: ReactNode;
  id?: string;
}

export interface ModalTextProps {
  children: ReactNode;
  id?: string;
}

export interface ModalActionsProps {
  children: ReactNode;
}

export interface ContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
  className?: string;
  paddingTop?: Spacing | string;
  paddingX?: Spacing | string;
}

export interface GridProps {
  children: ReactNode;
  container?: boolean;
  item?: boolean;
  spacing?: Spacing;
  wrap?: 'nowrap' | 'wrap';
  className?: string;
  id?: string;
  component?: ElementType;
  'aria-label'?: string;
  minWidth?: number | string;
  flex?: CSSProperties['flex'];
  maxWidth?: number | string;
}

export interface LoadingOverlayProps {
  open: boolean;
}

export interface LinearProgressProps {
  className?: string;
}

export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  autoHideDuration?: number;
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right';
  children: ReactNode;
}

export interface FabProps {
  onClick: () => void;
  'aria-label': string;
  children: ReactNode;
  className?: string;
}

export interface GrowProps {
  in: boolean;
  children: ReactNode;
  timeout?: number;
}

export interface DateFieldProps {
  id?: string;
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  className?: string;
}

export interface PieChartDatum {
  id: number;
  value: number;
  label: string;
}

export interface StatusPieChartProps {
  data: PieChartDatum[];
  colors: readonly string[];
  height?: number;
  ariaLabel: string;
}

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface SalaryBarChartProps {
  data: BarChartDatum[];
  color?: string;
  height?: number;
  ariaLabel?: string;
}

export type IconName =
  | 'add'
  | 'assessment'
  | 'calendar'
  | 'cancel'
  | 'clear'
  | 'delete'
  | 'edit'
  | 'event'
  | 'exit'
  | 'location'
  | 'mail'
  | 'new-releases'
  | 'open-in-new'
  | 'phone'
  | 'rotate-left'
  | 'save'
  | 'search'
  | 'visibility'
  | 'visibility-off'
  | 'work';

export interface IconProps {
  name: IconName;
  className?: string;
  size?: number | string;
  color?: string;
  style?: CSSProperties;
}
