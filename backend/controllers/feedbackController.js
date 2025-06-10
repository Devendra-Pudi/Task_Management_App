const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendFeedback = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required! 📝'
      });
    }

    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'pudidevendra127@gmail.com', // Replace with your email
      subject: `Task Magic Feedback: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">📧 New Feedback from Task Magic</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">💌 Feedback Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p><strong>👤 Name:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> ${email}</p>
              <p><strong>📋 Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h3 style="color: #333; margin-bottom: 15px;">💬 Message:</h3>
              <p style="line-height: 1.6; color: #555;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; font-size: 14px;">
                📅 Received on: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
          
          <div style="background: #333; color: white; text-align: center; padding: 15px;">
            <p style="margin: 0;">✨ Task Magic - Making productivity magical!</p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: '🎉 Feedback sent successfully!'
    });

  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({
      success: false,
      message: '😞 Failed to send feedback',
      error: error.message
    });
  }
};

module.exports = {
  sendFeedback
};
