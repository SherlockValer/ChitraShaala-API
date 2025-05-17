function setSecureCookies(res, token) {
  res.cookie("access_token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "None", // this is crucial for cross-site
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}

module.exports = setSecureCookies;
