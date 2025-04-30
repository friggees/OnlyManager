# Team Development Plan (Backend Focus) - 2025-04-30

This document outlines the development plan focusing on backend implementation while the frontend components are being built separately.

## Development Approach

*   **Parallel Development:** Frontend (UI/UX, component layout) will be built by a team member, while backend logic (APIs, database, RLS) will be implemented concurrently.
*   **API Contracts:** Clear definitions for API endpoints (URL, method, request/response bodies, parameters) are crucial for successful integration. These should be documented as they are built.
*   **Backend Priorities:** Focus on creating the necessary database structures, Row Level Security (RLS) policies, API routes (in Next.js), and PostgreSQL RPC functions required by the planned frontend features.

## Backend Implementation Plan

### 1. Complete Employee Management Backend (Phase 2)

*   **Implement Delete/Disable Employee API:**
    *   **Task:** Create an API route (e.g., `/api/admin/update-employee-status/[id]`) using the `PUT` or `PATCH` method.
    *   **Logic:** Update the `status` field in the `public.profiles` table to 'inactive' for the given `[id]`.
    *   **RLS:** Ensure only authorized roles (e.g., Admin, Owner) can perform this action.
    *   **API Contract:** Define expected request (likely none needed beyond ID in URL) and response (success/error message).
*   **(Optional Backend) Contract Download Logic:**
    *   **Task:** Design and implement a secure way to download files from the `contracts` bucket in Supabase Storage.
    *   **Options:** Could be an API route that fetches the file and streams it, or logic to generate secure, time-limited signed URLs for direct download.
    *   **API Contract:** Define the endpoint/method and response (file stream or signed URL).

### 2. Implement Scheduling Backend (Phase 3)

*   **Finalize `schedules` Table Schema:**
    *   **Task:** Define and create/update the `schedules` table in Supabase based on project requirements (referencing `projekt_info.md`, etc.). Include necessary columns (e.g., `user_id`, `start_time`, `end_time`, `title`, `description`, `created_at`, etc.).
*   **Implement `schedules` RLS Policies:**
    *   **Task:** Create and test RLS policies for the `schedules` table based on `roller_behörigheter.md`.
    *   **Examples:**
        *   Users can view/edit/delete their own schedule entries.
        *   Managers can view team members' schedule entries.
        *   Admins/Owners can view/manage all entries.
*   **Create Schedule API Routes/RPCs:**
    *   **Task:** Build backend endpoints/functions for CRUD (Create, Read, Update, Delete) operations on schedules.
    *   **Endpoints/Functions:**
        *   `GET /api/schedules` (or RPC `get_my_schedule`): Fetch schedules for the logged-in user (respecting RLS). Consider parameters for date ranges.
        *   `GET /api/team-schedules` (or RPC `get_team_schedule`): Fetch schedules for a manager's team (respecting RLS).
        *   `POST /api/schedules`: Create a new schedule entry.
        *   `PUT /api/schedules/[schedule_id]`: Update an existing schedule entry.
        *   `DELETE /api/schedules/[schedule_id]`: Delete a schedule entry.
    *   **API Contracts:** Define request/response structures for each operation.

### 3. Continue with Other Backend Features

*   **Task:** Systematically work through the features outlined in the project's `.md` specification files (e.g., To-Do Lists, Messaging, Finances, Education Material).
*   **Process:** For each feature:
    1.  Define necessary database tables/columns/views/RPCs.
    2.  Implement corresponding RLS policies.
    3.  Create necessary Next.js API routes.
    4.  Document the API contracts.

## Communication & Integration

*   Regularly update `work_summary.md` with backend progress.
*   Maintain clear documentation of API endpoints for the frontend developer.
*   Coordinate on data structures needed by the frontend views.
