# AI-Powered Job Match Platform

A full-stack application that uses AI to match job seekers with the most relevant job opportunities based on their skills, experience, and preferences.

## Features

- **User Authentication**: Sign up, login, and profile management
- **Job Listings**: Browse and search for job opportunities
- **AI-Powered Recommendations**: Get personalized job matches using Google's Gemini AI
- **Admin Panel**: Manage job listings (add, edit, delete)
- **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **AI Integration**: Google Gemini API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Google Gemini API key

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=your_nextauth_secret
\`\`\`

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app`: Next.js App Router pages and API routes
- `/components`: Reusable UI components
- `/contexts`: React context providers
- `/lib`: Utility functions and database connection

## AI Integration

The job recommendation system uses Google's Gemini AI to analyze user profiles and job listings to find the best matches. The integration works as follows:

1. User profile data (skills, experience, location, job type preference) is collected
2. Available job listings are retrieved from the database
3. A prompt is constructed that includes the user profile and job listings
4. The prompt is sent to the Gemini API, which analyzes the data and returns the top matches
5. The matches are processed and displayed to the user

### Prompt Structure

The prompt sent to Gemini AI is structured as follows:

\`\`\`
I need to match a job seeker with the most suitable jobs based on their profile and available job listings.

Job Seeker Profile:
- Name: [user.name]
- Location: [user.location]
- Years of Experience: [user.yearsOfExperience]
- Skills: [user.skills]
- Preferred Job Type: [user.preferredJobType]

Available Jobs:
[List of jobs with title, company, location, job type, skills, and description]

Please analyze the job seeker's profile and the available jobs, then recommend the top 3 most suitable jobs for this candidate.
For each recommendation, provide:
1. The job number (as listed above)
2. A match score from 0-100
3. A brief explanation of why this job is a good match

Format your response as a JSON array with this structure:
[
  {
    "jobIndex": 1,
    "matchScore": 85,
    "matchReason": "Strong skill match in JavaScript and React, preferred remote work available"
  },
  ...
]
\`\`\`

## Admin Setup

To create an admin user:

1. Register a new user through the application
2. Connect to your MongoDB database
3. Update the user's role to "admin":
   \`\`\`
   db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
   \`\`\`

## Deployment

This project can be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Set up the environment variables
4. Deploy

## License

This project is licensed under the MIT License.
\`\`\`

Let's also create a seed script to populate the database with some initial job data:
