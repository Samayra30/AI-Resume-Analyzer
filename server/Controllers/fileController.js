const cloudinary = require("../config/cloudinary");
const File = require("../Models/file");
const ResumeAnalysis = require("../Models/ResumeAnalysis");
const generateResumeReport = require("../services/pdfService");
const User = require("../Models/User");

const streamifier = require("streamifier");
const pdfParse = require("pdf-parse");

const { analyzeResume } = require("../services/geminiService");
const sendResumeAnalysisEmail = require("../services/emailService");

// ===============================
// Upload Resume
// ===============================
const uploadFile = async (req, res) => {
  try {
    // ===============================
    // Check file
    // ===============================
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    // ===============================
    // Validate file type
    // ===============================
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only PDF, DOC and DOCX files are allowed.",
      });
    }

    // ===============================
    // Extract Resume Text
    // ===============================
    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      const pdfData = await pdfParse(req.file.buffer);

      extractedText = pdfData.text.trim();

      if (!extractedText) {
        return res.status(400).json({
          success: false,
          message: "No readable text found inside the PDF.",
        });
      }
    }

    // ===============================
    // AI Resume Analysis
    // ===============================
    const analysis = await analyzeResume(extractedText);


    // ===============================
    // Upload to Cloudinary
    // ===============================
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "MERN_FILE_UPLOADS",
        resource_type: "auto",
      },

      async (error, result) => {
        try {
          if (error) {
            return res.status(500).json({
              success: false,
              message: error.message,
            });
          }

          // ===============================
          // Save File Metadata
          // ===============================
          const newFile = await File.create({
            fileName: result.display_name,
            originalName: req.file.originalname,
            url: result.secure_url,
            publicId: result.public_id,
            fileType: result.resource_type,
            size: result.bytes,
            uploadedBy: req.user.id,
          });

          // ===============================
          // Save AI Report
          // ===============================
          const {
            atsScore,
            strengths,
            weaknesses,
            missingSkills,
            suggestions,
          } = analysis;

          await ResumeAnalysis.create({
            userId: req.user.id,
            fileId: newFile._id,
            atsScore,
            strengths,
            weaknesses,
            missingSkills,
            suggestions,
          });

          // ===============================
          // Send Email (Optional)
          // ===============================
          try {
            const user = await User.findById(req.user.id);

            const pdfPath = await generateResumeReport(
              user.name,
              req.file.originalname,
              analysis,
            );

            if (user) {
              await sendResumeAnalysisEmail(
                user.email,
                user.name,
                req.file.originalname,
                analysis,
                pdfPath,
              );
              
            }
          } catch (emailError) {
            console.error("Email Error:", emailError.message);
          }

          // ===============================
          // Response
          // ===============================
          return res.status(201).json({
            success: true,
            message: "Resume analyzed successfully.",
            file: newFile,
            analysis,
          });
        } catch (dbError) {
          console.error(dbError);

          return res.status(500).json({
            success: false,
            message: dbError.message,
          });
        }
      },
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadFile,
};
