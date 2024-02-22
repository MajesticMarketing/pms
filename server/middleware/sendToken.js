export const sendToken = async (user, statusCode, res, message) => {
  const token = user.getAuthToken();
  if (!token) {
    res.status(401).json({
      success: false,
      code: statusCode || 500,
      message: message || "Unauthorized",
    });
  }
  //set the access token cookie
  const options = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, message, user });
};
