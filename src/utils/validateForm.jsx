export const validateForm = (formData) => {
  const newErrors = {};

  if (!formData.firstName.trim())
    newErrors.firstName = "First name is required";
  if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Please enter a valid email";
  }

  if (!formData.phone) {
    newErrors.phone = "Phone number is required";
  } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
    newErrors.phone = "Please enter a valid 10-digit phone number";
  }

  if (!formData.dob) newErrors.dob = "Date of birth is required";

  if (!formData.gender) newErrors.gender = "Please select gender";

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  if (!formData.acceptTerms) {
    newErrors.acceptTerms = "You must accept the terms and conditions";
  }

  return newErrors;
};

export const getPasswordStrengthColor = (passwordStrength) => {
  switch (passwordStrength) {
    case 0:
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-yellow-500";
    case 3:
      return "bg-blue-500";
    case 4:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
};

export const getPasswordStrengthText = (passwordStrength) => {
  switch (passwordStrength) {
    case 0:
      return "Very Weak";
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
      return "Strong";
    default:
      return "";
  }
};
