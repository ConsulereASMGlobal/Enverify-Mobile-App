import * as Yup from "yup";

const phoneRegExp = /^\d{10}$/;
const fullNameRegExp = /\s{1,}/;
const otpRegExp = /^(?=.{4}$).*/;
const passwordRegExp =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const maxTwoDecimalRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;

export const loginSchema = Yup.object().shape({
  mobile: Yup.string().required("Mobile Number is required!"),
  // .matches(phoneRegExp, "Mobile number is not valid"),
  password: Yup.string()
    .required("Password is required!")
    .min(4, "Password must contain at least 4 characters"),
});
export const forgotSchema = Yup.object().shape({
  mobile: Yup.string().required("Mobile Number is required!"),
  // .matches(phoneRegExp, "Mobile number is not valid"),
});
export const otpSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is required!"),
});

export const receivingDateSchema = Yup.object().shape({
  date: Yup.string().required("Date is required!"),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required!")
    .min(2, "First name must contain at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required!")
    .min(2, "Last name must contain at least 2 characters"),
  email: Yup.string()
    .required("Email is required!")
    .email("Please enter a valid email format!"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(
      passwordRegExp,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  cPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});
export const collectorSchema = Yup.object().shape({
  // storeName: Yup.string()
  //   .required('Store name is required!')
  //   .min(2, 'Store name must contain at least 2 characters')
});
export const pickUpSchema = Yup.object().shape({
  lotNumber: Yup.string().required("Lot Number is required!"),
  // province: Yup.string().required('Province is required!'),
  // city: Yup.string().required('City is required!'),
  barangay: Yup.string().required("Barangay is required!"),
});
export const walletSchema = Yup.object().shape({});

export const qrSchema = Yup.object().shape({
  // mobile: Yup.string()
  //   .required('Mobile Number is required')
  //   .matches(phoneRegExp, 'Mobile number is not valid'),
  // name: Yup.string()
  //   .required('Name is required !')
  //   .min(2, 'Name must contain at least 2 characters'),
  // org: Yup.string()
  //   .required('Organization name is required !')
  //   .min(2, 'Org name must contain at least 2 characters')
});

export const newAccountSchema = Yup.object().shape({});

export const individualSignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required("Phone Number is required"),

  fullName: Yup.string()
    .required("Your name is required !")
    .min(2, "Your name must contain at least 2 characters"),

  dob: Yup.date()
    .nullable()
    .transform((v: any) => (v instanceof Date && !isNaN(v as any) ? v : null))
    .required("Date of birth is required !")
    .max(new Date(), "You can't be born in the future!"),
  email: Yup.string()
    .required("Email is required !")
    .email("Please enter a valid email format !"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(
      passwordRegExp,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  cPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

export const institutionalSignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required("Phone Number is required"),
  panNumber: Yup.string()
    .required("Phone Number is required")
    .min(8, "Enter the valid pan number"),

  fullName: Yup.string()
    .required("Your name is required !")
    .min(2, "Your name must contain at least 2 characters"),

  email: Yup.string()
    .required("Email is required !")
    .email("Please enter a valid email format !"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(
      passwordRegExp,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  cPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required !")
    .email("Please enter a valid email format !"),
});

export const phoneSchema = Yup.object().shape({
  phone: Yup.string().required("Phone number is required !"),
});

export const signUpDataSchema = Yup.object().shape({
  email: Yup.string()
    .min(5, "Too Short!. Minimum length is 5")
    .max(30, "Too Long!. Maximum length is 30")
    .email("Email Address is invalid")
    .required("Email Address is required"),
  phoneNumber: Yup.string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required("Phone Number is required"),
  fullName: Yup.string()
    .required("Please enter your Full Name")
    .matches(fullNameRegExp, "Family name is missing"),
});
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("New Password is required!")
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(
      passwordRegExp,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  cPassword: Yup.string()
    .required("Confirm Password is required!")
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});
export const forgotPasswordDataSchema = Yup.object().shape({
  username: Yup.string().required("Please eneter your username"),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required!"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .required("New Password is required!")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(
      passwordRegExp,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  cPassword: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required!"),
});

export const otpDataSchema = Yup.string()
  .required("OTP is required")
  .matches(otpRegExp, "OTP Must be 4 digit");
export const quantityPickchema = Yup.object().shape({
  // quantity: Yup.string()
  // .required('Quantity is required')
});

export const recoverPasswordDataSchema = Yup.object().shape({
  email: Yup.string()
    .min(5, "Too Short!. Minimum length is 5")
    .max(30, "Too Long!. Maximum length is 30")
    .email("Email Address is invalid")
    .required("Email Address is required"),
});

export const accountDeactivateSchema = Yup.object().shape({});

export const productionBasicDataSchema = Yup.object().shape({
  date: Yup.string().required("Date is required!"),
});

export const sortingDataSchema = Yup.object().shape({
  wastage: Yup.string().matches(
    maxTwoDecimalRegExp,
    "Quantity should have at most two decimal places"
  ),
  // operatingHours: Yup.string().required("Operating hours is required!"),
  // teamSize: Yup.string().required("Crew size is required!"),
  // inputQuantity: Yup.string()
  //   .required("Input quantity is required!")
  //   .matches(
  //     maxTwoDecimalRegExp,
  //     "Quantity should have at most two decimal places"
  //   ),
});
