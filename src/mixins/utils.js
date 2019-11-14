export const utils = {
  methods: {
    generateLink(str) {
      return str
        .toLowerCase()
        .replace(
          /[çöüğşüı]/g,
          match => ({ ç: "c", ö: "o", ü: "u", ğ: "g", ş: "s", ı: "i" }[match])
        )
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    }
  }
};