import Supabase from "../../modules/entities/Supabase";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log(
      `Start Creating new user account with email:${email} and password: ${password}`
    );

    const { data, error } = await Supabase.auth.signUp({ email, password });

    if (error) { 
      // Invalid data sent to supabase (weak password, user already signed up etc...). 400: Bad Request
      return Response.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
          },
        },
        { status: 400 }
      );
    } else {
      // Successfully created user. 201: Success
      return Response.json(
        {
          success: true,
          message: "User signed up successfully!",
          user: data.user,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    // Some unexpected error occurred. 500: Internal Server Error
    console.log("Internal Error: ", error);
    return Response.json(
      {
        success: false,
        error: {
          code: 500,
          message:
            "Something went wrong. Internal Server Error. Please Contact Support",
        },
      },
      { status: 500 }
    );
  }
}
