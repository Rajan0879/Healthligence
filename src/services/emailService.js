import emailjs from '@emailjs/browser';


const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


emailjs.init({ publicKey: PUBLIC_KEY });


export const sendRegistrationEmail = (data) => {

  const templateParams = {
    to_name: `${data.firstName} ${data.lastName}`,
    to_email: data.email,
    mobile: data.mobile,
    registration_number: data.primaryRegNo,
    gender: data.gender,
    age: data.ageYY,
    address: `${data.address1}, ${data.address2}, ${data.city}, ${data.state}, ${data.pin}`,

  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      return response;
    })
    .catch((err) => {
      console.error('Failed to send email:', err);
      throw err;
    });
};
