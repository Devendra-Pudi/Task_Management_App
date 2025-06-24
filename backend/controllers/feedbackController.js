// Load environment variables from .env file at the very start
require('dotenv').config();

const nodemailer = require('nodemailer');

/**
 * Creates and configures a Nodemailer transporter using credentials
 * from environment variables.
 */
const createTransporter = () => {
  const config = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  };

  // Log configuration (without sensitive data) for debugging
  console.log('Email Configuration:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.auth.user }
  });

  return nodemailer.createTransport(config);
};

/**
 * API Endpoint handler to send feedback emails.
 * Expects a POST request with { name, email, subject, message } in the body.
 */
const sendFeedback = async (req, res) => {
  try {
    console.log('Received feedback request:', {
      ...req.body,
      message: '(content hidden for privacy)'
    });

    const { name, email, subject, message } = req.body;

    // --- Input Validation ---
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields:', { name, email, subject, message: !!message });
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required! 📝'
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address. 📧'
      });
    }

    // Check if required environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.FEEDBACK_RECIPIENT_EMAIL) {
      console.error('Missing required environment variables for email configuration');
      return res.status(500).json({
        success: false,
        message: 'Server email configuration is incomplete. Please contact the administrator.'
      });
    }

    const transporter = createTransporter();

    // --- Email Content Configuration ---
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.FEEDBACK_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Task Magic Feedback: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📧 New Feedback from Task Magic</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px;">💌 Feedback Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <p style="margin: 10px 0;"><strong>👤 Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>📧 Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>📋 Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <h3 style="color: #333; margin-bottom: 15px;">💬 Message:</h3>
              <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #888; font-size: 12px;">
                Received on: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
          
          <div style="background: #333; color: white; text-align: center; padding: 15px; font-size: 14px;">
            <p style="margin: 0;">✨ Task Magic - Making productivity magical!</p>
          </div>
        </div>
      `
    };

    // --- Send Email ---
    console.log('Attempting to send email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    res.status(200).json({
      success: true,
      message: '🎉 Feedback sent successfully! Thank you.'
    });

  } catch (error) {
    // Log the detailed error for debugging
    console.error('Feedback error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      command: error.command
    });
    
    // Send a more specific error message based on the error type
    let errorMessage = '😞 Failed to send feedback due to an internal server error.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please contact the administrator.';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Could not connect to the email server. Please try again later.';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

module.exports = {
  sendFeedback
};
