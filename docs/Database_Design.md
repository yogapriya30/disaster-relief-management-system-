# Database Design

## Project Name
AI-Powered Disaster Relief Management System

## Database Type
PostgreSQL

## Main Entities

1. User
2. Disaster
3. Volunteer
4. Resource
5. Relief Camp
6. Task
7. Notification

## Relationships

- One User can create many Disaster Reports.
- One Disaster can have many Resources.
- One Disaster can have many Relief Camps.
- One Volunteer can be assigned to many Tasks.
- One Task belongs to one Disaster.
- Notifications are sent to Users and Volunteers.