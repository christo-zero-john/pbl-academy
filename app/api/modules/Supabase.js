/**
 * Used to create a sup[abase instance and handle some general functionalities. This is used to store supabase auth tokens and things
 */

import { createClient } from "@supabase/supabase-js";

export class Supabase {
  constructor() {
    const supabaseUrl = "https://jnyjppfsonbjbdrsjdkn.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpueWpwcGZzb25iamJkcnNqZGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NjEyNDAsImV4cCI6MjA1MzEzNzI0MH0.5KqzOEPPODuJ7CrQJQXS7cHODb50X4rNGS06vGe5E9o";
    this.client = createClient(supabaseUrl, supabaseKey);
  }
}
