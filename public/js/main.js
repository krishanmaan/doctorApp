const BASE_URL = 'https://doctorapp-pm2o.onrender.com'; // Replace with your backend URL

const fetchAppointments = () => {
  fetch(`${BASE_URL}/api/appointments`)
    .then(response => response.json())
    .then(data => {
      const doctorList = document.getElementById('doctors');
      doctorList.innerHTML = '';

      data.forEach(appointment => {
        const card = document.createElement('div');
        card.className = 'doctor-card';
        card.innerHTML = `
          <h3>${appointment.doctorName}</h3>
          <p>Patient: ${appointment.patientName}</p>
          <p>Date: ${new Date(appointment.date).toDateString()}</p>
          <p>Time: ${appointment.time}</p>
        `;
        doctorList.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching appointments:', error);
      alert('Failed to fetch appointments. Please try again later.');
    });
};

document.getElementById('createAppointmentForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const doctorName = formData.get('doctorName');
  const patientName = formData.get('patientName');
  const date = formData.get('date');
  const time = formData.get('time');

  if (!doctorName || !patientName || !date || !time) {
    alert('All fields are required.');
    return;
  }

  fetch(`${BASE_URL}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ doctorName, patientName, date, time }),
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to create appointment');
      return response.json();
    })
    .then(() => {
      alert('Appointment created successfully!');
      e.target.reset();
      fetchAppointments();
    })
    .catch(error => {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment. Please try again later.');
    });
});

// Fetch appointments on load
fetchAppointments();
