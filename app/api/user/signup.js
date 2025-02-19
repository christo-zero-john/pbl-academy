import { Supabase } from "../modules/Supabase";

export async function POST(request) {
  console.log("Request catched");
  const { email, password } = await request.json();
  const response = await User.signUp({ email, password });
  return new Response(JSON.stringify(response), {
    status: response.success ? 200 : 400,
  });
}
