import { NextResponse } from "next/server";
import User from "../../modules/entities/User";

export async function POST(req) {
  try {
    const requestData = await req.json();
    const email = requestData.email;
    const password = requestData.password;

    console.log(
      `Start Creating new user account with email:${email} and password: ${password}`
    );

    const { data, error } = await User.signup(email, password);

    if (error) {
      // Invalid data sent to supabase (weak password, user already signed up etc...). 400: Bad Request
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    } else {
      // Successfully created user. 201: Success
      return NextResponse.json(
        {
          success: true,
          error: "User signed up successfully!",
          user: data.user,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    // Some unexpected error occurred. 500: Internal Server Error
    console.log("Internal Error: ", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong. Internal Server Error. Please Contact Support",
      },
      { status: 500 }
    );
  }
}
