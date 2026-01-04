import { supabase } from "./supabase";

export interface WaitlistResponse {
  success: boolean;
  message: string;
}

export const addToWaitlist = async (email: string): Promise<WaitlistResponse> => {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email address." };
  }

  try {
    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        return { success: true, message: "You are already on the waitlist!" };
      }
      console.error("Supabase error:", error);
      return { success: false, message: "Something went wrong. Please try again." };
    }

    return { success: true, message: "You've been added to the waitlist!" };
  } catch (error) {
    console.error("Waitlist error:", error);
    return { success: false, message: "Connection error. Please try again later." };
  }
};
