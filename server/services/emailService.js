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
    from: `"ABC Institute" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",

    html: `
      <h2>Password Reset</h2>

      <p>
        We received a request to reset your password.
      </p>

      <p>
        Click the button below to reset your password:
      </p>

      <a href="${resetURL}"
         style="
           display:inline-block;
           padding:10px 20px;
           background:#007bff;
           color:white;
           text-decoration:none;
           border-radius:5px;
         ">
        Reset Password
      </a>

      <p>
        This link will expire in 15 minutes.
      </p>

      <p>
        If you didn't request this, you can ignore this email.
      </p>
    `,
  });
};

export const sendWelcomeEmail = async (email, username, temporaryPassword) => {
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
                href="${process.env.FRONTEND_URL}/login/studentlogin"
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
