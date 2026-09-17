import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      recaptchaToken,
      fullName,
      email,
      organisation,
      subject,
      message,
    } = body;

    // 1. Check that the frontend supplied a reCAPTCHA token
    if (!recaptchaToken) {
      return Response.json(
        { error: "reCAPTCHA token is missing" },
        { status: 400 }
      );
    }

    // 2. Get the secret key from the server environment
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error("reCAPTCHA secret key is not configured in the server environment.");
      return Response.json(
        { error: "reCAPTCHA secret key is not configured" },
        { status: 500 }
      );
    }

    // 3. Send the token to Google for verification
    const verificationResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: recaptchaToken,
        }),
      }
    );

    const verificationData = await verificationResponse.json();

    console.log("reCAPTCHA verification:", verificationData);

    // 4. Reject the submission if Google says the token is invalid
    if (!verificationData.success) {
      return Response.json(
        { error: "Invalid reCAPTCHA token" },
        { status: 400 }
      );
    }

    // 5. Only process the contact form after successful verification
    const resendApiKey = process.env.RESEND_API_KEY;
    const senderAddress = process.env.CONTACT_SENDER_ADDRESS;
    // OI-002 (FSD §7.1): destination inbox pending MCA confirmation —
    // falls back to the sender address so the flow is testable meanwhile.
    const destinationAddress =
      process.env.CONTACT_EMAIL_ADDRESS || senderAddress;

    if (!resendApiKey || !senderAddress || !destinationAddress) {
      console.error(
        "Resend is not configured: missing RESEND_API_KEY, CONTACT_SENDER_ADDRESS, or CONTACT_EMAIL_ADDRESS."
      );
      return Response.json(
        { error: "Email delivery is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const { error: sendError } = await resend.emails.send({
      from: `MCA Website <${senderAddress}>`,
      to: [destinationAddress],
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `New contact form submission

Full Name: ${fullName}
Email: ${email}
Organisation: ${organisation || "—"}
Subject: ${subject}

Message:
${message}`,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return Response.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return Response.json(
      { message: "Contact form submission received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}