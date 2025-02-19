import { NextResponse } from "next/server";
import User from "../../modules/entities/User";

export async function POST(request) {
  try {
    const requestData = await request.json();
    console.log(requestData);
    const email = requestData.email;
    const password = requestData.password;

    if (!email || !password) {
      throw new Error("Email or Password not recieved");
    }

    console.log(
      `Initiating user login with email:${email} and password: ${password}`
    );

    const { data, error } = await User.login(email, password);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json({
        success: true,
        session: data.session,
      });
    }
  } catch (error) {
    console.log("Internal Server Error: ", error);
    return new NextResponse.json(
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
