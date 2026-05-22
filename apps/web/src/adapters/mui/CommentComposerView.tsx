import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export interface CommentComposerViewProps {
  onSubmit: (body: string) => Promise<void>;
  submitting?: boolean;
}

export default function CommentComposerView({
  onSubmit,
  submitting = false,
}: CommentComposerViewProps) {
  const [body, setBody] = useState('');

  const handleSubmit = async () => {
    const trimmed = body.trim();
    if (!trimmed || submitting) {
      return;
    }
    await onSubmit(trimmed);
    setBody('');
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <TextField
        multiline
        minRows={2}
        size="small"
        placeholder="Leave a comment…"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            void handleSubmit();
          }
        }}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          size="small"
          variant="contained"
          disableElevation
          disabled={!body.trim() || submitting}
          onClick={() => void handleSubmit()}
        >
          Comment
        </Button>
      </Box>
    </Box>
  );
}
