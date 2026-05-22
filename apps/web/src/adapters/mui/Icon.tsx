import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarIcon from '@mui/icons-material/InsertInvitationSharp';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import PhoneIcon from '@mui/icons-material/Phone';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import type { IconName, IconProps } from '../../components/ui/types';

const iconMap = {
  add: AddIcon,
  assessment: AssessmentIcon,
  calendar: CalendarIcon,
  cancel: CancelIcon,
  clear: ClearIcon,
  delete: DeleteIcon,
  edit: EditIcon,
  event: EventIcon,
  exit: ExitToAppIcon,
  location: LocationOnIcon,
  mail: MailOutlineSharpIcon,
  'new-releases': NewReleasesIcon,
  'open-in-new': OpenInNewSharpIcon,
  phone: PhoneIcon,
  'rotate-left': RotateLeftIcon,
  save: SaveIcon,
  search: SearchIcon,
  visibility: Visibility,
  'visibility-off': VisibilityOff,
  work: WorkOutlineIcon,
} satisfies Record<IconName, typeof AddIcon>;

export default function Icon({ name, className, size, color, style }: IconProps) {
  const IconComponent = iconMap[name];

  return (
    <IconComponent
      className={className}
      sx={{ fontSize: size, color }}
      style={style}
    />
  );
}
