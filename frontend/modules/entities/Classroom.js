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
}

export default new Classroom();
// Classroom in frontend
