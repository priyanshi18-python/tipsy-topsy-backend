import * as authService from "../services/auth.services.js";

// ✅ Signup
export const signupController = async (req, res) => {
  try {
    const result = await authService.signupService(req.body);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      data: result.user,
      token: result.token
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// ✅ Login
export const loginController = async (req, res) => {
  try {
    const result = await authService.loginService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result.user,
      token: result.token
    });

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message
    });
  }
};