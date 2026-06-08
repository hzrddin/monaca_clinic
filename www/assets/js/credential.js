document.getElementById('signupForm').addEventListener('submit', function(event) {
  // stop the page from refreshing
  event.preventDefault(); 
  
  // BOOTSTRAP VALIDATION CHECK
  if (!this.checkValidity()) {
    event.stopPropagation();
    this.classList.add('was-validated'); 
    return;
  }
  
  // If the code gets here, the form is 100% valid.
  this.classList.add('was-validated'); 

  // 3. Prepare the data for PHP
  const formData = new FormData(this);
  const payload = {
    name: formData.get('firstname') + ' ' + formData.get('lastname'),
    address: formData.get('city') + ', ' + formData.get('state') + ' ' + formData.get('zip'),
    username: formData.get('username'),
    phone: formData.get('phone'), 
    password: formData.get('password')
  };

  // 🔴 PASTE YOUR NGROK URL HERE 🔴
  const serverUrl = 'https://chowder-cosmetics-reentry.ngrok-free.dev'; 

  // 4. Send to backend
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
    if(data.status === 'success') {
      alert('Success: ' + data.message);
    } else {
      alert('Error: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Could not connect to the ngrok server. Is it running?');
  });
});