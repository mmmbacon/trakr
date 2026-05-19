# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Demo user for portfolio / local development (see DEMO_MODE)
user1 = User.find_or_initialize_by(email: 'beetman@shrutefarms.com')
user1.assign_attributes(
  first_name: 'Dwight',
  last_name: 'Schrute',
  password: 'demo',
  password_confirmation: 'demo'
)
user1.save!

return if user1.jobs.exists?

## Jobs
user1.jobs.create!({
  title: "Software Developer",
  company: "Dyspatch",
  details: "Relevant Technical Knowlege: TypeScript, Go, Python, React, Node, GraphQL, gRPC, PostgreSQL, Redis, Memcache, AWS and Kubernetes infrastructure",
  status: 3,
  salary: 95000,
  url: "https://www.dyspatch.io/about/careers/post/?d3e37047-89ac-417a-8621-c77b4cfde148",
  location: "Remote",
  contact_name: 'Alex Lam',
  contact_email: 'alex.l@gmail.com',
  contact_phone: '(250) 485-6631',
  contact_socialmedia: '',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Senior Developer',
  company: 'Google',
  details: 'I would like to be a senior dev, but this job would require me to move.',
  status: 4,
  salary: 20000,
  url:'https://www.linkedin.com/jobs/view/2554027046',
  location: 'San Francisco',
  contact_name: 'John Doe',
  contact_email: 'j.doe@gmail.com',
  contact_phone: '(555) 555-6677',
  contact_socialmedia: 'linkedin.com/jdoe',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})
  
