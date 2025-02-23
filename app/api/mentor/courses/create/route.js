import Mentor from "@/app/api/modules/entities/Mentor";
import Supabase from "@/app/api/modules/entities/Supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const userToken = authHeader.split(" ")[1];

    const userAuthStatus = await Supabase.auth.getUser(userToken);

    if (userAuthStatus.error) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized: " + userAuthStatus.error.message,
      });
    } else {
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
