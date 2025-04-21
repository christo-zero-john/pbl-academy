import { NextResponse } from "next/server";
import Course from "../../../modules/entities/Course";
import Dashboard from "../../modules/entities/Dashboard";

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

    const getDashboardStatus = await Dashboard.getLearnerDashboardData(
      requestData.learner_id
    );

    if (getDashboardStatus.success) {
      console.log(
        "Successfully fetched Dashboard data of learner ",
        requestData.course_id
      );
      return NextResponse.json(
        {
          success: true,
          Dashboards: getDashboardStatus.data,
        },
        { status: 200 }
      );
    } else {
      console.log("Error while fetching  learner data");
      return NextResponse.json(
        {
          success: false,
          error: getDashboardStatus.error,
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
