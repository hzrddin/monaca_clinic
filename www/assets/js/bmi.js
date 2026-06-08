// 1. Initialize data from LocalStorage (or empty array if first time)
let bmiRecords = JSON.parse(localStorage.getItem('bmiHistory')) || [];

// Run on page load to show existing data
renderLogs();

    function calculateBMI() {
      // Get values from input fields
      let weight = parseFloat(document.getElementById("weight").value);
      let height = parseFloat(document.getElementById("height").value);
      
      // Validate inputs
      if (!weight || !height || height <= 0) {
        document.getElementById("result").innerText = "Please enter valid values.";
        return;
      }
      
      // BMI formula
      var bmi = weight/(height * height);

     
      // Determine weight status
      let status = "";
      if (bmi < 18.5) {
        status = "Underweight";
      } else if (bmi < 25) {
        status = "Normal";
      } else if (bmi < 30) {
        status = "Overweight";
      } else {
        status = "Obese";
      }
      
      // Display result
      document.getElementById("resultBox").innerText = 
        "Your BMI is " + bmi.toFixed(2) + " (" + status + ")";

        alert(bmi);

        // 2. Create a Record Object
        const newRecord = {
            id: Date.now(), // Unique ID using timestamp
            date: new Date().toLocaleDateString(),
            bmiValue: bmi.toFixed(2),
            category: status
        };

        // 3. Update the Array and LocalStorage
        bmiRecords.push(newRecord);
        localStorage.setItem('bmiHistory', JSON.stringify(bmiRecords));

        renderLogs();
    }

    // 4. Function to render the table rows
function renderLogs() {
    const logBody = document.getElementById('bmiLogBody');
    logBody.innerHTML = ""; // Clear table first

    bmiRecords.forEach((record) => {
        const row = `
            <tr>
                <td>${record.date}</td>
                <td>${record.bmiValue}</td>
                <td><span class="badge ${record.category === 'Normal' ? 'bg-success' : 'bg-warning'}">${record.category}</span></td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord(${record.id})">Delete</button>
                </td>
            </tr>
        `;
        logBody.innerHTML += row;
    });
}

// 5. Function to delete a specific record
function deleteRecord(id) {
    bmiRecords = bmiRecords.filter(record => record.id !== id);
    localStorage.setItem('bmiHistory', JSON.stringify(bmiRecords));
    renderLogs();
}

function clearLogs() {
    bmiRecords = [];
    localStorage.removeItem('bmiHistory');
    renderLogs();
}