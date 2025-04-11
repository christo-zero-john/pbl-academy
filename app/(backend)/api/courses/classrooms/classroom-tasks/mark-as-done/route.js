import { NextResponse } from "next/server";
import Classroom from "@/app/(backend)/api/modules/entities/Classroom";
import User from "@/app/(backend)/api/modules/entities/User";

/**
 * API Route to mark a task of classroom as done
 */
export async function POST(request) {
  try {
    const requestData = await request.json();
    let learner_id = requestData.learner_id;
    let completed_tasks = requestData.completed_tasks;
    let classroom_id = requestData.classroom_id;

    console.log(
      `Marking task ${
        completed_tasks[completed_tasks.length - 1]
      } of classroom ${classroom_id} as done for learner ${learner_id}.`
    );

    if (!learner_id || !classroom_id || !completed_tasks) {
      throw new Error("Learner id, classroom id or task id not recieved.");
    }

    const getUserStatus = await User.getUser();
    console.log(getUserStatus);
    if (getUserStatus.success && getUserStatus.data.id != learner_id) {
      throw new Error("Access denied. Client user does not match learner.");
    }

    const markAsDoneStatus = await Classroom.markAsDone(
      completed_tasks,
      classroom_id,
      learner_id
    );

    if (markAsDoneStatus.success) {
      console.log("Successfully marked task as done.");
      return NextResponse.json(
        {
          success: true,
          data: markAsDoneStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while marking task as done.");
      return NextResponse.json(
        {
          success: false,
          error: markAsDoneStatus.error,
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
