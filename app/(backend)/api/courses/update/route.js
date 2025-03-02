import Mentor from "../../modules/entities/Mentor";
import { NextResponse } from "next/server";

/**
 * API Route to update a course
 */
export async function POST(request) {
  try {
    const courseData = await request.json();
    console.log("Recieved Data: ", courseData);

    console.log("Initializing update course for course: ", courseData.id);

    const updateStatus = await Mentor.updateCourse(courseData);

    console.log(updateStatus);

    if (updateStatus.success) {
      console.log("Successfully updated course");
      return NextResponse.json(
        {
          success: true,
          data: updateStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while updating course");
      return NextResponse.json(
        {
          success: false,
          error: updateStatus.error,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Internal Server Error: ", error);
    return NextResponse.json(
      {
        success: false,
        error:
          `Internal Server Error: ${error.message}` ||
          "Something went wrong. Internal Server Error. Please Contact Support",
      },
      { status: 500 }
    );
  }
}
