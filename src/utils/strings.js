// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export const getRandomString = (length = 10) => {
  let result = "";
  const charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    result += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  return result;
};
