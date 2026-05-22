import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export interface IssueDescriptionEditorProps {
  description: string;
  onChange: (value: string) => void;
}

export default function IssueDescriptionEditor({
  description,
  onChange,
}: IssueDescriptionEditorProps) {
  const [value, setValue] = useState(description);
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  useEffect(() => {
    setValue(description);
  }, [description]);

  const handleChange = (next: string) => {
    setValue(next);
    onChange(next);
  };

  return (
    <Box>
      <Box display="flex" gap={0.5} mb={1}>
        <Button
          size="small"
          variant={tab === 'write' ? 'contained' : 'text'}
          onClick={() => setTab('write')}
          sx={{ minWidth: 0, px: 1, py: 0.25, fontSize: '0.6875rem', fontWeight: tab === 'write' ? 600 : 400 }}
        >
          Write
        </Button>
        <Button
          size="small"
          variant={tab === 'preview' ? 'contained' : 'text'}
          onClick={() => setTab('preview')}
          sx={{ minWidth: 0, px: 1, py: 0.25, fontSize: '0.6875rem', fontWeight: tab === 'preview' ? 600 : 400 }}
        >
          Preview
        </Button>
      </Box>
      {tab === 'write' ? (
        <TextField
          multiline
          minRows={3}
          fullWidth
          size="small"
          placeholder="Add a description…"
          value={value}
          onChange={(event) => handleChange(event.target.value)}
        />
      ) : (
        <Typography
          variant="body2"
          sx={{ whiteSpace: 'pre-wrap', minHeight: 72, color: value ? 'text.primary' : 'text.secondary' }}
        >
          {value || 'Nothing to preview'}
        </Typography>
      )}
    </Box>
  );
}
