import { useState, type KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import { JOB_RESOURCE_LINKS } from './jobResourceLinks';

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
      sx={{ width: 100, height: '100%', py: 3 }}
    >
      <Stack spacing={3} alignItems="center" justifyContent="center" height="60%">
        {JOB_RESOURCE_LINKS.map((link) => (
          <Tooltip key={link.title} title={link.title} placement="left">
            <Box
              component="a"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.title}
            >
              <Box
                component="img"
                src={link.imageSrc}
                alt={`${link.title} logo`}
                width={link.imageWidth ?? 50}
              />
            </Box>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );

  return (
    <>
      <Tooltip title="Job Resources">
        <Fab
          color="secondary"
          onClick={() => setOpen(true)}
          aria-label="Job Resources"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
        >
          <WorkOutlineIcon />
        </Fab>
      </Tooltip>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        {drawerContent}
      </Drawer>
    </>
  );
}

export default JobResourceDrawer;
