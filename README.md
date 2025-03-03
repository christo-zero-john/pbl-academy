# Proof based Learning Platform

In my supabase I have two tables, courses and tasks. Courses table have these columns: id, title, description, published, created_at, created_by(references to id of public.users table). The tasks table has these columns: id, created_at, course_id(references to id of public.courses table), description, resource_link, day, index, created_by(references to id of public.users table) and updated_at.

There are multiple tasks assosciated with the same course in the tasks table. When I want to fetch a specific course, I want to get all the tasks assosciated with that course as well. Is it possible to do that in a single query? Currently my function to fetch course by ID is like this: (Next js backend)
Supabase.from("courses")
.select(
`
  id,
  title,
  published,
  description,
  created_by (
    id,
    first_name,
    last_name,
    username,
    role
  )`
)
.eq("id", id);

How should I modify this so that I can get all the tasks assosciated with a course along with course all details and the details of created_by user in a single query just like the one above??
