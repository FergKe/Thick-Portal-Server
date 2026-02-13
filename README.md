# Thicket Portal API

**Note:** This project is currently under active development. More fixes, refactoring, and cleanups will be happening in future updates.

## API Endpoints

### User & Authentication (`/user`)

- `POST /signup` - Register a new Planter.
- `POST /signup/manager` - Register a new Manager.
- `POST /login` - Login as Planter.
- `POST /login/manager` - Login as Manager.
- `GET /planter` - Get all planters (Manager only).
- `GET /planter/:_id` - Get specific planter profile.
- `GET /manager/:_id` - Get specific manager profile (Manager only).
- `PUT /planter/:_id` - Update planter profile.
- `PUT /manager/:_id` - Update manager profile (Manager only).

### Jobs (`/job`)

- `POST /` - Create a new job (Manager only).
- `GET /` - Get all jobs (Manager only).
- `GET /:_id` - Get job details.
- `PUT /:_id` - Update job details (Manager only).
- `DELETE /:_id` - Delete a job (Manager only).

### Job Sheets (`/jobSheet`)

- `POST /` - Create a job sheet (Planter/TeamLead).
- `GET /` - Get all job sheets (Manager only).
- `GET /:_id` - Get job sheet details.
- `GET /job/:_id` - Get all job sheets associated with a specific Job ID.
- `PUT /:_id` - Update a job sheet (Planter/TeamLead).
- `DELETE /:_id` - Delete a job sheet (Manager only).

### Plants (`/plant`)

- `GET /` - Get all plants.
- `GET /:_id` - Get plant details (Manager only).
- `POST /` - Create a new plant (Manager only).
- `PUT /:_id` - Update plant details (Manager only).
- `DELETE /:_id` - Delete a plant (Manager only).

### Non-Planting Tasks (`/nonPlantingTask`)

- `GET /` - Get all tasks.
- `GET /:_id` - Get task details (Manager only).
- `POST /` - Create a new task (Manager only).
- `PUT /:_id` - Update task details (Manager only).
- `DELETE /:_id` - Delete a task (Manager only).

### Team Lead Job Sheets (`/teamleadjobsheet`)

- `POST /` - Create a team lead job sheet (TeamLead only).
- `GET /` - Get all team lead job sheets (Manager only).
- `GET /:_id` - Get team lead job sheet details (Manager only).
- `PUT /:_id` - Update team lead job sheet (TeamLead only).
- `DELETE /:_id` - Delete team lead job sheet (Manager only).
