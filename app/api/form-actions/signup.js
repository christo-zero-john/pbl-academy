"use server";

import { Supabase } from "../modules/Supabase";

export async function signup(prevState, formData) {
  console.log("Creating New User Account with: ", formData);
  const supabase = new Supabase();

  await new Promise((resolve) => setTimeout(resolve, 1000));
}
