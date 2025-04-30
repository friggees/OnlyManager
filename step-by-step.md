# OnlyManager Platform - Step-by-Step Development Guide (AI-Friendly)

This document outlines the step-by-step process for building the OnlyManager platform using Next.js, Supabase, Tailwind CSS, and shadcn/ui. Refer to `projekt_info.md`, `roller_behörigheter.md`, `main_functions.md`, and `roll_funktioner.md` for detailed feature specifications and permissions.

**Target Audience:** AI Development Assistant (e.g., Cline in ACT MODE)

**Core Technologies:**
*   Frontend: Next.js (App Router, TypeScript)
*   Backend/DB: Supabase (PostgreSQL, Auth, Storage, Realtime, RLS)
*   Styling: Tailwind CSS
*   UI Components: shadcn/ui

---

## Phase 0: Project Setup & Configuration

1.  **Create Supabase Project:**
    *   Action: Manually create a new project on supabase.com.
    *   Output: Obtain Project URL, `anon` key, `service_role` key.
2.  **Initialize Next.js Project:**
    *   Command: `npx create-next-app@latest onlymanager-portal --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"` (Adjust name if needed).
    *   Directory: Execute in the parent directory (`c:/Projects/`).
3.  **Install Dependencies:**
    *   Command: `cd onlymanager-portal && npm install @supabase/supabase-js`
4.  **Initialize shadcn/ui:**
    *   Command: `npx shadcn-ui@latest init` (Follow prompts, configure `globals.css`, `tailwind.config.js`, components alias `@/components`).
5.  **Configure Environment Variables:**
    *   Action: Create `onlymanager-portal/.env.local`.
    *   Content:
        ```
        NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
        ```
    *   Git: Ensure `.env.local` is added to `.gitignore`.
