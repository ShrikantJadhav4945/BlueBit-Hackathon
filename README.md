Job & Internship Aggregator

Overview

Finding jobs and internships across multiple platforms like LinkedIn, Wellfound, and Indeed can be time-consuming. This project aims to simplify the process by gathering all job listings in one place using APIs. Users can search, filter, and apply for jobs easily, saving time and effort.

Features

Job Listings in One Place: Aggregates job postings from different platforms using APIs.

Search & Filter: Find jobs based on location, category, experience level, and company.

User-Friendly Interface: A simple and clean layout to view job details and apply quickly.

Role-Based Job Listing: Uses Google APIs to categorize and list jobs based on user roles (e.g., Developer, Designer, Analyst).

Automation: Some job applications can be automated to speed up the process.

Tech Stack

Frontend:

HTML, CSS, JavaScript: To build a responsive and interactive website.

Backend:

Node.js & Express.js: To handle data and server operations.

Google APIs: Used for authentication and role-based job categorization.

Third-Party Job APIs: Fetches job listings directly from job platforms.

Database:

MongoDB: Stores job listings and user preferences.

How Role-Based Job Listing Works

Fetching Job Data:

The system connects to job APIs from platforms like LinkedIn, Wellfound, and Indeed.

Extracts details like job title, company, location, and application link.

Categorization Using Google APIs:

Google APIs analyze job descriptions.

Assigns jobs to relevant categories based on keywords and roles.

Helps users find jobs tailored to their profession easily.

User Dashboard:

Users can select their preferred job roles.

Personalized job recommendations based on selected roles.

Redirects users to the original job application page.

How to Set Up

Clone the project

git clone https://github.com/your-username/PS7-Job-Aggregator.git
cd PS7-Job-Aggregator

Install dependencies

npm install

Set up environment variables

Create a .env file and add required API keys and database credentials.

Run the application

npm start

How to Contribute

Fork the repository.

Create a new branch for your changes.

Make your improvements.

Submit a pull request!

License

This project is open-source under the MIT License.
