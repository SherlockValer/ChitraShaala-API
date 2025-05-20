function setSecureCookies(res, token) {
  const isDev = process.env.NODE_ENV !== "production";

  res.cookie("jwt", token, {
    path: "/",
    httpOnly: true,
    sameSite: "None", // this is crucial for cross-site
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    secure: !isDev,
  });

  return res;
}

module.exports = setSecureCookies;
