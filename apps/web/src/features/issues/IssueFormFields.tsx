import { Box, SelectField, TextInput } from '../../components/ui';
import type { WorkflowState } from '../../types';
import type { IssueFormValues } from './useIssueForm';
import { PRIORITY_OPTIONS } from './constants';

interface IssueFormFieldsProps {
  values: IssueFormValues;
  workflowStates: WorkflowState[];
  onFieldChange: <K extends keyof IssueFormValues>(field: K, value: IssueFormValues[K]) => void;
}

export default function IssueFormFields({
  values,
  workflowStates,
  onFieldChange,
}: IssueFormFieldsProps) {
  const workflowOptions = workflowStates.map((state) => ({
    value: state.id,
    label: state.name,
  }));

  return (
    <>
      <Box display="flex" flexDirection="row" gap={1} mb={1}>
        <Box flex={1}>
          <TextInput
            required
            id="issue-title"
            label="Title"
            name="title"
            value={values.title}
            onChange={(value) => onFieldChange('title', value)}
          />
        </Box>
        <Box width="33%">
          <SelectField
            id="issue-workflow-state"
            label="Status"
            value={values.workflow_state_id === '' ? '' : values.workflow_state_id}
            onChange={(value) => onFieldChange(
              'workflow_state_id',
              value === '' ? '' : Number(value),
            )}
            options={workflowOptions}
          />
        </Box>
        <Box width="25%">
          <SelectField
            id="issue-priority"
            label="Priority"
            value={values.priority}
            onChange={(value) => onFieldChange('priority', value as IssueFormValues['priority'])}
            options={PRIORITY_OPTIONS}
          />
        </Box>
      </Box>
      <Box mb={1}>
        <TextInput
          id="issue-description"
          multiline
          label="Description"
          className="modal-middle-details"
          name="description"
          value={values.description}
          onChange={(value) => onFieldChange('description', value)}
        />
      </Box>
      <Box>
        <TextInput
          id="issue-comment"
          multiline
          label="Comment"
          name="comment"
          value={values.comment}
          onChange={(value) => onFieldChange('comment', value)}
        />
      </Box>
    </>
  );
}
