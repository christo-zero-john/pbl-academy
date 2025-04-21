/**
 * Enrollments object in frontend
 */

class Enrollments {
  constructor() {
    if (!Enrollments.instance) {
      Enrollments.instance = this;
    }
    return Enrollments.instance;
  }

  


}

export default new Enrollments();
// Enrollments object in frontend
