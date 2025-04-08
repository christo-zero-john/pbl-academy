# Mentor Dashboard – Course & Task Creation

## Course Creation and management

### `23-02-2025`

- [x] A form to create a new course with fields for title and description.
- [x] After course creation, redirect to course details page.
- [x] In the mentors dashboard, `my courses` are displayed.
- [ ] Mentors can edit, update and delete their own courses.

### `24-02-2025`

- [x] Mentors can add tasks to their courses.
- [ ] After Adding tasks, course can be submited for admin approval (Atleast 1 task is required to submit for approval)
- [ ] Admins can view all courses including approval needed courses. They can choose to approve or reject with a message/report.
- [ ] Once the admin approves it, mentors can publish the course for public access.

## Task Creation and Management

An interface to

- [x] add tasks within a course ✅` 03 2025`
- [ ] edit tasks within a course
- [ ] reorder tasks within a course.

Each task includes:

- [x] Task description
- [ ] Optional resource links (URLS)
- [x] Deadline or estimated duration (e.g., “complete in 1 day”)
- [x] Courses can be marked as “published” to appear in the public catalog.

<!--  -->

### `06-03-2025`

overdue

- [x] Implement mechanism to preview changed tasks when `view changes` button is clicked ✅`09 03 2025`
- [x] Implement mechanism to save tasks to database when `save changes` button is clicked ✅ `09 03 2025`
- [x] Implement mechanism to add new resource links to tasks ✅ `09 03 2025`

### `11 03 2025`

- [x] Create tables in supabase to store classroom and enrollment data. ✅` 03 2025`
- [x] If the course is published show a button `New classroom`. ✅` 03 2025`Otherwise show text pusblish course then add a classroom. ✅` 03 2025`
- [x] List existing classrooms of course while viewing course ✅` 03 2025`
- [x] Classroms should have a maximum enrollment size and date of starting. ✅` 03 2025`
- [x] Once a classroom is added students can request to enroll in classrooms. ✅` 03 2025`
- [ ] Mentors can view enrollment requests and allow students to attend the cohort.

### `12 03 2025`

- [ ] Once a student is enrolled in a course ther will appear a progressbar and a mark a s completed button in all tasks of that course along with option to submit proof of work
- [ ] Once a task is completed students could submit their proof of work to the mentor.
- [ ] Mentors can choose either to approve or reject proof of work with sufficcient comment/message/feedback

classrooms table

- created_by
- start_date
- main_mentor
- sub_mentors
- course_id###

### `31 03 2025`

- [ ] Mentors could see all learners requested to enroll into a clasroom

- [ ] Mentors could accept requests of learners to enroll into a clasroom

- [ ] After a mentor accepts an enrollment request, students can access classroom and course materials.

### `07 04 2025`

- [ ] When a user clicks and opens a task in a classroom, there should be:
  - [ ] Next and previous buttos to navigate throught tasks
  - [ ] Button to mark task as done.
