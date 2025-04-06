import User from "./User";

/**
 * Classroom in frontend
 */
class Classroom {
  constructor() {
    if (!Classroom.instance) {
      Classroom.instance = this;
    }
    return Classroom.instance;
  }

  optimizeClassroomItems(classrooms, course) {
    console.log("Optimizing Classrooms of course.");
    classrooms.forEach((classroom) => {
      const startDate = classroom.start_date;
      const totalDays = course.tasks.length;
      classroom.end_date = this.getEndDate(startDate, totalDays);

      classroom.isEnrolled = false;

      // Verify whether the student is enrolled or not.
      classroom.enrollments.forEach((enrollment) => {
        if (enrollment.learner_id == User.user.id) {
          classroom.isEnrolled = true;
        }
      });
    });
    console.log("Optimized classrooms");
    return classrooms;
  }

  getEndDate(startDate, totalDays) {
    // Extract day, month, year
    let [day, month, year] = startDate.split("-");
    // Convert to Date object
    let dateObj = new Date(day, month, year);

    // Add the total days
    dateObj.setDate(dateObj.getDate() + totalDays);
    let endDay = String(dateObj.getDate());
    let endMonth = String(dateObj.getMonth() + 1);
    let endYear = String(dateObj.getFullYear());

    const endDate = `${endYear}-${endMonth}-${endDay}`;
    return endDate;
  }

  async enrollToClassroom(enrollmentData) {
    console.log("Sending request to enroll learner into classroom");

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrollmentData),
    };

    try {
      return fetch("/api/courses/classrooms/enroll", request)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // The response returned from the server is sent back to the caller. It contains success, error or classroms fields.
          return data;
        });
    } catch (error) {
      console.log("Error Enrolling to classroom: ", error);
      return {
        success: false,
        error: error,
      };
    }
  }

  /**
   * @param classrooms Array of classrooms of a course after optimixation using Classroom.optimizeClassroomItems
   * @returns boolean along with enrolled classroom id. If enrolled it return true, otherwise false
   */
  checkEnrollment(classrooms) {
    for (let classroom of classrooms) {
      if (classroom.isEnrolled) {
        return [true, classroom.id];
      }
    }
    return [false, null];
  }
}

export default new Classroom();
// Classroom in frontend
