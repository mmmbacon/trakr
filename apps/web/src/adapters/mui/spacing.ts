import type { Spacing } from '../../components/ui/types';

export function toSpacing(value?: Spacing) {
  return value === undefined ? undefined : value;
}

export function spacingProps(props: {
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
}) {
  return {
    p: toSpacing(props.p),
    px: toSpacing(props.px),
    py: toSpacing(props.py),
    pt: toSpacing(props.pt),
    pb: toSpacing(props.pb),
    pl: toSpacing(props.pl),
    pr: toSpacing(props.pr),
    m: toSpacing(props.m),
    mx: toSpacing(props.mx),
    my: toSpacing(props.my),
    mt: toSpacing(props.mt),
    mb: toSpacing(props.mb),
    ml: toSpacing(props.ml),
    mr: toSpacing(props.mr),
  };
}
