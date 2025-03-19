import { NextResponse } from "next/server";
import Classroom from "../../../modules/entities/Classroom";

/**
 * API Route to get all classrooms of a course
 */
export async function POST(request) {
  try {
    const requestData = await request.json();
    console.log("Recieved Data: ", requestData);

    console.log("Initializing enroll learner to classroom", requestData);

    const enrollmentStatus = await Classroom.enrollToClassroom(requestData);

    if (enrollmentStatus.success) {
      console.log(
        "Successfully enrolled learner into classroom",
        requestData.classroom_id
      );
      return NextResponse.json(
        {
          success: true,
          classrooms: enrollmentStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while fetching  classrooms.");
      return NextResponse.json(
        {
          success: false,
          error: enrollmentStatus.error,
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
