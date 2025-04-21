import { NextResponse } from "next/server";
import Course from "../../../modules/entities/Course";

/**
 * API Route to get all data to display in the dashboard for learner
 * @param {Request} request - The incoming request object
 */
export async function POST(request) {
  try {
    const requestData = await request.json();
    console.log("Recieved Data: ", requestData);

    console.log(
      "Initializing get all data of learner: ",
      requestData.learner_id
    );

    const getClassroomStatus = await Course.fetchClassrooms(
      requestData.course_id
    );

    if (getClassroomStatus.success) {
      console.log(
        "Successfully fetched classrooms of course ",
        requestData.course_id
      );
      return NextResponse.json(
        {
          success: true,
          classrooms: getClassroomStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while fetching  learner data");
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
