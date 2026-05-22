import { useState, type KeyboardEvent } from 'react';

import { JOB_RESOURCE_LINKS } from './jobResourceLinks';
import { Box, Drawer, Fab, Icon, Tooltip } from '../../components/ui';
import '../../styles/JobsResources.scss';

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
    <Box
      role="presentation"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      width={100}
      height="100%"
      py={3}
    >
      <div className="jobResources">
        {JOB_RESOURCE_LINKS.map((link) => (
          <Tooltip key={link.title} title={link.title} placement="left">
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.title}
            >
              <img
                src={link.imageSrc}
                alt={`${link.title} logo`}
                width={link.imageWidth ?? 50}
              />
            </a>
          </Tooltip>
        ))}
      </div>
    </Box>
  );

  return (
    <>
      <Tooltip title="Job Resources">
        <Fab onClick={() => setOpen(true)} aria-label="Job Resources">
          <Icon name="work" className="fab-icon" />
        </Fab>
      </Tooltip>
      <Drawer open={open} onClose={handleClose}>
        {drawerContent}
      </Drawer>
    </>
  );
}

export default JobResourceDrawer;
