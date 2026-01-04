import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  subject: string;
  message: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { subject, message }: RequestBody = await req.json();

    if (!subject || !message) {
      throw new Error("Missing subject or message");
    }

    // Initialize Supabase Admin Client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Fetch all waitlist emails
    // Note: Ideally, for thousands of emails, you'd use pagination or a queue.
    // For a simple waitlist (< 1000), fetching all at once is fine for this MVP.
    const { data: users, error: dbError } = await supabase
      .from("waitlist")
      .select("email");

    if (dbError) throw dbError;

    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users to send email to." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Sending email to ${users.length} users...`);

    const emails = users.map(u => u.email);

    // Send via Resend (Batch sending)
    // Resend allows sending to multiple BCCs or individually.
    // Ideally, send individually or use "to" field if it's a broadcast.
    // Here we will use 'bcc' to avoid exposing emails to each other if sending as one bulk (limitations apply).
    // BETTER APPROACH: Loop and send (Resend limits rate), or use Resend's "Audience" feature if available.
    // For simplicity in this script, we loop.
    
    // NOTE: Resend Free tier has limits (e.g., 100 emails/day). Check your plan.
    
    const results = [];
    for (const email of emails) {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Serenity <onboarding@resend.dev>", // Change this to your verified domain later
                to: email,
                subject: subject,
                html: `<div style="font-family: sans-serif; color: #333;">
                        ${message.replace(/\n/g, '<br>')}
                        <br><br>
                        <hr>
                        <p style="font-size: 12px; color: #888;">You received this because you signed up for the Serenity waitlist.</p>
                       </div>`,
            }),
        });
        const json = await res.json();
        results.push(json);
    }

    return new Response(
      JSON.stringify({ success: true, sent_count: results.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
