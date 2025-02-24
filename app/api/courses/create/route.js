import Mentor from "@/app/api/modules/entities/Mentor";
import { NextResponse } from "next/server";

/**
 * API Route to create a course
 */
export async function POST(request) {
  try {
    const courseData = await request.json();
    console.log("Recieved Data: ", courseData);

    console.log(
      "Initializing create new course for user: ",
      courseData.created_by
    );

    const createCourseStatus = await Mentor.createCourse(courseData);

    if (createCourseStatus.success) {
      console.log("Successfully created new course");
      return NextResponse.json(
        {
          success: true,
          data: createCourseStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while creating course");
      return NextResponse.json(
        {
          success: false,
          error: createCourseStatus.error,
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
