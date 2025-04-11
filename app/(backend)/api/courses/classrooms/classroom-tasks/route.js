import { NextResponse } from "next/server";
import Classroom from "../../../modules/entities/Classroom";
import User from "../../../modules/entities/User";

/**
 * API Route to get all tasks of classroom of a course
 */
export async function POST(request) {
  try {
    const requestData = await request.json();
    console.log("Classroom id: ", requestData.classroom_id);

    console.log(
      "Initializing get all classroom tasks for classroom: ",
      requestData.classroom_id
    );

    let learner_id = requestData.learner_id;

    if (!requestData.learner_id) {
      const getUserStatus = await User.getUser();
      if (getUserStatus.success) {
        learner_id = getUserStatus.data.id;
      }
    }

    const getCourseStatus = await Classroom.fetchClassroomTasks(requestData);

    const getCompletedTasksStatus = await Classroom.fecthCompletedTasks(
      requestData.classroom_id,
      learner_id
    );

    if (getCourseStatus.success) {
      if (getCompletedTasksStatus.success) {
        console.log(
          `Successfully fetched course ${requestData.course_id} and completed tasks of classroom ${requestData.classroom_id}`
        );
        return NextResponse.json(
          {
            success: true,
            course: getCourseStatus.data,
            completed_tasks:
              getCompletedTasksStatus.data[0] || getCompletedTasksStatus.data,
          },
          { status: 200 }
        );
      } else {
        console.log(
          `Successfully fetched course ${requestData.course_id} but failed to fetch tasks of classroom ${requestData.classroom_id}. ${getCompletedTasksStatus.error}`
        );
        throw new Error(
          `Error fetching tasks of classroom ${requestData.classroom_id}`
        );
      }
    } else {
      console.log("Error while fetching  classrooms. ");
      return NextResponse.json(
        {
          success: false,
          error: getCourseStatus.error,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Internal Server Error: ", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            `Internal Server Error: ${error.message}` ||
            "Something went wrong. Internal Server Error. Please Contact Support",
        },
      },
      { status: 500 }
    );
  }
}
