import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ActivityStream from './ActivityStream';
import CommentComposerView from './CommentComposerView';
import IssueDescriptionEditor from './IssueDescriptionEditor';
import type { Activity, WorkflowState } from '../../types';

export interface IssuePanelBodyProps {
  description: string;
  activities: Activity[];
  workflowStates: WorkflowState[];
  submittingComment?: boolean;
  onDescriptionChange: (value: string) => void;
  onCommentSubmit: (body: string) => Promise<void>;
}

export default function IssuePanelBody({
  description,
  activities,
  workflowStates,
  submittingComment = false,
  onDescriptionChange,
  onCommentSubmit,
}: IssuePanelBodyProps) {
  return (
    <Box flex={1} minHeight={0} overflow="auto" sx={{ px: 2, py: 1.5 }}>
      <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={1}>
        Description
      </Typography>
      <IssueDescriptionEditor description={description} onChange={onDescriptionChange} />

      <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mt={2} mb={1}>
        Activity
      </Typography>
      <ActivityStream activities={activities} workflowStates={workflowStates} />
      <Box mt={2}>
        <CommentComposerView onSubmit={onCommentSubmit} submitting={submittingComment} />
      </Box>
    </Box>
  );
}
