document.getElementById('loginForm').addEventListener('submit', function(event) {
  // Stop default page refresh
  event.preventDefault(); 
  
  // Bootstrap Validation
  if (!this.checkValidity()) {
    event.stopPropagation();
    this.classList.add('was-validated'); 
    return; 
  }
  
  this.classList.add('was-validated'); 

  // Grab the data
  const formData = new FormData(this);
  const payload = {
    username: formData.get('username'),
    password: formData.get('password')
  };

  const serverUrl = 'https://chowder-cosmetics-reentry.ngrok-free.dev/myclinic/login.php'; 

  // Send to backend
  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    // Check what login.php said
    if(data.status === 'success') {
      alert(data.message);
      // SUCCESS! Redirect the user into the app
      window.location.href = 'home.html';
    } else {
      // Failed login (wrong password or user not found)
      alert('Login Failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Could not connect to the server. Is ngrok running?');
  });
});