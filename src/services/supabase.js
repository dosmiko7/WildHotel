import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpqncgojymvhotnmqowu.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwcW5jZ29qeW12aG90bm1xb3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwMTg2NTIsImV4cCI6MjAwNTU5NDY1Mn0.I4Y0Aumgv-fB5cB0sfCghhVn4ZmSWVjfh0XCqj0tBeM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
