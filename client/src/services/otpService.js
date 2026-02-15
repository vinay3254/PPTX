import emailjs from "@emailjs/browser";

class OtpService {
  constructor() {
    this.SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    this.TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    this.PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log("SERVICE:", this.SERVICE_ID);
    console.log("TEMPLATE:", this.TEMPLATE_ID);
    console.log("PUBLIC:", this.PUBLIC_KEY);
  }

  async sendOTP(email) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const templateParams = {
      email: email,
      passcode: otp,
      time: "15 minutes"
    };

    try {
      await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      );

      console.log("✅ OTP sent via EmailJS:", otp);

      return { success: true, otp };
    } catch (error) {
      console.error("❌ EmailJS error:", error);
      return { success: false };
    }
  }

  verifyOTP(inputOtp, storedOtp) {
    return inputOtp === storedOtp;
  }
}

export default new OtpService();
