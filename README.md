# Easily

**Easily** is a comprehensive job portal platform that helps users discover job opportunities and internships and allows recruiters to post and manage job openings. The platform provides an intuitive interface for both job seekers and recruiters, simplifying the process of job applications and recruitment.

## Features

### For Job Seekers:
- **Browse Jobs**: Users can browse through various job listings and filter by category, designation, location, and other criteria.
- **Apply for Jobs**: Job seekers can apply for positions directly by submitting their resume and contact details.
- **Responsive Design**: The platform is mobile-friendly, ensuring a smooth user experience across devices.

### For Recruiters:
- **Post Jobs**: Recruiters can create and publish job openings, specifying required skills, job category, designation, salary, and more.
- **Manage Jobs**: Edit, update, or delete job postings as needed.
- **Applications Dashboard**: View and manage all applications received for each job post.

## Main Technologies Used

### 1. **Multer**
   - **File Uploads**: Handles file uploads, allowing job seekers to submit resumes as PDFs when applying for a job. Multer ensures that files are correctly processed and stored on the server.
   
### 2. **Express Session**
   - **Session Management**: Express Session is used for session-based login and logout, enabling user authentication. It helps manage user sessions so recruiters remain logged in as they post and manage job listings.

### 3. **Resource-Based Authentication**
   - **Access Control**: Ensures that only the recruiter who posted a job has the permissions to edit or delete that job. This security measure restricts unauthorized actions by other users.

### 4. **Login/Logout Using Session-Based Approach**
   - **Session-Based Login**: The application implements login and logout functionality using session-based authentication, where users stay logged in until they manually log out. Sessions are stored securely using Express Session.
   
### 5. **Express Validator**
   - **Form Validation**: Uses `express-validator` for robust form validation on both login and registration pages. Ensures that user inputs such as email, password, and contact number meet specific criteria before processing.

## Project Structure

This application is built using Node.js and Express, following the MVC (Model-View-Controller) architecture for easy scalability and maintenance.

### Key Components

- **Models**: Define the structure of data (e.g., jobs, users) and handle interaction with the database.
- **Views**: EJS templates for rendering the frontend pages for users and recruiters.
- **Controllers**: Handle the business logic for different routes such as job listings, user registration, login, and job applications.

## Installation

1. Clone the repository:
   ```bash
   
   git clone https://github.com/sho4516/Easily.git

2. Navigate to the project directory:
    ```bash
    cd Easily

3. Install the required dependencies:
    ```bash
    npm install

4. Finally, start the development server:
    ```bash
    npm start

#### The application will now be running at http://localhost:3500


## Usage

### Registering as a Recruiter

1. Click **“I’m a recruiter”** on the homepage to register or log in.
2. After logging in, you will have access to the recruiter dashboard to post new jobs and manage existing ones.

### Job Seekers

1. Visit the **“Jobs”** page to view available job listings.
2. Apply for a job by clicking on a listing and submitting your contact information and resume.

### Validation and Error Handling

- **Input Validation:** The platform uses `express-validator` to validate user inputs for both login and registration forms, ensuring proper data before processing.
- **Session Management:** User login and session management are handled using `express-session`, ensuring only authenticated recruiters can post or manage jobs.
- **File Uploads:** Resume uploads are supported using `Multer`, and only PDF files are allowed for uploads.

## Author

Shobhit Goyal
