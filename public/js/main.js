document.addEventListener('DOMContentLoaded', () => {
    // Existing code for fetching appointments
    const fetchAppointments = () => {
      fetch('/api/appointments')
        .then(response => response.json())
        .then(data => {
          const doctorList = document.getElementById('doctors');
          doctorList.innerHTML = ''; // Clear previous data
  
          // Populate doctor cards
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
  
    // Fetch appointments on page load
    fetchAppointments();
  
    // Add event listener for creating a new appointment
    document.getElementById('createAppointmentForm').addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form submission from reloading the page
  
      // Get form data
      const formData = new FormData(e.target);
      const doctorName = formData.get('doctorName');
      const patientName = formData.get('patientName');
      const date = formData.get('date');
      const time = formData.get('time');
  
      // Validation
      if (!doctorName || !patientName || !date || !time) {
        alert('All fields are required.');
        return;
      }
  
      // POST request to create a new appointment
      fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorName, patientName, date, time }),
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to create appointment');
          return response.json();
        })
        .then(data => {
          alert('Appointment created successfully!');
          e.target.reset(); // Clear form
          fetchAppointments(); // Refresh appointments list
        })
        .catch(error => {
          console.error('Error creating appointment:', error);
          alert('Failed to create appointment. Please try again later.');
        });
    });
  });
  