user1.jobs.create!({
  title: 'Full-Stack Web Developer',
  company: 'Fortinet',
  details: 'Design, research, development and maintenance for the FortiClient EMS software
  Stay on top of new developments in the fields of front-end and back-end web application development',
  status: 1,
  salary: 61000,
  url: 'https://www.linkedin.com/jobs/search/?alternateChannel=bysave&alternateCode=seturl&currentJobId=2578601531&jobPostingId=2574921206&origin=JOBS_HOME_SIMILAR_JOBS&pivotType=similarJobs&refId=vqwVCnlqmIajzkp7sieyvA%3D%3D',
  location: 'Burnaby, BC',
  contact_name: 'John MacLellan',
  contact_email: 'jmaclellan@fortinet.com',
  contact_phone: '(354) 845-9875',
  contact_socialmedia: 'linkedin.com/jmaclellan',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Senior .Net Developer',
  company: 'Buyatab',
  details: 'A finTech maverick and officially one of the most popular technology companies in BC, Buyatab is a leading supplier of advanced online gift card infrastructure, technology and marketing services for leading brands. Working with some of the world’s leading brands (including Four Seasons, Fairmont, Whole Foods Market, Lowes), we are recognized for our solution and design flexibility, focus on client brand standards, high-quality customer support, and fraud protection guarantee. ',
  status: 0,
  salary: 60000,
  url: 'https://jobs.smartrecruiters.com/McDonaldsCanada/743999751554055-ft-cashiers-cooks-customer-service-scottsdale-north-delta',
  location: 'Airdrie',
  contact_name: 'Dwight Shrute',
  contact_email: 'beetman@buyatab.com',
  contact_phone: '(548) 954-8423',
  contact_socialmedia: 'linkedin.com/beetman',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Senior Frontend Engineer, Marketing',
  company: 'Shopify',
  details: '',
  status: 4,
  salary: 58000,
  url: 'https://www.shopify.ca/careers/senior-frontend-engineer-marketing-remote-americas-bf487eb9',
  location: 'Remote',
  contact_name: ' Monica Gellar',
  contact_email: 'monicag@shopify.ca',
  contact_phone: '(604) 584-3678',
  contact_socialmedia: '',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Software Engineer Backend',
  company: 'Docker',
  details: 'Position is for Docker Hub',
  status: 0,
  salary: 66000,
  url: 'https://www.docker.com/career-openings',
  location: 'Remote',
  contact_name: 'Goku Son',
  contact_email: 'goku@dockerhub.ca',
  contact_phone: '(804) 548-6521',
  contact_socialmedia: '',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Senior Developer',
  company: 'Netflix',
  details: 'I would like to be a senior dev, but this job would require me to move.',
  status: 1,
  salary: 60000,
  url:'https://www.linkedin.com/jobs/view/2554027046',
  location: 'San Francisco',
  contact_name: 'John Doe',
  contact_email: 'j.doe@gmail.com',
  contact_phone: '(585) 895-4857',
  contact_socialmedia: 'linkedin.com/jdoe',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Senior Game Developer (Full-Stack)',
  company: 'Electronic Arts',
  details: 'Develop web applications using modern web technologies.
  Design, develop and maintain our service APIs.
  Ensure service scalability through effective code and data storage design.',
  status: 3,
  salary: 72000,
  url: 'https://www.linkedin.com/jobs/search/?currentJobId=2546145034&jobPostingId=2574921206&pivotType=similarJobs',
  location: 'Burnaby, BC',
  contact_name: 'Jan Backer',
  contact_email: 'jan.backer@unitytechnologies.com',
  contact_phone: '(568) 471-6397',
  contact_socialmedia: 'linkedin.com/janbacker',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Principal Full Stack UI Developer',
  company: 'Netskope',
  details: 'Work in the frontend to implement the user interface.
  Work in the backend to develop web applications.
  Work in the REST API Gateway to implement new endpoints.',
  status: 4,
  salary: 92000,
  url: 'https://www.linkedin.com/jobs/search/?currentJobId=2559029930&jobPostingId=2574921206&pivotType=similarJobs',
  location: 'Vancouver, BC',
  contact_name: 'Bill Stoddart',
  contact_email: 'bstoddart@netskope.com',
  contact_phone: '(854) 845-9861',
  contact_socialmedia: 'linkedin.com/bstoddart',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Backend Developer',
  company: 'Aritzia',
  details: '',
  status: 2,
  salary: 87000,
  url: 'https://www.aritzia.com/en/aritzia/careers/careers-landing-page/careers-landing.html',
  location: 'Vancouver, BC',
  contact_name: 'Olivia White',
  contact_email: 'o.white@aritzia.ca',
  contact_phone: '(250) 784-3548',
  contact_socialmedia: '',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Cloud Architect',
  company: 'Lululemon',
  details: '',
  status: 4,
  salary: 85000,
  url: 'https://careers.lululemon.com/en_US/careers',
  location: 'Toronto, ON',
  contact_name: 'June Smith',
  contact_email: 'junesmith@lululemon.ca',
  contact_phone: '(408) 542-6584',
  contact_socialmedia: '',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Software Development Engineer',
  company: 'Apple',
  details: 'Job ID: A1586970',
  status: 2,
  salary: 100000,
  url: 'https://www.google.com/search?q=amazon+developer+jobs&rlz=1C5CHFA_enCA917CA917&oq=amazon+developer+jobs&aqs=chrome..69i57j0l3j0i22i30l6.3735j0j7&sourceid=chrome&ie=UTF-8&ibp=htl;jobs&sa=X&ved=2ahUKEwjR37C9nZDxAhVOgp4KHZqiAIAQkd0GMAB6BAgVEAE#fpstate=tldetail&htivrt=jobs&htiq=amazon+developer+jobs&htidocid=siPKV9ikWhPubY6WAAAAAA%3D%3D&sxsrf=ALeKk03H5AWVnr00Q1tSDUh5JvCZxLL-Nw:1623436831772',
  location: 'Vancouver, BC',
  contact_name: 'Rachel Green',
  contact_email: 'rachel.green@amazon.ca',
  contact_phone: '(250) 845-6574',
  contact_socialmedia: '',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Remote React / Node Developer',
  company: 'CyberCoders',
  details: 'Participate in cross-functional projects in an agile environment. Build, deploy, and maintain your own code. Support standard development practices including idiomatic syntax, design patterns, and Test-driven development',
  status: 0,
  salary: 85000,
  url: 'https://www.linkedin.com/jobs/search/?geoId=90000084&location=San%20Francisco%20Bay%20Area',
  location: 'San Francisco, CA',
  contact_name: 'Jamie Balduc',
  contact_email: 'balducj@cybercoders.com',
  contact_phone: '(654) 548-2510',
  contact_socialmedia: '',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Junior Full-Stack Developer',
  company: 'Fresh Prep',
  details: 'HTML, CSS, Javascript (ES6)
  Object oriented web programming like Ruby on Rails
  Using relational databases like Postgres
  Confident with the Unix shell
  Comfortable writing tests, in particular rspec
  Confidence when justifying decisions
  Empathy when listening to other opinions
  ',
  status: 2,
  salary: 75000,
  url: 'https://ca.indeed.com/viewjob?jk=f814fb9211b7cd73&q=Junior+Developer&l=Vancouver%2C+BC&tk=1f7u5q046pi9i800&from=web&vjs=3',
  location: 'Vancouver, BC',
  contact_name: 'Andy Lindsay',
  contact_email: 'andy.lindsay@gmail.com',
  contact_phone: '(778) 354-8243',
  contact_socialmedia: '@thegoat',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

user1.jobs.create!({
  title: 'Senior Software Engineer - Backend (Ads)',
  company: 'Uber',
  details: "We're looking for Senior backend engineers to join our team in Toronto to help grow the UberEats ads business which enables eaters to discover new foods, and restaurants to grow their customer base. You'll work with teams behind apps used by millions globally every day and be a part of the technical foundations of a new product, built at Uber Canada's new development center.",
  status: 0,
  salary: 95000,
  url: 'https://www.uber.com/global/en/careers/list/101205/?iis=marketing&iisn=ZipRecruiter&iisp=paid&rx_campaign=ziprecruiter86&rx_group=124699&rx_job=101205&rx_medium=cpc&rx_p=79b24503-fc50-4291-9e6a-026a3c3039ac&rx_r=none&rx_source=ziprecruiter&rx_ts=20210611T120724Z&rx_viewer=bea8ea61cae311eba262d71679b9494e0b03d59e739940db89c6d8f0e7c00a86',
  location: 'Toronto, ON',
  contact_name: 'Michael Scott',
  contact_email: 'michael.g.scott@gmail.com',
  contact_phone: '(111) 234-5678',
  contact_socialmedia: 'linkedin.com/thatswhatshesaid',
  resume_url: 'https://www.canva.com/design/DAEhGu6oMUE/uLavfNgcESSe3ZD-ZjabAQ/view?utm_content=DAEhGu6oMUE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
  coverletter_url: 'https://www.canva.com/design/DAEhGqMFIkg/yUMIkVq8w7_J9ctb5t1vbA/edit?set.doctype=TACQ-qm91ig%3A1&set.category.id=tACZCn1F2Jc&set.auth-token=eeb6_1UzexHG1_pDCc6mww&layoutQuery=Letter',
  extra_url: 'https://startbootstrap.com/theme/creative',
})

## Events
user1.jobs[0].events.create!({
  title: 'HR Interview',
  date: '2021/07/20',
  location: 'https://us05web.zoom.us/j/89038259337?pwd=US9oS056M1lYb1l3aG5lT00zWEtOdz09',
  details: 'Alex will send zoom link 24hrs before interview time'
})

user1.jobs[1].events.create!({
  title: 'Call with Joe',
  date: '2021/06/22',
  location: '',
  details: ''
})

user1.jobs[3].events.create!({
  title: 'Follow Up with Recruiter',
  date: '2021/07/20',
  location: 'https://us05web.zoom.us/j/89038259337?pwd=US9oS056M1lYb1l3aG5lT00zWEtOdz09',
  details: 'Thank you email for chattign earlier in the week about potential oppurtunities at buyatab'
})

user1.jobs[6].events.create!({
  title: 'Meeting with Recruiter',
  date: '2021/06/14',
  location: 'https://us05web.zoom.us/j/89038259337?pwd=US9oS056M1lYb1l3aG5lT00zWEtOdz09',
  details: 'Talk about hiring process'
})

user1.jobs[7].events.create!({
  title: 'Virtual Interview',
  date: '2021/06/22',
  location: 'Bentall Center',
  details: 'Technical interview'
})

user1.jobs[8].events.create!({
  title: 'HR Phone Call',
  date: '2021/07/02',
  location: 'https://us05web.zoom.us/j/89038259337?pwd=US9oS056M1lYb1l3aG5lT00zWEtOdz09',
  details: 'Phone call with Bill to discuss contract'
})

user1.jobs[9].events.create!({
  title: '3rd Round Interviews',
  date: '2021/06/25',
  location: 'Vancouver, BC',
  details: 'Whiteboard technical && HR'
})

user1.jobs[10].events.create!({
  title: 'Second Interview',
  date: '2021/06/22',
  location: 'https://us05web.zoom.us/j/89038259337?pwd=US9oS056M1lYb1l3aG5lT00zWEtOdz09',
  details: ''
})