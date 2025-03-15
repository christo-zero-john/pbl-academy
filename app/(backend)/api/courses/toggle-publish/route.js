import { NextResponse } from "next/server";
import Mentor from "../../modules/entities/Mentor";

/**
 * API Route to publish course
 */
export async function POST(request) {
  try {
    const requestData = await request.json();

    console.log(
      `Setting published state of course with ID: ${requestData.course_id} as ${requestData.published}`
    );

    const updateStatus = await Mentor.togglePublishCourse(
      requestData.course_id,
      requestData.published
    );

    console.log(updateStatus);

    if (updateStatus.success) {
      console.log("Successfully published course");
      return NextResponse.json(
        {
          success: true,
          data: updateStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while publishing course");
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
        error: new Error(
          `Internal Server Error: ${error.message}` ||
            "Something went wrong. Internal Server Error. Please Contact Support"
        ),
      },
      { status: 500 }
    );
  }
}
