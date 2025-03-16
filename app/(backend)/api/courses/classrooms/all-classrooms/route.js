import { NextResponse } from "next/server";

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

    const createClassroomStatus = await Mentor.createClassroom(requestData);

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
