import React, { useState } from 'react';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import SuccessScreen from './components/SuccessScreen';

import { sendRegistrationEmail } from './services/emailService';


const App = () => {
  const [currentScreen, setCurrentScreen] = useState('register');
  const [registrationData, setRegistrationData] = useState(null);

  const handleRegistrationSubmit = async (data) => {

    setRegistrationData(data);
    setCurrentScreen('success');


    if (data.email) {
      try {
        await sendRegistrationEmail(data);
        console.log("Registration email sent.");
      } catch (error) {
        console.error("Error sending registration email:", error);

      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <Header currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <main>
        {currentScreen === 'register' ? (
          <RegistrationForm onSubmit={handleRegistrationSubmit} />
        ) : (
          <SuccessScreen data={registrationData} />
        )}
      </main>
    </div>
  );
};

export default App;