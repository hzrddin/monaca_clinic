    const BASE_URL = "https://chowder-cosmetics-reentry.ngrok-free.dev/myclinic/";

    function fetchUsers() {
      fetch(BASE_URL + "getUsers.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request: "list_users" })
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          const tbody = document.getElementById("userTableBody");
          let rows = "";
          data.data.forEach(user => {
            rows += `
              <tr>
                <td>${user.noid}</td>
                <td contenteditable="true" id="name-${user.noid}">${user.userName || "-"}</td>
                <td contenteditable="true" id="address-${user.noid}">${user.userAdd || "-"}</td>
                <td contenteditable="true" id="phone-${user.noid}">${user.phone || "-"}</td>
                <td contenteditable="true" id="username-${user.noid}">${user.user_name || "-"}</td>
                <td contenteditable="true" id="status-${user.noid}">${user.userStatus || "-"}</td>
                <td>
                  <button class="btn btn-success btn-sm" onclick="updateUser(${user.noid})">Save</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.noid})">Delete</button>
                </td>
              </tr>`;
          });
          tbody.innerHTML = rows;
        } else {
          alert("Failed to load users");
        }
      })
      .catch(err => alert("Error: " + err));
    }

    function updateUser(id) {
      const name = document.getElementById(`name-${id}`).innerText;
      const address = document.getElementById(`address-${id}`).innerText;
      const phone = document.getElementById(`phone-${id}`).innerText;
      const username = document.getElementById(`username-${id}`).innerText;
      const status = document.getElementById(`status-${id}`).innerText;

      fetch(BASE_URL + "updateUser.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, address, phone, username, status })
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (data.status === "success") fetchUsers();
      })
      .catch(err => alert("Error: " + err));
    }

    function deleteUser(id) {
      if (!confirm("Are you sure you want to delete this user?")) return;

      fetch(BASE_URL + "deleteUser.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (data.status === "success") fetchUsers();
      })
      .catch(err => alert("Error: " + err));
    }