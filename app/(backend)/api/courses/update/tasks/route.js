import { NextResponse } from "next/server";
import Mentor from "../../../modules/entities/Mentor";

/**
 * API Route to add or update a task
 */
export async function POST(request) {
  try {
    const tasks = await request.json();
    // console.log("Recieved Tasks: ", tasks);

    console.log("Initializing 'Save Tasks to database'");

    const updateStatus = await Mentor.saveTasksToDB(tasks);
    // console.log(updateStatus);

    if (updateStatus.success) {
      console.log("Successfully saved tasks to database");
      return NextResponse.json(
        {
          success: true,
          data: updateStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while saving tasks");
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
