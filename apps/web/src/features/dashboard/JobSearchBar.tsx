import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

import { JOB_STATUS_OPTIONS } from './jobs/constants';

const searchRowSx = {
  display: 'flex',
  flexDirection: 'row',
};

const searchInputSx = {
  mb: '25px',
  bgcolor: 'white',
};

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
    <Box sx={searchRowSx}>
      <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
        <InputLabel htmlFor="job-search-input">Search Your Jobs</InputLabel>
        <OutlinedInput
          id="job-search-input"
          fullWidth
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
          sx={searchInputSx}
        />
      </FormControl>
      <FormControl variant="outlined" sx={{ ml: '25px', width: '250px' }}>
        <InputLabel htmlFor="job-status-filter">Select Job Status</InputLabel>
        <Select
          native
          value={filterStatus !== undefined ? String(filterStatus) : ''}
          onChange={onStatusChange}
          inputProps={{
            name: 'status',
            id: 'job-status-filter',
          }}
          sx={searchInputSx}
        >
          <option aria-label="None" value="" />
          {JOB_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
