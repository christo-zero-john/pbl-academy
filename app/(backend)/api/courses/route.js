/**
 * API Route to fetch all courses.
 * Pass an object filter along with the GET  request to filter among courses
 */

import { NextResponse } from "next/server";
import Course from "../modules/entities/Course";

export async function POST(request) {
  try {
    console.log("Fetching Course");
    const requestData = await request.json();
    console.log("Fetching courses with filters: ", requestData);
    const getCoursesStatus = await Course.fetchCourses(requestData);
    if (!getCoursesStatus.success) {
      console.log("Error Fetching Courses: ", getCoursesStatus.error);
      return NextResponse.json(
        {
          success: false,
          error: getCoursesStatus.error.message,
        },
        { status: 400 }
      );
    } else {
      console.log("Successfully fetched courses: ", getCoursesStatus.data);
      return NextResponse.json(
        {
          success: true,
          courses: getCoursesStatus.data,
        },
        { status: 200 }
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

  // Extract request body from request✅
  // if request.query.filter is not null, use it as filter
  // filter by id, title, created_by, published
}
