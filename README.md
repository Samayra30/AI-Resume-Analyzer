# AI Resume Analyzer

An AI-powered Resume Analyzer built with the MERN Stack that allows users to securely upload resumes, extract text, analyze them using Google's Gemini AI, store files on Cloudinary, and receive a professional PDF report via email.

---

## Features

-  JWT Authentication (Signup/Login)
-  Cloudinary File Upload
-  Resume Upload (PDF, DOC, DOCX)
-  PDF Text Extraction using pdf-parse
-  AI Resume Analysis using Google Gemini
-  ATS Score Generation
-  Resume Strengths Detection
-  Weakness Identification
-  Missing Skills Detection
-  Personalized Improvement Suggestions
-  MongoDB Storage for Resume Analysis
-  Professional Email Delivery using Nodemailer
-  Downloadable PDF Resume Report
-  Responsive React Frontend

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## AI

- Google Gemini API

## File Storage

- Cloudinary
- Multer
- Streamifier

## Email

- Nodemailer

## PDF

- PDFKit
- pdf-parse

---

# 📂 Project Structure

```
AI-Resume-Analyzer
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── temp
│
├── frontend
│   ├── src
│   ├── components
│   ├── api
│   └── pages
│
└── README.md
```

# 📖 Workflow

```
User Login
      │
      ▼
Upload Resume
      │
      ▼
Multer receives file
      │
      ▼
Extract Resume Text
      │
      ▼
Gemini AI Analysis
      │
      ▼
Generate ATS Score
      │
      ▼
Generate PDF Report
      │
      ▼
Upload Resume to Cloudinary
      │
      ▼
Save Analysis in MongoDB
      │
      ▼
Email PDF Report to User
```

---

# 📊 AI Report Includes

- ATS Score
- Resume Strengths
- Weaknesses
- Missing Skills
- AI Suggestions

---

# 📧 Email Report

Every successful analysis automatically sends a professionally formatted email containing:

- ATS Score
- Resume Summary
- PDF Report Attachment

---

# ☁️ Cloudinary

Uploaded resumes are securely stored on Cloudinary while metadata is saved in MongoDB.

---



# 🔮 Future Improvements

- Email Verification
- Resume History
- Job Description Matching
- AI Interview Questions
- Resume Version Comparison
- Download Analysis Dashboard
- Admin Dashboard
- Resume Templates
- Multi-language Resume Analysis

---


# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
