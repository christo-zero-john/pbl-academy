import { NextResponse } from "next/server";
import Mentor from "../../../modules/entities/Mentor";

/**
 * API Route to create a new classroom
 */
export async function POST(request) {
  try {
    const classroomData = await request.json();
    console.log("Recieved Data: ", classroomData);

    console.log(
      "Initializing create new classrrom for course: ",
      classroomData.course_id
    );

    const createClassroomStatus = await Mentor.createClassroom(classroomData);

    if (createClassroomStatus.success) {
      console.log("Successfully created new classroom");
      return NextResponse.json(
        {
          success: true,
          data: createClassroomStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while creating new classroom");
      return NextResponse.json(
        {
          success: false,
          error: createClassroomStatus.error,
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
