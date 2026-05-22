import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface IssuePanelFooterProps {
  onCopyLink: () => void;
  onCopyId: () => void;
  onDelete: () => void;
}

export default function IssuePanelFooter({
  onCopyLink,
  onCopyId,
  onDelete,
}: IssuePanelFooterProps) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderTop: 1,
        borderColor: 'divider',
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      <Button size="small" variant="outlined" onClick={onCopyLink}>
        Copy link
      </Button>
      <Button size="small" variant="outlined" onClick={onCopyId}>
        Copy ID
      </Button>
      <Box flex={1} />
      <Button size="small" color="error" onClick={onDelete}>
        Delete
      </Button>
    </Box>
  );
}
