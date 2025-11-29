export const calculateDOBFromAge = (ageYY, ageMM = 0, ageDD = 0) => {
    const today = new Date();
    const targetYear = today.getFullYear() - (parseInt(ageYY) || 0);
    const targetMonth = today.getMonth() - (parseInt(ageMM) || 0);
    const targetDay = today.getDate() - (parseInt(ageDD) || 0);
  
    const resultDate = new Date(targetYear, targetMonth, targetDay);
    
    return {
      dobYY: String(resultDate.getFullYear()),
      dobMM: String(resultDate.getMonth() + 1).padStart(2, '0'),
      dobDD: String(resultDate.getDate()).padStart(2, '0')
    };
  };
  
  export const calculateAgeFromDOB = (dobYY, dobMM, dobDD) => {
    if (!dobYY) return { ageYY: "", ageMM: "", ageDD: "" };
    
    const today = new Date();
    const birthYear = parseInt(dobYY);
    
    // Default to today's month/day if missing to allow partial calculation
    const birthMonth = dobMM ? parseInt(dobMM) - 1 : today.getMonth();
    const birthDay = dobDD ? parseInt(dobDD) : today.getDate();
    
    const birthDate = new Date(birthYear, birthMonth, birthDay);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    if (years < 0) return { ageYY: "0", ageMM: "0", ageDD: "0" };

    return { 
        ageYY: String(years), 
        ageMM: String(months), 
        ageDD: String(days) 
    };
};
