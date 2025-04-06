import { NextResponse } from "next/server";
import Classroom from "../../../modules/entities/Classroom";

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

    const getTasksStatus = await Classroom.fetchClassroomTasks(
      requestData
    );

    if (getTasksStatus.success) {
      console.log(
        "Successfully fetched classrooms of course ",
        requestData.classroom_id
      );
      return NextResponse.json(
        {
          success: true,
          tasks: getTasksStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while fetching  classrooms");
      return NextResponse.json(
        {
          success: false,
          error: getTasksStatus.error,
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
