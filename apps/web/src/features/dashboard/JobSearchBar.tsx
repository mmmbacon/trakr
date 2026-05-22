import { JOB_STATUS_OPTIONS } from './jobs/constants';
import { Box, SearchField, SelectField } from '../../components/ui';

interface JobSearchBarProps {
  searchValue: string;
  filterStatus?: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function JobSearchBar({
  searchValue,
  filterStatus,
  onSearchChange,
  onStatusChange,
}: JobSearchBarProps) {
  return (
    <Box className="search-row">
      <SearchField
        id="job-search-input"
        label="Search Your Jobs"
        value={searchValue}
        onChange={onSearchChange}
        marginBottom={3.125}
      />
      <SelectField
        id="job-status-filter"
        label="Select Job Status"
        value={filterStatus !== undefined ? String(filterStatus) : ''}
        onChange={onStatusChange}
        options={JOB_STATUS_OPTIONS}
        emptyOption
        className="search-status-filter"
        marginBottom={3.125}
      />
    </Box>
  );
}
