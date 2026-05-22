import { useState, type KeyboardEvent } from 'react';

import { JOB_RESOURCE_LINKS } from './jobResourceLinks';
import { Drawer, Fab, Icon, Tooltip } from '../../components/ui';
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
    <div
      className="jobResources-sidebar"
      role="presentation"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
    >
      <div className="jobResources">
        {JOB_RESOURCE_LINKS.map((link) => (
          <Tooltip key={link.title} title={link.title} placement="left">
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
      <Tooltip title="Job Resources">
        <Fab onClick={() => setOpen(true)} aria-label="Job Resources">
          <Icon name="work" className="fab-icon" />
        </Fab>
      </Tooltip>
      <Drawer open={open} onClose={handleClose}>
        {drawerContent}
      </Drawer>
    </div>
  );
}

export default JobResourceDrawer;
