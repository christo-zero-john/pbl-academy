# Mentor Dashboard – Course & Task Creation

## Course Creation and management

`23-02-2025`

- [x] A form to create a new course with fields for title and description.
- [x] After course creation, redirect to course details page.
- [x] In the mentors dashboard, `my courses` are displayed.
- [ ] Mentors can edit, update and delete their own courses.

`24-02-2025`

- [x] Mentors can add tasks to their courses.
- [ ] After Adding tasks, course can be submited for admin approval (Atleast 1 task is required to submit for approval)
- [ ] Admins can view all courses including approval needed courses. They can choose to approve or reject with a message/report.
- [ ] Once the admin approves it, mentors can publish the course for public access.

## Task Creation and Management

- [ ] An interface to add, edit, and reorder tasks within a course.
      Each task includes:
      Task description
      Optional resource links (URLs for videos, articles, etc.)
      Deadline or estimated duration (e.g., “complete in 1 day”)
      Courses can be marked as “published” to appear in the public catalog.

<!--  -->

`06-03-2025`
overdue

- [x] Implement mechanism to preview changed tasks when `view changes` button is clicked ✅`09 03 2025`
- [x] Implement mechanism to save tasks to database when `save changes` button is clicked ✅ `09 03 2025`
- [x] Implement mechanism to add new resource links to tasks ✅ `09 03 2025`

`11 03 2025`

- [ ] Create tables in supabase to store classroom and enrollment data.

- [ ] If the course is published show a button `New classroom`. Otherwise show text pusblish course then add a classroom.
- [ ] List existing classrooms of course
- [ ] Classroms should have a maximum enrollment size and date of starting.
- [ ] Once a classroom is added students can request to enroll in classrooms.
- [ ] Mentors can view enrollment requests and allow students to attend the cohort.

`12 03 2025`

- [ ] Once a student is enrolled in a course ther will appear a progressbar and a mark a s completed button in all tasks of that course along with option to submit proof of work
- [ ] Once a task is completed students could submit their proof of work to the mentor.
- [ ] Mentors can choose either to approve or reject proof of work with sufficcient comment/message/feedback

classrooms table
- created_by
- start_date
- main_mentor
- sub_mentors
- course_id
