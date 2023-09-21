# Checkit

## Project Description

The Checkit web application is an interactive social media platform that closely resembles the popular website Reddit. This application enables users to engage with a variety of topics, create posts, and participate in discussions through comments.

### General Features:
* Topic-based Interactions: Users can explore and engage with various topics that interest them, initiating conversations and sharing content within specific categories.
* Post Creation and Interaction: The platform allows users to create posts within selected topics, promoting a community-driven environment where users can share their thoughts.
* Commenting System: Users can participate in discussions by leaving comments on posts, facilitating an interactive and engaging platform for meaningful conversations.
* Voting System:  Users can express their approval or disapproval by upvoting or downvoting posts and comments, influencing their visibility and ranking within the platform.

### Techical Features:
* State Management with Redux: Redux is implemented for efficient front-end state management, enabling seamless user authentication and management.
* Containerization with Docker: The application is containerized using Docker, ensuring compatibility across different systems and providing a standardized environment for deployment.

## Quickstart

After downloading and extracting the project folder, locate into the "frontend" and "backend" folders and run the following commands on the terminal:

```sh
npm install
```
Now add a .env file at the root of the "backend" folder with the following variables:

```sh
DATABASE_URL=yourdatabaseurlhere
PORT=yourporthere # NOTE: currently you must also change the "baseUrl" in frontend/src/services/* to match the port
SECRET="yoursecrethere" # NOTE: this is for password hashing and authentication
```

To run the app in a container using Docker, run the following command at the root of the project folder:
```sh
docker compose up --build
```
