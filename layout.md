
# Thicket Portal UI/UX Design Prompt

## 1. High-Level Concept

You are a UI/UX designer tasked with creating the interface for "Thicket Portal," a web application for a landscaping/planting company to manage jobs, track work, and organize personnel.

The application needs to be intuitive, mobile-friendly (responsive), and provide clear, role-based access to its features. The primary users are Managers, Team Leads, and Planters.

---

## 2. User Roles & Core Permissions

- **Manager:** The administrator. They can see and do everything. Their focus is on creating jobs, monitoring progress, and managing the team.
- **Team Lead:** A mid-level user. Their focus is on executing jobs and logging the work of their specific team.
- **Planter:** The primary field worker. Their focus is on logging their individual work and hours.

---

## 3. Required Pages & Components

### 3.1. Authentication & Public Pages

#### a. Login Page
- **Purpose:** Securely log in users.
- **Components:**
  - Tabs or a toggle to switch between "Planter/Team Lead Login" and "Manager Login".
  - Email/Username input field.
  - Password input field.
  - "Login" button.
  - A link to the Signup page.

#### b. Signup Page
- **Purpose:** Allow new Planters and Managers to register.
- **Components:**
  - Tabs or a toggle for "Planter Signup" and "Manager Signup".
  - Full Name input.
  - Email input.
  - Password input.
  - "Create Account" button.
  - A link back to the Login page.

---

### 3.2. Common Authenticated Pages

#### a. Profile Page
- **Purpose:** Allow users to view and update their own profile information.
- **Components:**
  - A form displaying the user's name and email.
  - "Update Profile" button to save changes.
  - A "Logout" button should be present in the main navigation bar on all authenticated pages.

---

### 3.3. Manager-Specific Pages

#### a. Manager Dashboard
- **Purpose:** Provide a high-level overview of all operations.
- **Components:**
  - A grid or list of all current jobs with their status (e.g., 'Not Started', 'In Progress', 'Completed').
  - Quick-view stats (e.g., Total Jobs, Total Planters, Hours Logged this week).
  - A main navigation sidebar linking to: Dashboard, Jobs, Job Sheets, Plants, Tasks, and Planters.

#### b. Jobs Management Page
- **Purpose:** Create, view, update, and delete jobs.
- **Components:**
  - A prominent "Create New Job" button that opens a creation modal/form.
  - A searchable table of all jobs.
    - Columns: Job Name, Site Location, Status, Start Date.
    - Each row should have "Edit" and "Delete" buttons.
    - Clicking a job name should navigate to the Job Details Page.
- **Create/Edit Job Form:**
  - Fields for `jobName`, `site`, `client`, `startDate`, etc.

#### c. Job Details Page
- **Purpose:** View comprehensive details for a single job and all associated job sheets.
- **Components:**
  - Display area for all job details (client, site, dates, etc.).
  - A section listing all Job Sheets submitted for this job.
  - A table showing team lead job sheets for this job.

#### d. Job Sheets Overview Page
- **Purpose:** Allow managers to review all submitted job sheets from all planters and team leads.
- **Components:**
  - A filterable and searchable table of all job sheets.
  - Columns: Planter Name, Job Name, Date, Hours Worked.
  - Clicking a sheet should open a read-only view of its details.

#### e. Plants Management Page
- **Purpose:** CRUD operations for the types of plants used in jobs.
- **Components:**
  - "Add New Plant" button.
  - A table of all plants with columns for Name, Species, etc.
  - "Edit" and "Delete" buttons on each row.

#### f. Non-Planting Tasks Page
- **Purpose:** Manage the types of billable tasks that are not planting (e.g., Site Prep, Driving).
- **Components:**
  - "Create New Task" button.
  - A table of all tasks with "Edit" and "Delete" buttons.

#### g. Planters Management Page
- **Purpose:** View a list of all planters in the system.
- **Components:**
  - A simple table listing all planters.
  - Columns: Name, Email.
  - Clicking a planter's name could navigate to their public profile view.

---

### 3.4. Team Lead-Specific Pages

#### a. Team Lead Dashboard
- **Purpose:** View assigned jobs and manage team job sheets.
- **Components:**
  - A list of their currently assigned jobs.
  - A prominent button/link to "Create New Team Job Sheet".
  - A table of their previously submitted team job sheets, with options to view or edit them.

#### b. Team Job Sheet Form (Create/Edit)
- **Purpose:** Allow a Team Lead to log work for their entire team for a specific job.
- **Components:**
  - Dropdown to select the `jobId`.
  - Date picker for `date`.
  - Input fields for `teamMembers` involved, `workDescription`, `hoursWorked`, etc.
  - "Submit Sheet" or "Update Sheet" button.

---

### 3.5. Planter-Specific Pages

#### a. Planter Dashboard
- **Purpose:** View assigned jobs and log work.
- **Components:**
  - A simple view of their assigned jobs.
  - A prominent button to "Create New Job Sheet" for logging their work.
  - A list/table of their past job sheets, with options to view or edit.

#### b. Job Sheet Form (Create/Edit)
- **Purpose:** Allow a planter to log their own work on a job.
- **Components:**
  - Dropdown to select the `jobId`.
  - Date picker.
  - Input fields/text areas for `workSummary`, `hoursWorked`, `plantsInstalled`, etc.
  - "Submit" or "Update" button.
