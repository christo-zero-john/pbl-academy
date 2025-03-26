import Mentor from "@/frontend/modules/entities/Mentor";

export default function UnPublishedCourse__Mentor({ course, setCourse }) {
  async function publishCourseHandler() {
    const publishStatus = await Mentor.togglePublishCourse(course.id, true);
    if (publishStatus.success) {
      console.log("Successfully Published course");
      setCourse({
        ...course,
        published: true,
      });
    } else {
      window.confirm(
        "Error while Publishing Course " + publishStatus.error.message
      );
    }
  }

  return (
    <div className="my-3">
      <p className="fw-bold text-danger d-inline-block p-0 m-0">
        Course Not Published Yet
      </p>

      <p className="p-0 m-0">
        Publish Course to create classroom and start enrolling students
      </p>
      <button
        className="btn btn-success d-inline-block"
        onClick={publishCourseHandler}
      >
        Publish Course
      </button>
    </div>
  );
}
