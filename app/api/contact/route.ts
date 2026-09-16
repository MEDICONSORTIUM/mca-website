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
    console.log("Contact form submission:", {
      fullName,
      email,
      organisation,
      subject,
      message,
    });

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