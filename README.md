# Log Ingestion and Querying System

A full-stack application for ingesting and querying logs, built with Node.js, Express, TypeScript, Next.js, Shadcn UI, and Formik. This project fulfills the requirements of the Full-Stack Developer Assessment, providing a backend API for log ingestion and querying, and a frontend interface for submitting and filtering logs.

## Project Structure

log-ingestion-system/├── backend/ # Node.js/Express/TypeScript backend├── frontend/ # Next.js/TypeScript frontend└── README.md # Project documentation

## Prerequisites

- **Node.js**: v18 or higher
- **Git**: For cloning the repository
- **NPM**: For installing dependencies

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   cd log_ingestion_be

Install dependencies:npm install

Run the backend in development mode (with auto-restart using Nodemon):npm start

The backend will run on http://localhost:3001.

Frontend

Navigate to the frontend directory:cd log_ingestion_fe

Install dependencies:npm install

Run the frontend in development mode:npm run dev

The frontend will run on http://localhost:3000.

Testing the Application

Open http://localhost:3000 in a browser.
Use the "Add New Log" form to submit a log entry (e.g., set level to "error" and message to "Test error").
Verify the log appears in the table (clear filters if needed).
Use the filter inputs to search logs by level, message, resource ID, or timestamp range.
Test the backend API directly using a tool like Postman:curl -X POST http://localhost:3001/logs \
-H "Content-Type: application/json" \
-d '{
"level": "error",
"message": "Test error",
"resourceId": "server-123",
"traceId": "trace-456",
"spanId": "span-789",
"commit": "abc123",
"metadata": { "parentResourceId": "parent-123" }
}'

Design Decisions

Node.js/Express with TypeScript: Provides a robust backend with type safety, ensuring reliable API endpoints (POST /logs and GET /logs).
Next.js App Router: Used for the frontend to enable modern routing and server-side rendering for fast initial loads.
Shadcn UI with Tailwind CSS: Provides accessible, customizable components for a clean, professional UI, inspired by tools like Grafana Loki.
Custom Hooks (useLogs and useCreateLog): Encapsulate API logic for querying and ingesting logs, improving separation of concerns and reusability.
Nodemon: Added for development to auto-restart the backend on code changes, enhancing productivity.
TypeScript: Ensures type safety across both frontend and backend, reducing runtime errors.
Log Ingestion UI: Added a form to submit logs via the frontend, making the POST /logs endpoint testable without external tools.

Trade-offs

No Debouncing: Removed debouncing for the message search input to simplify the codebase, resulting in immediate API calls on input change, which may increase server load for rapid typing.
Custom Hooks: The useLogs and useCreateLog hooks add slight complexity but improve maintainability compared to inline useEffect.
Desktop Focus: Full mobile responsiveness was not implemented, as the requirement prioritizes desktop browsers.
Log Refresh Strategy: After submitting a log, the table refreshes by resetting the message filter, which may not show the new log if filters are restrictive.

Bonus Features

Log Ingestion UI: A form to submit logs via the frontend, enhancing testability and usability.
Clear Filters Button: Allows users to reset all filters easily.
Loading and Error States: Added for both log querying and ingestion to improve user feedback.
Nodemon: Auto-restarts the backend during development for faster iteration.

Known Limitations

Rapid typing in the message filter may cause frequent API calls due to the removal of debouncing.
The log ingestion UI does not include a timestamp input, as the backend sets it automatically.
Pagination is not implemented, which could be useful for large log datasets.

Future Improvements

Add pagination or infinite scrolling for the log table.
Implement a toast notification for successful log submissions using Shadcn UI’s Toast component.
Add multi-select for log levels in the filter section.
Reintroduce debouncing for the message filter if performance becomes an issue.

Submission
This project is hosted in a GitHub repository https://github.com/Ahmad7420/evallo. All requirements from the Full-Stack Developer Assessment are met, with additional features for enhanced usability.
