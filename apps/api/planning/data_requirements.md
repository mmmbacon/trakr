# MVP

## User
  email
  first name
  last name
  password

## Job
  title
  company
  description
  status

  offer
  salary
  url
  location
  application_document[] - pdf
  user_id
  contact_name
  contact_email
  contact_phone
  contact_socialmedia

## Event
  date
  title  -ie Interview, Follow Up
  description
  location
  notify?
  job_id


----------------------------------------
# STRETCH

## Notification
  status
  description
  type

## Contact
  name
  email
  social_media
  
## Document
  title mandatory
  file optional -> reference to a datastore on server
  url optional
  job_id