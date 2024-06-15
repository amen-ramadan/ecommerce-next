import { Resend } from "resend";
import { EmailTemplate } from "../../_components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  console.log("the body is ",body);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [body.email],
      subject: "Orders From Amen Ramadan",
      react: EmailTemplate({ body }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
