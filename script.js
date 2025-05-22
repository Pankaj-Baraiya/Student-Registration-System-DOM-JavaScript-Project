const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function validateInputs(name, studentId, email, contact) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    /^[a-zA-Z ]+$/.test(name) &&
    /^\d+$/.test(studentId) &&
    emailRegex.test(email) &&
    /^\d+$/.test(contact)
  );
}

function renderTable() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button class="edit" onclick="editStudent(${index})">Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  students.splice(index, 1);
  saveToLocalStorage();
  renderTable();
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    saveToLocalStorage();
    renderTable();
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!name || !studentId || !email || !contact) {
    alert("All fields are required.");
    return;
  }

  if (!validateInputs(name, studentId, email, contact)) {
    alert("Invalid input. Please check your entries.");
    return;
  }

  students.push({ name, studentId, email, contact });
  saveToLocalStorage();
  renderTable();
  form.reset();
});

// Initial table render
renderTable();
