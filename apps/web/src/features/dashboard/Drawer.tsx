import { useState, type KeyboardEvent } from 'react';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import { lightTooltipSlotProps } from '../../theme/tooltip';
import { JOB_RESOURCE_LINKS } from './jobResourceLinks';
import '../../styles/JobsResources.scss';

const fabSx = {
  position: 'fixed',
  bottom: 24,
  right: 24,
  bgcolor: '#43aa8b',
  zIndex: 1,
  '&:hover': {
    bgcolor: '#3a9680',
  },
};

function JobResourceDrawer() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab' || event.key === 'Shift') {
      return;
    }
    handleClose();
  };

  const drawerContent = (
    <div
      className="jobResources-sidebar"
      role="presentation"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
    >
      <div className="jobResources">
        {JOB_RESOURCE_LINKS.map((link) => (
          <Tooltip
            key={link.title}
            title={link.title}
            aria-label={link.title}
            placement="left"
            slotProps={lightTooltipSlotProps}
          >
            <a href={link.href} target="_blank" rel="noreferrer">
              <img
                src={link.imageSrc}
                alt={`${link.title} logo`}
                width={link.imageWidth ?? 50}
              />
            </a>
          </Tooltip>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Tooltip title="Job Resources" aria-label="Job Resources">
        <Fab
          onClick={() => setOpen(true)}
          sx={fabSx}
          aria-label="Job Resources"
        >
          <WorkOutlineIcon sx={{ color: '#FFFFFF' }} />
        </Fab>
      </Tooltip>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        {drawerContent}
      </Drawer>
    </div>
  );
}

export default JobResourceDrawer;