6.  **Setup Supabase Client Helpers:**
    *   Action: Create `src/lib/supabase/client.ts` for client-side usage (using `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
    *   Action: Create `src/lib/supabase/server.ts` for server-side usage (Server Components, API Routes - potentially using `SUPABASE_SERVICE_ROLE_KEY` cautiously).
    *   Action: Create `src/lib/supabase/middleware.ts` for auth handling in Next.js middleware.
7.  **Setup Git Repository:**
    *   Action: Initialize Git, create initial commit, setup remote repository (e.g., GitHub).

---

## Phase 1: Authentication & Basic Layout

1.  **Define User Roles Table:**
    *   Supabase SQL: Create a `roles` table (`id`, `role_name`). Populate with roles: `Owner`, `Admin`, `Manager`, `Chatting Manager`, `Chattare`, `Model`, `Virtual Assistant`.
2.  **Define Profiles Table:**
    *   Supabase SQL: Create a `profiles` table linked to `auth.users` (`id` referencing `auth.users.id`, `role_id` referencing `roles.id`, `full_name`, `telegram_username`, `other_info`, etc.).
    *   RLS: Enable RLS. Policy: Users can view their own profile. Policy: Admins/Owners can view all profiles.
3.  **Implement User Signup:**
    *   Next.js: Create signup page (`/signup`).
    *   UI: Use shadcn/ui components (`Input`, `Button`, `Label`, `Card`).
    *   Logic: Use Supabase client (`supabase.auth.signUp`). On successful signup, potentially create a corresponding entry in the `profiles` table (consider using a Supabase Function triggered on `auth.users` insert for this). Assign a default role (e.g., 'Chattare') or require Admin/Owner approval/assignment.
4.  **Implement User Login:**
    *   Next.js: Create login page (`/login`).
    *   UI: Use shadcn/ui components.
    *   Logic: Use Supabase client (`supabase.auth.signInWithPassword`). Handle errors.
5.  **Implement User Logout:**
    *   Next.js: Add logout button (e.g., in a user dropdown).
    *   Logic: Use Supabase client (`supabase.auth.signOut`). Redirect to login page.
6.  **Implement Password Reset:**
    *   Next.js: Create password reset request page (`/forgot-password`) and update password page (`/update-password`).
    *   Logic: Use `supabase.auth.resetPasswordForEmail` and `supabase.auth.updateUser`.
7.  **Setup Middleware for Protected Routes:**
    *   Next.js: Create `src/middleware.ts`.
    *   Logic: Use `@supabase/auth-helpers-nextjs` `createMiddlewareClient` to check user session. Redirect unauthenticated users from protected routes (e.g., `/dashboard/*`) to `/login`.
8.  **Create Basic Dashboard Layout:**
    *   Next.js: Create layout file (`src/app/dashboard/layout.tsx`).
    *   UI: Include a sidebar for navigation and a main content area. Use shadcn/ui layout components. Fetch logged-in user's profile/role to conditionally render sidebar items based on permissions (start simple, refine later).

---

## Phase 2: Core Feature - Employee Management (Admin/Owner)

*Reference: `admin_owner_funktioner/Hantering_av_anställda.md`, `roller_behörigheter.md`*

1.  **Refine `profiles` Table:**
    *   Supabase SQL: Add columns for `salary_info`, `deduction_rules`, `contract_storage_path`, etc. Ensure data types are appropriate.
2.  **Implement Employee List View:**
    *   Next.js: Create page (`/dashboard/employees`).
    *   UI: Use shadcn/ui `Table` component to display employees (from `profiles` table). Include columns for name, role, email (from `auth.users`), etc. Add filtering/sorting if needed.
    *   Logic: Fetch data using Supabase client. Apply RLS (Only Owner/Admin see this page).
3.  **Implement Add Employee Functionality:**
    *   Next.js: Create page/modal for adding employees.
    *   UI: Use shadcn/ui `Dialog`, `Form`, `Input`, `Select` (for role).
    *   Logic:
        *   Option 1 (Invite): Use `supabase.auth.admin.inviteUserByEmail`. Requires setting up email templates in Supabase. User sets their own password.
        *   Option 2 (Create Directly): Use `supabase.auth.admin.createUser`. Requires setting an initial password and potentially forcing the user to change it on first login.
        *   After user creation in `auth.users`, insert corresponding data into `profiles` table including the selected `role_id`.
    *   Permissions: Only Owner/Admin can access.
4.  **Implement Edit Employee Functionality:**
    *   Next.js: Create page/modal for editing employee details.
    *   UI: Similar to Add Employee form, pre-filled with existing data. Allow editing fields like `full_name`, `role_id`, `salary_info`, `telegram_username`, `other_info`.
    *   Logic: Fetch profile data. Use Supabase client to `update` the `profiles` table. Use `supabase.auth.admin.updateUserById` for auth-related changes if needed (e.g., email).
    *   Permissions: Owner/Admin can edit most fields. Define specific RLS if Admins cannot edit Owners.
5.  **Implement Contract Upload:**
    *   Supabase: Create a Storage bucket (e.g., `contracts`) with appropriate access policies (e.g., authenticated users can upload, specific roles can download based on profile ID).
    *   Next.js: Add file input to Edit Employee form.
    *   Logic: Use Supabase client (`storage.from('contracts').upload(...)`). Store the returned file path in the `profiles.contract_storage_path` column. Add functionality to view/download the contract.
6.  **Implement Delete/Disable Employee:**
    *   Logic: Use `supabase.auth.admin.deleteUser` (careful, this is permanent). Consider adding a `status` column (`active`/`inactive`) to `profiles` for soft deletes instead. Update RLS policies to filter out inactive users where appropriate.
    *   Permissions: Owner/Admin only.

---

## Phase 3: Core Feature - Scheduling

*Reference: `admin_owner_funktioner/Schemahantering.md`, `gemensamma_funktioner/Visa_Schema.md`*

1.  **Define `schedules` Table:**
    *   Supabase SQL: Create `schedules` table (`id`, `user_id` referencing `profiles.id`, `start_time`, `end_time`, `date`, `type` (e.g., 'work', 'leave'), `notes`).
    *   RLS: Enable RLS.
        *   Policy: Users can view their own schedule entries.
        *   Policy: Managers can view schedule entries for users in their team (requires team structure - see Phase 8).
        *   Policy: Admins/Owners can view all schedule entries.
        *   Policy: Users cannot edit past schedule entries (optional).
        *   Policy: Define who can create/edit/delete entries (Users for their own? Managers for team? Admin/Owner for all?). Match `roller_behörigheter.md`.
2.  **Implement Schedule View (Personal):**
    *   Next.js: Create page (`/dashboard/schedule`).
    *   UI: Use a calendar component library (e.g., `react-big-calendar`, `fullcalendar-react`) integrated with shadcn/ui styling.
    *   Logic: Fetch schedule entries for the logged-in user from Supabase. Display events on the calendar. Show relevant timezones.
3.  **Implement Schedule View (Admin/Manager):**
    *   Next.js: Enhance `/dashboard/schedule` or create a separate page (`/dashboard/team-schedule`).
    *   UI: Add a user selector (dropdown) for Admins/Owners/Managers to view schedules for others based on their permissions.
    *   Logic: Fetch schedule data based on selected user ID, respecting RLS.
4.  **Implement Add/Edit Schedule Entry:**
    *   Next.js: Add functionality to the calendar view (e.g., click on a date/time slot, or an "Add Entry" button).
    *   UI: Use shadcn/ui `Dialog` or `Popover` with a form (`DatePicker`, `TimeInput`, `Select` for type, `Textarea` for notes).
    *   Logic: Use Supabase client to `insert` or `update` entries in the `schedules` table. Ensure RLS policies allow the action based on the user's role and who the schedule entry belongs to.

---

## Phase 4: Core Feature - To-Do Lists

*Reference: `gemensamma_funktioner/Min_ToDo_Lista.md`, `admin_owner_funktioner/Hantering_av_To-Do-listor.md`*

1.  **Define `todos` Table:**
    *   Supabase SQL: Create `todos` table (`id`, `user_id` referencing `profiles.id`, `assigned_by_user_id` (nullable, referencing `profiles.id`), `task_description`, `is_urgent`, `status` ('pending', 'in_progress', 'done'), `due_date` (nullable), `created_at`).
    *   RLS: Enable RLS.
        *   Policy: Users can view their own todos.
        *   Policy: Users can create todos for themselves (`user_id` = own id, `assigned_by_user_id` = null).
        *   Policy: Users can update the `status` of their own todos.
        *   Policy: Managers can view todos for their team members.
        *   Policy: Managers/Admins/Owners can create todos assigned to others (`user_id` = target user, `assigned_by_user_id` = assigner's id).
        *   Policy: Define who can edit/delete assigned todos (e.g., only the assigner or higher roles). Match `roller_behörigheter.md`.
2.  **Implement Personal To-Do View:**
    *   Next.js: Create page (`/dashboard/todos`) or integrate into the main dashboard view.
    *   UI: Use shadcn/ui `Card`, `Checkbox`, `Badge` (for urgent/status), `Button` (for add/edit). Display list of todos for the logged-in user. Allow filtering/sorting.
    *   Logic: Fetch todos for the logged-in user. Implement status updates (checkbox click -> update Supabase).
3.  **Implement Add/Edit Personal To-Do:**
    *   UI: Add button/form using shadcn/ui `Dialog` (`Input` for task, `Checkbox` for urgent, `DatePicker` for due date).
    *   Logic: `insert` or `update` user's own todos in Supabase.
4.  **Implement Assign To-Do (Manager/Admin/Owner):**
    *   Next.js: Enhance `/dashboard/employees` view or create a dedicated assignment UI.
    *   UI: Add button "Assign Task" on employee list/profile. Form includes user selector (if assigning from a general page) and task details.
    *   Logic: `insert` todo into Supabase, setting `user_id` to the target employee and `assigned_by_user_id` to the logged-in manager/admin/owner. RLS must permit this.
5.  **Implement Notifications (Optional - Phase X):**
    *   Logic: Use Supabase Realtime or Edge Functions to trigger notifications (in-app or push) when tasks are assigned or due.

---

## Phase 5: Core Feature - Files & Education / Secure Notes

*Reference: `admin_owner_funktioner/Utbildningsmaterial.md`, `admin_owner_funktioner/Säker_Anteckningshantering.md`, `gemensamma_funktioner/Visa_Delat_Innehåll.md`*

1.  **Define `education_pages` Table:**
    *   Supabase SQL: Create `education_pages` table (`id`, `title`, `content` (JSONB for Notion-like structure), `created_by` referencing `profiles.id`, `created_at`, `updated_at`).
2.  **Define `secure_notes` Table:**
    *   Supabase SQL: Create `secure_notes` table (`id`, `title`, `data` (JSONB for spreadsheet-like structure), `created_by` referencing `profiles.id`, `pin_required` (boolean), `pin_hash` (nullable, text), `created_at`, `updated_at`).
3.  **Define Sharing/Permissions Table:**
    *   Supabase SQL: Create `shared_content` table (`id`, `content_type` ('education', 'note'), `content_id` (referencing `education_pages.id` or `secure_notes.id`), `shared_with_user_id` (nullable, referencing `profiles.id`), `shared_with_role_id` (nullable, referencing `roles.id`), `shared_by_user_id` referencing `profiles.id`).
    *   RLS: Enable RLS on `education_pages`, `secure_notes`, `shared_content`.
        *   Policy (`education_pages`/`secure_notes`): Admins/Owners can create/edit/delete. Others can view only if an entry exists in `shared_content` linking the content to their `user_id` or `role_id`.
        *   Policy (`shared_content`): Admins/Owners can create/delete sharing entries.
4.  **Implement Education Editor (Admin/Owner):**
    *   Next.js: Create page (`/dashboard/education/edit/[id]`).
    *   UI: Use a rich text editor library compatible with React/Next.js that outputs JSON (e.g., TipTap, Editor.js, or build a simpler custom one with shadcn/ui components). Allow adding text, headings, images, videos, callouts. Implement drag-and-drop grid layout if feasible.
    *   Logic: Save page `content` (JSONB) to `education_pages` table. Handle image/video uploads to a Supabase Storage bucket (`education_assets`).
5.  **Implement Secure Notes Editor (Admin/Owner):**
    *   Next.js: Create page (`/dashboard/notes/edit/[id]`).
    *   UI: Use a table component (shadcn/ui `Table` or a dedicated library like `react-table`) allowing dynamic column/row adding/editing. Add PIN configuration.
    *   Logic: Save table `data` (JSONB) to `secure_notes` table. Handle PIN hashing securely (e.g., using an Edge Function or client-side hashing before sending - research best practices).
6.  **Implement Sharing Interface (Admin/Owner):**
    *   Next.js: Add "Share" button/modal to Education/Notes editor/list views.
    *   UI: Allow selecting users or roles to share with.
    *   Logic: Create entries in the `shared_content` table.
7.  **Implement Content Viewer (All Roles):**
    *   Next.js: Create page (`/dashboard/files-education`).
    *   Logic: Fetch `shared_content` entries for the logged-in user's ID and role ID. Based on `content_type` and `content_id`, fetch the corresponding `education_pages` or `secure_notes`.
    *   UI: Render education pages based on saved JSONB structure. Render secure notes tables. Implement PIN prompt for protected notes. Ensure read-only view.

---

## Phase 6: Core Feature - Document Signing

*Reference: `gemensamma_funktioner/Signera_Dokument.md`, `admin_owner_funktioner/Signaturer.md`*

1.  **Define `documents_for_signing` Table:**
    *   Supabase SQL: Create `documents_for_signing` table (`id`, `file_storage_path`, `uploaded_by` referencing `profiles.id`, `assigned_to_user_id` referencing `profiles.id`, `status` ('pending', 'signed_by_assignee', 'signed_by_uploader', 'completed'), `assignee_signature_data` (JSONB or text), `uploader_signature_data` (JSONB or text), `signed_at` (timestamp)).
    *   RLS: Enable RLS.
        *   Policy: Uploader and Assignee can view the document entry.
        *   Policy: Admins/Owners can view all entries.
        *   Policy: Assignee can update `assignee_signature_data` and `status` (if pending).
        *   Policy: Uploader can update `uploader_signature_data` and `status` (if signed_by_assignee).
        *   Policy: Define who can create entries (Admin/Owner).
2.  **Implement Document Upload (Admin/Owner):**
    *   Next.js: Create page (`/dashboard/signatures/upload`).
    *   UI: File input for PDF, user selector for assignee.
    *   Logic: Upload PDF to Supabase Storage (`signatures` bucket). Create entry in `documents_for_signing` table, linking the file path and assignee.
3.  **Implement Document Signing View:**
    *   Next.js: Create page (`/dashboard/signatures/[id]`).
    *   UI: Display the PDF (using a library like `react-pdf`). Provide a canvas area for drawing signatures (using a library like `react-signature-canvas`). Add text input fields if needed (overlay on PDF). Show buttons "Sign and Submit".
    *   Logic: Fetch document entry. Load PDF. If the current user is the assignee and status is 'pending', enable assignee signature canvas. If the current user is the uploader and status is 'signed_by_assignee', enable uploader signature canvas. On submit, save signature data (e.g., base64 image) to the corresponding column and update status. If both have signed, update status to 'completed'.
4.  **Implement Signatures List View:**
    *   Next.js: Create page (`/dashboard/signatures`).
    *   UI: List documents requiring the user's signature and documents they have uploaded/signed. Show status. Link to the signing view.
    *   Logic: Fetch relevant entries from `documents_for_signing` based on user ID and role, respecting RLS.

---

## Phase 7: Core Feature - Economy & Statistics

*Reference: `owner_only_funktioner/Ekonomihantering.md`, `owner_only_funktioner/Statistik.md`, `owner_only_funktioner/Statistikkalkyler.md`, `chattare_funktioner/Registrera_Sälj.md`, `modell_funktioner/Intäktsöversikt.md`*

1.  **Define `transactions` Table:**
    *   Supabase SQL: Create `transactions` table (`id`, `type` ('income', 'expense'), `amount`, `currency`, `description`, `source` (text), `user_id` (nullable, referencing `profiles.id`, e.g., for chatter sales), `model_id` (nullable, referencing `profiles.id`, if sale linked to model), `transaction_date`, `is_recurring` (boolean, for expenses), `created_by` referencing `profiles.id`).
    *   RLS: Enable RLS. Define policies based on roles (Owner/Admin see all, Chatters see/add their sales, Models see income linked to them, etc.). Match `roller_behörigheter.md`.
2.  **Implement Add Income/Expense (Owner/Admin):**
    *   Next.js: Create page (`/dashboard/economy`).
    *   UI: Forms for adding income and expenses using shadcn/ui components.
    *   Logic: Insert data into `transactions` table.
3.  **Implement Register Sale (Chattare, Model, Manager, Admin, Owner):**
    *   Next.js: Create dedicated page (`/dashboard/register-sale`) or integrate into relevant dashboards.
    *   UI: Simple form: Amount, Model selector (if applicable), Date.
    *   Logic: Insert 'income' transaction into `transactions` table, linking `user_id` (who registered) and `model_id` (if applicable). RLS must permit based on role.
4.  **Implement Economy Overview (Owner/Admin):**
    *   Next.js: Enhance `/dashboard/economy`.
    *   UI: Display table of transactions. Show summary totals (total income, total expense, profit/loss). Add date filtering. Use shadcn/ui `Table`, `DatePicker`.
    *   Logic: Fetch data from `transactions` table, perform calculations.
5.  **Implement Statistics View (Owner/Admin):**
    *   Next.js: Create page (`/dashboard/statistics`).
    *   UI: Use charting libraries (e.g., Recharts, Chart.js wrapper) integrated with shadcn/ui. Display charts for income/expense trends, profit over time. Add filters (date range). Include options for fee calculations.
    *   Logic: Fetch aggregated data from `transactions` (potentially using Supabase database functions for complex aggregations).
6.  **Implement Personal Income View (Chattare/Model):**
    *   Next.js: Add section to their dashboards or create specific pages.
    *   UI: Display list/summary of income attributed to them (Chatter's registered sales, Model's linked income).
    *   Logic: Fetch relevant data from `transactions` based on `user_id` or `model_id`, respecting RLS.

---

## Phase 8: Role-Specific Features & Dashboards

1.  **Define Team Structure (if needed for Managers):**
    *   Supabase SQL: Consider how to represent teams. Could be a `teams` table and a `team_members` join table, or a `manager_id` column on the `profiles` table.
    *   RLS: Update RLS policies on `profiles`, `schedules`, `todos` etc. to allow Managers access based on team membership.
2.  **Implement Role-Based Dashboards:**
    *   Next.js: Create specific dashboard pages for each role (e.g., `src/app/dashboard/chatter/page.tsx`, `src/app/dashboard/model/page.tsx`).
    *   UI: Customize each dashboard to show the most relevant information and actions for that role, using shadcn/ui components. Reuse components built in previous phases. Refer to `dashboards/*.md` files for specific content ideas.
    *   Logic: Fetch data relevant to the role, respecting RLS. Conditionally render components/sections based on fetched data and role.
3.  **Implement Chatting Manager Features:**
    *   UI: Team performance view (aggregated sales from `transactions`), Team messages (see Phase 9).
    *   Logic: Fetch and aggregate data for their team members.
4.  **Implement Model Features:**
    *   UI: Income overview, Personal schedule view, View assigned education/notes, View content plan (if implemented as part of Education/Notes).
5.  **Implement Chattare Features:**
    *   UI: Register Sale form, Personal income/commission view, Personal schedule, Personal To-Do, Check-in/out (see Phase 10).
6.  **Implement Virtual Assistant Features:**
    *   UI: Primarily viewing information: Schedule, To-Do, Education/Notes, Pay info (requires salary calculation logic). Check-in/out (see Phase 10).
7.  **Implement Owner/Admin Only Features:**
    *   UI: Role/Permission Management UI (potentially complex - maybe start with direct Supabase table editing or a simple UI), Statistic Calculators.

---

## Phase 9: Communication Features

*Reference: `gemensamma_funktioner/Direktmeddelanden.md`, `admin_owner_funktioner/Brådskande_Meddelanden.md`*

1.  **Define `direct_messages` Table:**
    *   Supabase SQL: Create `direct_messages` table (`id`, `sender_id` referencing `profiles.id`, `receiver_id` referencing `profiles.id`, `content` (text), `created_at`). Consider a `conversations` table if grouping messages is needed.
    *   RLS: Enable RLS. Users can see messages where they are the sender or receiver. Define who can initiate chats with whom based on roles (e.g., Chattare can only initiate with Manager/Admin/Owner).
2.  **Define `group_chats` and `group_chat_messages` Tables:**
    *   Supabase SQL: `group_chats` (`id`, `name`, `created_by`), `group_chat_members` (`id`, `chat_id`, `user_id`), `group_chat_messages` (`id`, `chat_id`, `sender_id`, `content`, `created_at`).
    *   RLS: Define policies for creating groups (Admin/Owner), adding members, sending/viewing messages based on membership.
3.  **Define `urgent_messages` Table:**
    *   Supabase SQL: Create `urgent_messages` table (`id`, `content`, `sent_by` referencing `profiles.id`, `sent_to_user_id` (nullable), `sent_to_role_id` (nullable), `created_at`).
    *   RLS: Define policies for sending (Admin/Owner, Chatting Manager to team) and receiving (users see messages sent to their ID or role ID).
4.  **Implement Direct Messaging UI:**
    *   Next.js: Create page (`/dashboard/messages`).
    *   UI: Layout with conversation list and message view. Use shadcn/ui components.
    *   Logic: Use Supabase Realtime subscriptions to listen for new messages in relevant conversations. Fetch message history. Implement sending messages (`insert` into `direct_messages`).
5.  **Implement Group Chat UI:**
    *   Next.js: Integrate into `/dashboard/messages`.
    *   UI: Similar to DMs, but for groups. Add UI for creating groups and managing members (Admin/Owner).
    *   Logic: Use Supabase Realtime for messages. Implement group creation/membership logic.
6.  **Implement Urgent Message Sending (Admin/Owner/Chatting Manager):**
    *   UI: Simple form/modal to compose message and select recipients (user or role).
    *   Logic: `insert` into `urgent_messages`.
7.  **Implement Urgent Message Display:**
    *   UI: Use shadcn/ui `Toast` or `AlertDialog` triggered by a Realtime subscription to `urgent_messages` table (filtered for the current user/role). Display on the dashboard layout.

---

## Phase 10: Additional Features & Refinements

1.  **Implement Närvarohantering (Check-in/out):**
    *   Reference: `gemensamma_funktioner/Närvarohantering.md`
    *   Supabase SQL: Create `attendance` table (`id`, `user_id`, `check_in_time`, `check_out_time` (nullable), `date`, `status` (e.g., 'on_time', 'late', 'absent')).
    *   RLS: Define policies for users checking in/out, Managers/Admins viewing team/all records.
    *   UI: Add Check-in/Check-out buttons to relevant dashboards (Chattare, VA). Display status/history.
    *   Logic: Record timestamps. Implement logic (possibly Edge Function) to compare check-in time against schedule and calculate deductions based on rules in `profiles` table.
2.  **Implement Salary/Payment View (VA):**
    *   Logic: Requires calculating salary based on `profiles.salary_info` and potentially deducting amounts based on `attendance` data. This might need an Edge Function for complexity.
    *   UI: Display calculated next pay amount and date on VA dashboard.
3.  **Refine Role & Permission Management (Owner):**
    *   UI: Build an interface for the Owner to modify entries in the `roles` table (name) and potentially manage fine-grained permissions (if not solely relying on RLS based on the main `roles` table). This could involve a separate `permissions` table. *Complexity Warning: This can become very complex.* Start simple.
4.  **Testing:**
    *   Action: Thoroughly test all features, especially RLS policies. Log in as different roles to verify permissions. Test edge cases.
5.  **Deployment:**
    *   Action: Deploy the Next.js application to a hosting provider (e.g., Vercel, Netlify). Configure production environment variables.

---

This step-by-step guide provides a structured approach. Each phase builds upon the previous ones. Remember to commit changes frequently using Git and test thoroughly, especially the RLS policies which are critical for security and correct functionality based on user roles.
