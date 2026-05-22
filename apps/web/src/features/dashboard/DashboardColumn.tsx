import { Box } from '@mui/material';
import type { Job } from '../../types';
import JobItem from '../../components/JobItem';
import DashboardColumnHeading from './DashboardColumnHeading';

export interface DashboardColumnProps {
  title?: string;
  color?: string;
  items?: Job[];
  index?: number;
  tickUrl?: string;
}

const DashboardColumn = ({
  title = 'Category',
  color = '#ee6a7c',
  items = [],
  tickUrl = 'https://i.imgur.com/rr4anU1.png',
}: DashboardColumnProps) => {
  const jobItems = items.map((item) => {
    const firstEvent = item.events.length > 0 ? item.events[0] : null;
    return (
      <JobItem
        key={item.id}
        id={item.id}
        company={item.company}
        title={item.title}
        description={item.details}
        location={item.location}
        salary={item.salary ?? undefined}
        status={item.status}
        url={item.url}
        contact_name={item.contact_name}
        contact_phone={item.contact_phone}
        contact_email={item.contact_email}
        contact_socialmedia={item.contact_socialmedia}
        resume_url={item.resume_url}
        coverletter_url={item.coverletter_url}
        extra_url={item.extra_url}
        event_title={firstEvent?.title ?? ''}
        event_expired={firstEvent?.expired ?? false}
        event_details={firstEvent?.details ?? ''}
        event_date={firstEvent?.date ?? ''}
        event_location={firstEvent?.location ?? ''}
        event_jobid={firstEvent?.job_id}
        event_id={firstEvent?.id}
      />
    );
  });

  return (
    <Box sx={{ width: 1, height: '100%', p: '5px' }}>
      <DashboardColumnHeading title={title} color={color} tickUrl={tickUrl} />
      {jobItems}
    </Box>
  );
};

export default DashboardColumn;
