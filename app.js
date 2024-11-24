// Select the form and doctor list container
const createAppointmentForm = document.getElementById('createAppointmentForm');
const doctorsContainer = document.getElementById('doctors');

// Function to save appointment to localStorage
function saveAppointment(appointment) {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Function to load appointments from localStorage
function loadAppointments() {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  doctorsContainer.innerHTML = ''; // Clear the container before rendering

  appointments.forEach((appointment, index) => {
    const doctorCard = document.createElement('div');
    doctorCard.classList.add('doctor-card');
    doctorCard.innerHTML = `
      <h3>${appointment.doctorName}</h3>
      <p><strong>Patient:</strong> ${appointment.patientName}</p>
      <p><strong>Date:</strong> ${appointment.date}</p>
      <p><strong>Time:</strong> ${appointment.time}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    doctorsContainer.appendChild(doctorCard);
  });
}

// Function to handle form submission
createAppointmentForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent page reload

  // Get form values
  const doctorName = document.getElementById('doctorName').value;
  const patientName = document.getElementById('patientName').value;
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;

  // Create appointment object
  const appointment = {
    doctorName,
    patientName,
    date,
    time,
  };

  // Save the appointment and reload the list
  saveAppointment(appointment);
  loadAppointments();

  // Reset the form
  createAppointmentForm.reset();
});

// Function to delete an appointment
function deleteAppointment(index) {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments.splice(index, 1); // Remove the selected appointment
  localStorage.setItem('appointments', JSON.stringify(appointments));
  loadAppointments();
}

// Event listener for delete buttons
// Using event delegation to handle dynamically added elements
doctorsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.getAttribute('data-index');
    deleteAppointment(index);
  }
});

// Load appointments on page load
loadAppointments();
