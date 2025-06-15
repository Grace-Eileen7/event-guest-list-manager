let guests = []; // Array to hold guest objects
let id = 1; // Unique ID counter for each guest

// DOM element references
const form = document.getElementById("guestForm");
const nameInput = document.getElementById("guestName");
const categorySelect = document.getElementById("guestCategory");
const container = document.getElementById("guestContainer");
const alertBox = document.getElementById("alertContainer");
const totalEl = document.getElementById("totalGuests");
const yesEl = document.getElementById("attendingGuests");
const noEl = document.getElementById("notAttendingGuests");
const countEl = document.getElementById("guestCount");

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const category = categorySelect.value;

  // Validation checks
  if (!name) return showAlert("Enter guest name", "error");
  if (guests.some((g) => g.name.toLowerCase() === name.toLowerCase()))
    return showAlert("Guest already exists", "error");
  if (guests.length >= 10) return showAlert("Max 10 guests allowed", "error");

  // Add new guest
  guests.push({
    id: id++,
    name,
    category,
    rsvp: "attending",
    time: new Date(),
  });

  // Reset form fields
  nameInput.value = "";
  categorySelect.value = "friend";
  render(); // Re-render guest list
});

// Render guest list or empty message
function render() {
  if (!guests.length) {
    container.innerHTML = `<div class="empty-display">
      <div class="empty-icon">📋</div>
      <h3>No Guests Registered</h3>
      <p>Add your first guest using the form</p></div>`;
    return;
  }

  // Generate HTML for each guest
  container.innerHTML =
    '<div class="guest-grid">' +
    guests
      .map(
        (g) => `
    <div class="guest-card">
      <div class="guest-card-header">
        <div class="guest-name">${g.name}</div>
        <div class="guest-category">${g.category}</div>
        <div class="guest-status ${
          g.rsvp === "attending" ? "" : "not-attending"
        }"></div>
      </div>
      <div class="guest-card-body">
        <div class="guest-meta">Status: ${
          g.rsvp === "attending" ? "Confirmed" : "Pending"
        } • ${g.time.toLocaleDateString()}</div>
        <div class="guest-actions">
          <button onclick="editGuest(${g.id})">Edit</button>
          <button onclick="toggle(${g.id})">Toggle</button>
          <button onclick="remove(${g.id})">Remove</button>
        </div>
      </div>
    </div>`
      )
      .join("") +
    "</div>";

  updateStats();

  // Show warning if guest count is near limit
  if (guests.length === 8) showAlert("2 spots left!", "warning");
}

// Update guest statistics
function updateStats() {
  const total = guests.length;
  const yes = guests.filter((g) => g.rsvp === "attending").length;
  const no = total - yes;
  totalEl.textContent = total;
  yesEl.textContent = yes;
  noEl.textContent = no;
  countEl.textContent = `${total} Guest${total !== 1 ? "s" : ""}`;
}

// Display a temporary alert message
function showAlert(msg, type) {
  alertBox.innerHTML = `<div class="alert ${type}">${msg}</div>`;
  setTimeout(() => (alertBox.innerHTML = ""), 3000);
}

// Remove a guest by ID
function remove(id) {
  guests = guests.filter((g) => g.id !== id);
  render();
}

// Toggle RSVP status of a guest
function toggle(id) {
  const g = guests.find((g) => g.id === id);
  if (g) g.rsvp = g.rsvp === "attending" ? "not-attending" : "attending";
  render();
}

// Edit guest name with validation
function editGuest(id) {
  const g = guests.find((g) => g.id === id);
  if (!g) return;
  const newName = prompt("New name:", g.name)?.trim();
  if (!newName) return;
  if (
    guests.some(
      (x) => x.id !== id && x.name.toLowerCase() === newName.toLowerCase()
    )
  ) {
    return showAlert("Name already exists", "error");
  }
  g.name = newName;
  render();
}

// Initialize stats on page load
updateStats();
