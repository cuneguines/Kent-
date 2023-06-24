//Button click create user
document.addEventListener('DOMContentLoaded', () => {
  const createButton = document.getElementById('createButton');
  createButton.addEventListener('click', event => createUser(event));

  fetchUsers();
});

function createUser(event) {
  event.preventDefault();
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');

  const user = {
    name: nameInput.value,
    email: emailInput.value
  };

  fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse the JSON response
      } else if (response.status === 204) {
        return null; // Return null for empty response
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    })
    .then(createdUser => {
      if (createdUser === null) {
        // Handling empty response
        console.log('Empty response');
      } else {
        fetchUsers(); 
        nameInput.value = '';
        emailInput.value = '';
      }
    })
    .catch(error => {
      //  any errors
      console.error('Error:', error);
    });
}

function fetchUsers() {
  fetch('http://localhost:5000/users')
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse the JSON response
      } else if (response.status === 204) {
        return null; // Return null for empty response
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    })
    .then(users => {
      if (users === null) {
        // empty response
        console.log('Empty response');
      } else {
        const userList = document.getElementById('users');
        userList.innerHTML = '';

        //  table
        const table = document.createElement('table');
        table.style.width = '100%';
        //table.style.borderCollapse = 'collapse';
        table.style.backgroundColor = 'lightblue'
        // table head
        const thead = document.createElement('thead');
        const headingRow = document.createElement('tr');

        const nameHeader = document.createElement('th');
        nameHeader.style.backgroundColor = '#00898f';
        nameHeader.style.padding = '8px';
        nameHeader.textContent = 'Name';
        headingRow.appendChild(nameHeader);

        const emailHeader = document.createElement('th');
        emailHeader.style.backgroundColor = '#00898f';
        emailHeader.style.padding = '8px';
        emailHeader.textContent = 'Email';
        headingRow.appendChild(emailHeader);

        const actionHeader = document.createElement('th');
        actionHeader.style.backgroundColor = '#00898f';
        actionHeader.style.padding = '8px';
        actionHeader.textContent = 'Actions';
        headingRow.appendChild(actionHeader);

        thead.appendChild(headingRow);
        table.appendChild(thead);

        // Create the table body
        const tbody = document.createElement('tbody');

        users.forEach(user => {
          const row = document.createElement('tr');

          const nameCell = document.createElement('td');
          nameCell.style.padding = '8px';
          nameCell.textContent = user.name;
          row.appendChild(nameCell);

          const emailCell = document.createElement('td');
          emailCell.style.padding = '8px';
          emailCell.textContent = user.email;
          row.appendChild(emailCell);

          const actionCell = document.createElement('td');
          actionCell.style.padding = '8px';

          const deleteButton = document.createElement('button');
          deleteButton.style.marginLeft = '4px';
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deleteUser(user.id));
          actionCell.appendChild(deleteButton);

          const updateButton = document.createElement('button');
          updateButton.style.marginLeft = '4px';
          updateButton.textContent = 'Update';
          updateButton.addEventListener('click', () => updateUser(user.id));
          actionCell.appendChild(updateButton);

          row.appendChild(actionCell);

          tbody.appendChild(row);
        });

        table.appendChild(tbody);

        userList.appendChild(table);
      }
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
}



function deleteUser(userId) {
  event.preventDefault();
  fetch(`http://localhost:5000/users/${userId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
       
        fetchUsers(); // Refresh the user list after deletion
        window.location.reload(); 
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    })
    .catch(error => {
      //  errors
      console.error('Error:', error);
    });
}

function updateUser(userId) {
  //  new name and new email from user input
  const newName = prompt('Enter the new name:');
  const newEmail = prompt('Enter the new email:');

  if (newName || newEmail) {
    //  updated user data
    const updatedUser = {};

    if (newName) {
      updatedUser.name = newName;
    }

    if (newEmail) {
      updatedUser.email = newEmail;
    }

    // PUT request to update the user
    fetch(`http://localhost:5000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
      .then(response => {
        if (response.ok) {
          //  successful response
          console.log(updatedUser.name);
          console.log(updatedUser.email);
          console.log('User updated successfully');
          fetchUsers(); // Refresh the user list after update
        } else {
          //  failure response
          throw new Error('Request failed with status ' + response.status);
        }
      })
      .catch(error => {
        // errors 
        console.error('Error:', error);
      });
  }
}
