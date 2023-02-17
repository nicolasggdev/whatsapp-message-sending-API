const phoneNumberFormatter = function (countryCode, number) {
  let formatted = number.replace(/\D/g, "");

  if (countryCode) {
    formatted = countryCode + formatted.substr(1);
  }

  if (!formatted.endsWith("@c.us")) {
    formatted += "@c.us";
  }

  return formatted;
};

module.exports = { phoneNumberFormatter };
