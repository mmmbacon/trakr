export interface JobResourceLink {
  title: string;
  href: string;
  imageSrc: string;
  imageWidth?: number;
}

export const JOB_RESOURCE_LINKS: JobResourceLink[] = [
  {
    title: 'LinkedIn',
    href: 'https://linkedin.com',
    imageSrc: 'https://content.stocktrak.com/wp-content/uploads/2016/10/linkedin-logo.png',
    imageWidth: 50,
  },
  {
    title: 'Indeed',
    href: 'https://ca.indeed.com/',
    imageSrc: 'https://logo.clearbit.com/indeed.com',
    imageWidth: 50,
  },
  {
    title: 'Zip Recruiter',
    href: 'https://www.ziprecruiter.com/candidate/suggested-jobs',
    imageSrc: 'https://logo.clearbit.com/ziprecruiter.com',
    imageWidth: 50,
  },
  {
    title: 'Monster',
    href: 'https://hiring.monster.com/?intcid=HEADER_hp',
    imageSrc: 'https://logo.clearbit.com/monster.com',
    imageWidth: 50,
  },
  {
    title: 'Glassdoor',
    href: 'https://www.glassdoor.ca/index.htm?countryRedirect=true',
    imageSrc: 'https://logo.clearbit.com/glassdoor.com',
    imageWidth: 50,
  },
];
