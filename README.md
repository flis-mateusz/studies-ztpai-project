# ZwierzakSzukaDomu

Welcome to "ZwierzakSzukaDomu" - a dedicated platform for pet adoption. This service focuses on providing a comprehensive list of pet adoption announcements. Here, you'll find a variety of animals, each with its own unique story, eagerly waiting to find new, loving homes. We believe that every animal deserves a chance for a happy life, and we're confident that you'll find a lifelong friend here.


# Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Database Design and Structure](#database-design-and-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)


## Features

- **Browse Announcements:** Explore a wide range of pet adoption listings.
- **Detailed Pet Profiles:** Each pet comes with a detailed profile including its background, personality traits, and needs.
- **Advanced Search:** Filter searches based on animal type, features, and location to find your perfect match.
- **User Accounts:** Create your account to post adoption announcements or to interact with existing listings.
- **Responsive Design:** Platform is fully responsive, making it easy to navigate on various devices.


## Technology Stack

Project is built using a variety of technologies and tools to ensure efficiency, performance, and scalability. Below is a list of the key components:

1. **Front-End:**
    - React.JS, CSS, JavaScript: For structuring, styling, and client-side logic.

2. **Back-End:**
    - PHP 8.3 - Symfony 7: Primary server-side programming language.
    - MySQL: Database management system.

3. **Server:**
    - Apache: High-performance web server.

4. **Containerization:**
    - Docker: For creating, deploying, and running applications in containers.
    - Docker Compose: For defining and running multi-container Docker applications.

5. **Version Control:**
    - Git: For source code management.
    - GitHub: For hosting the repository and facilitating version control and collaboration.


## Database Design and Structure

The project includes a comprehensive design and structure for the database, ensuring efficient data storage and retrieval. Here are the key components:

1. **Entity-Relationship Diagram (ERD):**
    - The `/backend/database_erd.png` file in the main directory provides a visual representation of the database schema. This diagram is useful for understanding the relationships between different entities in the database.
    - [View ERD](./backend/database_erd.png)

## Installation

Project is dockerized for easy setup and deployment. Follow these steps to get the project up and running:

1. **Clone the Repository**
2. **Navigate to the Project Directory**
3. **Docker Setup:**
   Ensure Docker and Docker Compose are installed on your system. In the project directory, you'll find Docker configuration files in the `docker/db`, `docker/nginx`, and `docker/php` directories, along with a `Dockerfile` in each.
4. **Build Docker Images:**
   `docker-compose build`
5. **Start Docker Containers:**
   `docker-compose up`
6. **Access the Application:**
   After the containers are up and running, you can access the application through your web browser.

## Usage
### Home Page
The home page showcases the latest announcements and provides links to key functionalities of the site such as browsing all announcements, logging in, registering.
Desktop | Mobile
:-------------------------:|:-------------------------:
![Home page](demo_images/image-8.png)  |  ![Home mobile page](demo_images/image-8m.jpg)

### All Announcements View
This page allows users to browse all available pets for adoption, with filtering options to help find the perfect pet.
Desktop | Mobile
:-------------------------:|:-------------------------:
![All Announcements View](demo_images/image-9.png) | ![All Announcements View](demo_images/image-9m.jpg)

### Announcement View
This detailed view allows users to see full information about the pet, including photos, descriptions, location, and contact details of the person who posted the announcement.
Desktop | Mobile
:-------------------------:|:-------------------------:
![Announcement View](demo_images/image.png) | ![Announcement View](demo_images/image-m.jpg)

### Login and Registration View
These pages allow users to create and manage their accounts, which is necessary for posting announcements and using features that require authorization.
Desktop | Mobile
:-------------------------:|:-------------------------:
![Login and Registration View](demo_images/image-1.png) | ![Login and Registration View](demo_images/image-1m.jpg)

### Profile View
The profile view lets users manage their personal information, password and avatar.
Desktop | Mobile
:-------------------------:|:-------------------------:
![Profile View](demo_images/image-2.png) | ![Profile View](demo_images/image-2m.jpg)

### My Announcements View
Here, users can view their own announcements.
Desktop | Mobile
:-------------------------:|:-------------------------:
![My Announcements View](demo_images/image-3.png) | ![My Announcements View](demo_images/image-3m.jpg)

### Announcements for Admin Approval View
Available only to administrators, this view allows the review, approval, or rejection of new announcements before they are published.
Desktop | Mobile
:-------------------------:|:-------------------------:
![Announcements for Admin Approval View](demo_images/image-4.png) | ![Announcements for Admin Approval View](demo_images/image-4m.jpg)

### Reports View
Also available only to administrators, this section allows for the review and management of user reports, such as violations of the rules.
Desktop | Mobile
:-------------------------:|:-------------------------:
![Reports View](demo_images/image-5.png) | ![Reports View](demo_images/image-5m.jpg)


## Contributing
I am always looking to improve "ZwierzakSzukaDomu" and appreciate any feedback or contributions. If you would like to contribute, please feel free to fork the repository and submit a pull request.


## License

This project is licensed under the MIT License

