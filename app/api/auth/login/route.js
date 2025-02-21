import { NextResponse } from "next/server";
import User from "../../modules/entities/User";

export async function POST(request) {
  try {
    const requestData = await request.json();
    console.log("Data Recieved in Request", requestData);
    const email = requestData.email;
    const password = requestData.password;

    if (!email || !password) {
      throw new Error("Email or Password not recieved");
    }

    console.log(
      `Initiating user login with email:${email} and password: ${password}`
    );

    const loginStatus = await User.login(email, password);
    console.log(loginStatus);

    if (!loginStatus.success) {
      return NextResponse.json(
        {
          success: false,
          error: loginStatus.error.message,
        },
        { status: 400 }
      );
    } else {
      console.log("Session Data retireved");
      return NextResponse.json({
        success: true,
        session: loginStatus.data.session,
        userData: loginStatus.userData,
      });
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
