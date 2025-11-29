export const REGEX = {
  mobile: /^[0-9]{10}$/,
  name: /^[A-Za-z\s]{2,}$/,
  pin: /^[0-9]{6}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  number: /^[0-9]+$/,
};

export const validateName = (name) => {
  if (!name || !name.trim()) return "Required";
  if (!REGEX.name.test(name)) return "Min 2 chars, alphabets only";
  return null;
};

export const validateMobile = (mobile) => {
  if (!mobile) return "Required";
  if (!REGEX.mobile.test(mobile)) return "Must be 10 digits";
  return null;
};

export const validateAge = (age) => {
  if (age === "" || age === null) return "Required";
  const val = parseInt(age, 10);
  if (isNaN(val) || val < 0 || val > 120) return "0-120 only";
  return null;
};

export const validateDOB = (dobYY, dobMM, dobDD) => {
    if (!dobYY || !dobMM || !dobDD) return "Required";
    const year = parseInt(dobYY, 10);
    const month = parseInt(dobMM, 10);
    const day = parseInt(dobDD, 10);
    
    if (isNaN(year) || isNaN(month) || isNaN(day)) return "Invalid Date";
    
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return "Invalid Date";
    }
    return null;
};

export const validateEmail = (email) => {
    if (email && !REGEX.email.test(email)) return "Invalid email";
    return null;
};

export const validatePincode = (pin) => {
    if (!pin) return "Required";
    if (!REGEX.pin.test(pin)) return "Must be 6 digits";
    return null;
};

export const validateKinNumber = (number) => {
    if (!number) return "Required";
    if (!REGEX.mobile.test(number)) return "Must be 10 digits";
    return null;
};


export const blockNonDigits = (e) => {

    if (['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) return;
    

    if (e.ctrlKey || e.metaKey) return;
    

    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
};

export const blockNonAlphabets = (e) => {

    if (['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', ' '].includes(e.key)) return;
    

    if (e.ctrlKey || e.metaKey) return;


    if (!/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
    }
};
