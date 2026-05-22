import { useEffect, useState } from 'react';

import type { Job } from '../../types';
import { useAppSelector } from '../../app/hooks';
import JobItem from '../../components/JobItem';
import JobSearchBar from './JobSearchBar';
import { Box, Container, Typography } from '../../components/ui';
import {
  jobsSelector,
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
} from './jobs/jobsSlice';

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

  const handleSelectStatus = (value: string) => {
    setFilterStatus(value === '' ? undefined : Number(value));
  };

  return (
    <Container maxWidth="md" className="search-container">
      <JobSearchBar
        searchValue={searchValue}
        filterStatus={filterStatus}
        onSearchChange={setSearchValue}
        onStatusChange={handleSelectStatus}
      />

      {filteredJobs.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={1}>
          {filteredJobs.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
        </Box>
      ) : (
        <Typography variant="h5" color="secondary" align="center" marginTop={4}>
          No Results Found
        </Typography>
      )}
    </Container>
  );
};

export default Search;
