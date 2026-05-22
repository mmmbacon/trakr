import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

import { JOB_STATUS_OPTIONS } from './jobs/constants';

interface JobSearchBarProps {
  searchValue: string;
  filterStatus?: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (event: SelectChangeEvent<string>) => void;
}

export default function JobSearchBar({
  searchValue,
  filterStatus,
  onSearchChange,
  onStatusChange,
}: JobSearchBarProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="job-search-input">Search Your Jobs</InputLabel>
        <OutlinedInput
          id="job-search-input"
          label="Search Your Jobs"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          endAdornment={(
            <InputAdornment position="end">
              {searchValue ? (
                <IconButton onClick={() => onSearchChange('')} edge="end" aria-label="clear search">
                  <ClearIcon />
                </IconButton>
              ) : (
                <SearchIcon />
              )}
            </InputAdornment>
          )}
        />
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: { sm: 240 } }}>
        <InputLabel htmlFor="job-status-filter">Select Job Status</InputLabel>
        <Select
          native
          value={filterStatus !== undefined ? String(filterStatus) : ''}
          onChange={onStatusChange}
          inputProps={{
            name: 'status',
            id: 'job-status-filter',
          }}
        >
          <option aria-label="None" value="" />
          {JOB_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
