import { NextResponse } from "next/server";
import Course from "../../../modules/entities/Course";

/**
 * API Route to get all classrooms of a course
 */
export async function POST(request) {
  try {
    const requestData = await request.json();
    console.log("Recieved Data: ", requestData);

    console.log(
      "Initializing get all classrrooms for course: ",
      requestData.course_id
    );

    const getClassroomStatus = await Course.fetchClassrooms(requestData.id);

    if (getClassroomStatus.success) {
      console.log(
        "Successfully fetched classrooms of course ",
        requestData.course_id
      );
      return NextResponse.json(
        {
          success: true,
          data: getClassroomStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while fetching  classrooms");
      return NextResponse.json(
        {
          success: false,
          error: getClassroomStatus.error,
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
