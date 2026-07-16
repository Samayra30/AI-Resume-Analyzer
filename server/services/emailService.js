const resend = require("../config/resend");
const fs = require("fs");

const sendResumeAnalysisEmail = async (
  email,
  userName,
  fileName,
  analysis,
  pdfPath
) => {
  try {
    console.log("Preparing email...");

    // Read PDF
    const pdfBuffer = fs.readFileSync(pdfPath);

    const response = await resend.emails.send({
      from: "AI Resume Analyzer <onboarding@resend.dev>",
      to: email,
      subject: "🎉 Your AI Resume Analysis Report",

      html: `
      <!DOCTYPE html>
      <html>

      <head>
        <meta charset="UTF-8">

        <style>

          body{
            margin:0;
            padding:30px;
            background:#f4f7fb;
            font-family:Arial,Helvetica,sans-serif;
          }

          .container{
            max-width:700px;
            margin:auto;
            background:#ffffff;
            border-radius:12px;
            overflow:hidden;
            box-shadow:0 5px 20px rgba(0,0,0,.12);
          }

          .header{
            background:#2563eb;
            color:white;
            text-align:center;
            padding:35px;
          }

          .score{
            display:inline-block;
            margin-top:18px;
            background:#16a34a;
            color:white;
            padding:12px 30px;
            border-radius:50px;
            font-size:28px;
            font-weight:bold;
          }

          .content{
            padding:35px;
            color:#374151;
          }

          h2{
            color:#111827;
          }

          h3{
            color:#2563eb;
            margin-top:30px;
          }

          ul{
            padding-left:22px;
          }

          li{
            margin-bottom:8px;
          }

          .footer{
            background:#f3f4f6;
            text-align:center;
            padding:20px;
            color:#6b7280;
            font-size:14px;
          }

          .note{
            margin-top:25px;
            padding:15px;
            background:#eff6ff;
            border-left:5px solid #2563eb;
            border-radius:8px;
          }

        </style>

      </head>

      <body>

        <div class="container">

          <div class="header">

            <h1>🚀 AI Resume Analyzer</h1>

            <p>Your resume analysis is ready.</p>

            <div class="score">
              ATS Score : ${analysis.atsScore}/100
            </div>

          </div>

          <div class="content">

            <h2>Hello ${userName} 👋</h2>

            <p>
              Your resume
              <strong>${fileName}</strong>
              has been successfully analyzed.
            </p>

            <h3>📊 Quick Summary</h3>

            <ul>
              <li><strong>ATS Score:</strong> ${analysis.atsScore}/100</li>
              <li><strong>Strengths:</strong> ${analysis.strengths.length}</li>
              <li><strong>Weaknesses:</strong> ${analysis.weaknesses.length}</li>
              <li><strong>Missing Skills:</strong> ${analysis.missingSkills.length}</li>
            </ul>

            <div class="note">

              <strong>📎 Download Your Report</strong>

              <p>
                Your complete AI Resume Analysis Report is attached as a PDF.
              </p>

            </div>

            <br>

            <p>
              Thank you for using
              <strong>AI Resume Analyzer</strong>.
            </p>

            <p>
              Keep improving your resume and upload a new version anytime.
            </p>

          </div>

          <div class="footer">

            <strong>AI Resume Analyzer</strong>

            <br><br>

            Built with ❤️ using MERN, Gemini AI, Cloudinary & Resend

          </div>

        </div>

      </body>

      </html>
      `,

      attachments: [
        {
          filename: "Resume_Analysis_Report.pdf",
          content: pdfBuffer.toString("base64"),
        },
      ],
    });

    console.log("========== RESEND RESPONSE ==========");
    console.log(response);
    console.log("=====================================");

    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }

    console.log("Resume analysis email sent successfully.");
  } catch (error) {
    console.error("Resend Error:");
    console.error(error);

    throw error;
  }
};

module.exports = sendResumeAnalysisEmail;