import { serialize } from "cookie";

export const setCookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === "object" ? "j" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

export const clearCookie = (res, name) => {
  res.setHeader(
    "Set-Cookie",
    serialize(name, null, { expires: Date.now() + 1, maxAge: 0 })
  );
};
