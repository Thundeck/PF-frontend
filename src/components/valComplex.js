import { NotificationWarning } from "../utils/tostify.ts";

const valComplex = (form) => {
  const { name, cuit, address, website } = form;

  if (
    Object.values(form)
      .filter((keys) => keys !== "website")
      .includes("")
  ) {
    NotificationWarning(
      "all data must be complete, only the website is optional",
      "top-right"
    );
    return false;
  }

  //name
  if (
    !name.match(/[a-zÀ-ÿ]+\s?[a-zÀ-ÿ]+/i) &&
    !name.length > 3 &&
    !name.length <= 30
  ) {
    NotificationWarning(
      "The name must be between 3 and 30 characters long",
      "top-right"
    );
    return false;
  }

  //Adress
  if (
    !address.match(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+(\s\d+)?(,\s[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+\s\d+)?$/
    )
  ) {
    NotificationWarning("Enter a valid Address", "top-right");
    return false;
  }

  //Website
  if (!website.match(/^(http|https):\/\/[^ "]+$/)) {
    NotificationWarning(
      "Enter a valid website link, (https://www.example.com)",
      "top-right"
    );
    return false;
  }

  // Cuit
  if (!cuit.match(/^(20|23|27|30|33)-?[0-9]{8}-?[0-9]$/)) {
    NotificationWarning("Enter a valid CUIT", "top-right");
    return false;
  }

  return true;
};

export default valComplex;
