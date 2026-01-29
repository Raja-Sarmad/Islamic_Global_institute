// server.js
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Existing endpoint
app.post("/send-email", async (req, res) => {
  const { name, phone, email, course } = req.body;

  // Nodemailer transporter setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Free Trial Registration",
    text: `Name: ${name}\nPhone: ${phone}\nCourse: ${course}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ success: false, message: "Failed to send email" });
  }
});

// New endpoint for trial requests
app.post("/api/v1/trial-request", async (req, res) => {
  const { name, email, phone, message, course, gender } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !course) {
    return res.status(400).send({
      success: false,
      message: "Please fill in all required fields"
    });
  }

  // Nodemailer transporter setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL, // Send to admin email
    subject: "New Trial Request - Islamic Global Institute",
    text: `New trial request received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}\nGender: ${gender || 'Not specified'}\nMessage: ${message || 'No message'}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({
      success: true,
      message: "Trial request submitted successfully"
    });
  } catch (error) {
    console.error("Error sending trial request email:", error);
    res.status(500).send({
      success: false,
      message: "Failed to submit trial request"
    });
  }
});

// New endpoint for contact messages
app.post("/api/v1/contact/message", async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Validate required fields
  if (!name || !phone || !email || !message) {
    return res.status(400).send({
      success: false,
      message: "Please fill in all required fields"
    });
  }

  // Nodemailer transporter setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL, // Send to admin email
    subject: "New Contact Message - Islamic Global Institute",
    text: `New contact message received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({
      success: true,
      message: "Contact message sent successfully"
    });
  } catch (error) {
    console.error("Error sending contact message:", error);
    res.status(500).send({
      success: false,
      message: "Failed to send contact message"
    });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
