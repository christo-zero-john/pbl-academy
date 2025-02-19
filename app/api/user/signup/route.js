export async function POST(req) {
  try {
    const body = await req.json(); 
    const { email, password } = body;

    return Response.json({ message: "User signed up!", email });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
