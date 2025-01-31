// Import required modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express app
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the port number
const PORT = 3000;

// Route for the home page (appointment form)
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'appointment.html'));
});

// Route for the confirmation page
app.get('/confirmation', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'confirm.html'));
});

// Store appointments in memory
const appointments = [];

// Handle appointment submission
app.post('/submit-appointment', (req, res) => {
    const appointment = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        date: req.body.date,
        time: req.body.time,
        timestamp: new Date()
    };

    appointments.push(appointment);
    console.log(appointments);

    res.sendFile(path.resolve(__dirname, 'views', 'confirm.html'));
});

// Admin route to view all appointments
app.get('/admin/appointments', (req, res) => {
    let html = '<h1>All Appointments</h1><ul>';
    for (const apt of appointments) {
        html += `<li>${apt.firstName} ${apt.lastName} - ${apt.date} at ${apt.time} (Submitted: ${apt.timestamp})</li>`;
    }
    html += '</ul><a href="/">Back to Home</a>';
    res.send(html);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
