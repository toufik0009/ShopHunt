const sendToSheet = async (formData) => {
  const formBody = new URLSearchParams(formData).toString();
  const res = await fetch('https://script.google.com/macros/s/AKfycbx14fpq1Lqtv8--WMM3jvn8AiMBitHCLkInizwfhUqX0C5C0HH8moe7X8is0TPfiL2N/exec', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody
  });
  
  const data = await res.json();
  return data;
};

export default sendToSheet;
