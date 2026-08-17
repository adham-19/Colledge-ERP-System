import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendResetEmail = async (email, resetURL) => {
  await transporter.sendMail({
    from: `"ABC Institute ERP" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your ABC Institute ERP Password",

    html: `
      <div style="
        margin: 0;
        padding: 40px 20px;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        ">

          <!-- Header -->
          <div style="
            background: #1f2937;
            padding: 25px;
            text-align: center;
          ">
            <h1 style="
              margin: 0;
              color: #ffffff;
              font-size: 24px;
            ">
              ABC Institute
            </h1>

            <p style="
              margin: 8px 0 0;
              color: #d1d5db;
              font-size: 14px;
            ">
              ERP System
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 35px 30px;">

            <h2 style="
              margin-top: 0;
              color: #111827;
              font-size: 22px;
            ">
              Password Reset Request
            </h2>

            <p style="
              color: #4b5563;
              font-size: 15px;
              line-height: 1.6;
            ">
              We received a request to reset the password associated
              with your ABC Institute ERP account.
            </p>

            <p style="
              color: #4b5563;
              font-size: 15px;
              line-height: 1.6;
            ">
              If you made this request, click the button below to
              create a new password.
            </p>

            <!-- Reset Button -->
            <div style="
              text-align: center;
              margin: 30px 0;
            ">

              <a
                href="${resetURL}"
                style="
                  display: inline-block;
                  padding: 13px 30px;
                  background: #1f2937;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 6px;
                  font-size: 14px;
                  font-weight: bold;
                "
              >
                Reset My Password
              </a>

            </div>

            <!-- Expiration Notice -->
            <div style="
              margin: 25px 0;
              padding: 16px;
              background: #fffbeb;
              border: 1px solid #fde68a;
              border-radius: 6px;
            ">

              <p style="
                margin: 0;
                color: #92400e;
                font-size: 14px;
                line-height: 1.5;
              ">
                <strong>Security Notice:</strong>
                This password reset link will expire in
                <strong>15 minutes</strong> for your security.
              </p>

            </div>

            <p style="
              color: #6b7280;
              font-size: 13px;
              line-height: 1.5;
            ">
              If you did not request a password reset, you can safely
              ignore this email. Your password will remain unchanged.
            </p>

            <p style="
              margin-top: 25px;
              color: #6b7280;
              font-size: 13px;
              line-height: 1.5;
            ">
              For security reasons, please do not share this email
              or your password reset link with anyone.
            </p>

          </div>

          <!-- Footer -->
          <div style="
            padding: 18px 25px;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          ">

            <p style="
              margin: 0;
              color: #9ca3af;
              font-size: 12px;
            ">
              © ${new Date().getFullYear()} ABC Institute
            </p>

            <p style="
              margin: 5px 0 0;
              color: #9ca3af;
              font-size: 12px;
            ">
              This is an automated message. Please do not reply.
            </p>

          </div>

        </div>

      </div>
    `,
  });
};

export const sendWelcomeEmail = async (
  email,
  username,
  temporaryPassword,
  role,
) => {
  await transporter.sendMail({
    from: `"ABC Institute ERP" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your ABC Institute ERP Account",

    html: `
      <div style="
        margin: 0;
        padding: 40px 20px;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        ">

          <!-- Header -->
          <div style="
            background: #1f2937;
            padding: 25px;
            text-align: center;
          ">
            <h1 style="
              margin: 0;
              color: #ffffff;
              font-size: 24px;
            ">
              ABC Institute
            </h1>

            <p style="
              margin: 8px 0 0;
              color: #d1d5db;
              font-size: 14px;
            ">
              ERP System
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 35px 30px;">

            <h2 style="
              margin-top: 0;
              color: #111827;
              font-size: 22px;
            ">
              Welcome to ABC Institute ERP
            </h2>

            <p style="
              color: #4b5563;
              font-size: 15px;
              line-height: 1.6;
            ">
              Your ERP account has been created by the administration.
              You can use the credentials below to sign in for the first time.
            </p>

            <!-- Credentials -->
            <div style="
              margin: 25px 0;
              padding: 20px;
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
            ">

              <p style="
                margin: 0 0 12px;
                color: #374151;
                font-size: 14px;
              ">
                <strong>Username:</strong>
                ${username}
              </p>

              <p style="
                margin: 0;
                color: #374151;
                font-size: 14px;
              ">
                <strong>Temporary Password:</strong>
                ${temporaryPassword}
              </p>

            </div>

            <p style="
              color: #92400e;
              background: #fffbeb;
              border: 1px solid #fde68a;
              padding: 14px;
              border-radius: 6px;
              font-size: 14px;
              line-height: 1.5;
            ">
              <strong>Important:</strong>
              This is a temporary password. You will be required to
              create a new password when you sign in for the first time.
            </p>

            <!-- Login button -->
            <div style="
              text-align: center;
              margin: 30px 0 10px;
            ">

              <a
                href="${process.env.FRONTEND_URL}/login/${role}login"
                style="
                  display: inline-block;
                  padding: 12px 28px;
                  background: #1f2937;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 6px;
                  font-size: 14px;
                  font-weight: bold;
                "
              >
                Sign In to ERP
              </a>

            </div>

            <p style="
              margin-top: 30px;
              color: #6b7280;
              font-size: 13px;
              line-height: 1.5;
            ">
              If you did not expect this account or believe this email
              was sent to you by mistake, please contact the institute
              administration.
            </p>

          </div>

          <!-- Footer -->
          <div style="
            padding: 18px 25px;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          ">

            <p style="
              margin: 0;
              color: #9ca3af;
              font-size: 12px;
            ">
              © ${new Date().getFullYear()} ABC Institute
            </p>

            <p style="
              margin: 5px 0 0;
              color: #9ca3af;
              font-size: 12px;
            ">
              This is an automated message. Please do not reply.
            </p>

          </div>

        </div>

      </div>
    `,
  });
};
