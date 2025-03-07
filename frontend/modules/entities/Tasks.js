/**
 * Tasks object in frontend
 */

class Tasks {
  constructor() {
    if (!Tasks.instance) {
      Tasks.instance = this;
    }
    return Tasks.instance;
  }

  /** comment -
   * Initially tasks is an array of tasks. We need to convert it into a 2D array of tasks grouped by day, then sort each day's task by 'task.index'. The converted tasks is a 2D array. Each row in the 2D array is a day, and each column in the 2D array is a task of that day.
   * @returns tasks2D: A 2D array of tasks
   */
  groupAndSortTasks(tasks) {
    console.log("Grouping Tasks into days and sorting by task.index");
    // Group tasks by day using an object
    const tasksByDay = tasks.reduce((groups, task) => {
      if (!groups[task.day]) {
        groups[task.day] = [];
      }
      groups[task.day].push(task);
      return groups;
    }, {});

    // Sort each day's tasks by their index
    Object.values(tasksByDay).forEach((dayTasks) => {
      dayTasks.sort((a, b) => a.index - b.index);
    });

    // Convert the grouped tasks into a sorted 2D array by day (sorted numerically)
    const tasks2D = Object.keys(tasksByDay)
      .sort((a, b) => a - b) // sort day keys numerically
      .map((day) => tasksByDay[day]);

    console.log("Tasks 2D: ", tasks2D);
    return tasks2D;
  }

  /** comment
   * @description Returns a 2D array (matrix) of tasks. This function extracts the tasks that are updated from 'tasksMatrix' array based on the indexes stored in the tasksIndex2D array. The updated tasks are then returned as a 2D array.
   * @param tasksMatrix An array of tasks grouped by day. Each array in 'tasksMatrix' is an array of tasks for that day.
   * @param taskIndex2D
   */
  getUpdatedTasks(tasksMatrix, taskIndex2D) {
    let updatedTasks = [];
    taskIndex2D.forEach((taskIndex) => {
      let M = taskIndex[0] - 1;
      let J = taskIndex[1] - 1;
      updatedTasks.push(tasksMatrix[M][J]);
    });

    let tasks2D = this.groupAndSortTasks(updatedTasks);

    return tasks2D;
  }
}

export default new Tasks();
// Tasks object in frontend
