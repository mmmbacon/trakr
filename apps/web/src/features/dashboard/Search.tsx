import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import type { Job } from '../../types';
import { useAppSelector } from '../../app/hooks';
import JobItem from '../../components/JobItem';
import {
  jobsSelector,
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
} from './jobs/jobsSlice';

const searchRowSx = {
  display: 'flex',
  flexDirection: 'row',
};

const searchInputSx = {
  mb: '25px',
  bgcolor: 'white',
};

function getFilteredJobs(jobs: Job[], searchValue: string): Job[] {
  const searchValueLowerCase = searchValue.toLowerCase();
  return jobs.filter((job) => {
    for (const key of Object.keys(job) as (keyof Job)[]) {
      if (key === 'events') {
        continue;
      }
      const value = job[key];
      if (value != null && value.toString().toLowerCase().includes(searchValueLowerCase)) {
        return true;
      }
    }
    return false;
  });
}

function renderJobItem(job: Job) {
  const firstEvent = job.events.length > 0 ? job.events[0] : null;
  return (
    <JobItem
      key={job.id}
      id={job.id}
      company={job.company}
      title={job.title}
      description={job.details}
      location={job.location}
      salary={job.salary ?? undefined}
      status={job.status}
      url={job.url}
      contact_name={job.contact_name}
      contact_phone={job.contact_phone}
      contact_email={job.contact_email}
      contact_socialmedia={job.contact_socialmedia}
      resume_url={job.resume_url}
      coverletter_url={job.coverletter_url}
      extra_url={job.extra_url}
      event_title={firstEvent?.title ?? ''}
      event_details={firstEvent?.details ?? ''}
      event_date={firstEvent?.date ?? ''}
      event_location={firstEvent?.location ?? ''}
      event_jobid={firstEvent?.job_id}
      event_id={firstEvent?.id}
    />
  );
}

const Search = () => {
  const { jobs } = useAppSelector(jobsSelector);
  const interestedJobs = useAppSelector(selectInterestedJobs);
  const appliedJobs = useAppSelector(selectAppliedJobs);
  const interviewingJobs = useAppSelector(selectInterviewingJobs);
  const offerJobs = useAppSelector(selectOfferJobs);
  const rejectedJobs = useAppSelector(selectRejectedJobs);

  const [searchValue, setSearchValue] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filterStatus, setFilterStatus] = useState<number | undefined>(undefined);

  useEffect(() => {
    const statusObject: Record<number, Job[]> = {
      0: interestedJobs,
      1: appliedJobs,
      2: interviewingJobs,
      3: offerJobs,
      4: rejectedJobs,
    };
    const jobSelection = filterStatus !== undefined ? statusObject[filterStatus] : jobs;
    setFilteredJobs(getFilteredJobs(jobSelection ?? [], searchValue));
  }, [
    searchValue,
    filterStatus,
    jobs,
    interestedJobs,
    appliedJobs,
    interviewingJobs,
    offerJobs,
    rejectedJobs,
  ]);

  const handleSelectStatus = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setFilterStatus(value === '' ? undefined : Number(value));
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        width: '100%',
        pt: '25px',
        px: '25px',
      }}
    >
      <Box sx={searchRowSx}>
        <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
          <InputLabel htmlFor="job-search-input">Search Your Jobs</InputLabel>
          <OutlinedInput
            id="job-search-input"
            fullWidth
            label="Search Your Jobs"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            endAdornment={(
              <InputAdornment position="end">
                {searchValue ? (
                  <IconButton onClick={() => setSearchValue('')} edge="end" aria-label="clear search">
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
            onChange={handleSelectStatus}
            inputProps={{
              name: 'status',
              id: 'job-status-filter',
            }}
            sx={searchInputSx}
          >
            <option aria-label="None" value="" />
            <option value={0}>Interested</option>
            <option value={1}>Applied</option>
            <option value={2}>Interviewing</option>
            <option value={3}>Offers</option>
            <option value={4}>Rejected</option>
          </Select>
        </FormControl>
      </Box>

      {filteredJobs.length > 0 ? (
        filteredJobs.map(renderJobItem)
      ) : (
        <Box>
          <h3>No Results Found</h3>
        </Box>
      )}
    </Container>
  );
};

export default Search;
