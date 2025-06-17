// Global state
let guests = []; // Array to store all guest objects
let guestId = 1; // Unique ID counter for each guest
const maxGuests = 10; // Maximum number of allowed guests

// DOM references
const form = document.getElementById("guestForm"); // Reference to the form element
const nameInput = document.getElementById("guestName"); // Input field where the guest name is entered
const categorySelect = document.getElementById("guestCategory"); // Dropdown menu to select guest category
const guestList = document.getElementById("guestList"); // Container where the guest list will be rendered
const guestCount = document.getElementById("guestCount"); // Span element showing current guest count
const emptyState = document.getElementById("emptyState"); // Element that displays the "no guests yet" message
const alertContainer = document.getElementById("alertContainer"); // Container to show alerts (like max guests reached)

// Initial setup when page loads -When DOM content is fully loaded, focus's on name input and render the guest list
window.addEventListener("DOMContentLoaded", () => {
  nameInput.focus(); // Set focus to input
  render(); // Display any initial content (usually empty state)
});

// Handler form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the page from reloading on submit

  const name = nameInput.value.trim(); // Get trimmed guest name
  const category = categorySelect.value; // Get selected category

  if (!name) return showAlert("Please enter a guest name."); // If name is empty, show an alert and exit
  if (guests.length >= maxGuests)
    return showAlert(`Maximum of ${maxGuests} guests allowed!`); // If the max number of guests is reached, alert and exit

  addGuest(name, category); // To add the new guest
  nameInput.value = "";
  nameInput.focus();
});

// Add a new guest to the list
function addGuest(name, category) {
  const guest = {
    id: guestId++, // Assign a unique ID and increment it
    name, // Guest name
    category, // Guest category (friend, family, colleague.)
    rsvp: "attending", // Default RSVP status
    addedTime: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }), // Time guest was added
  };

  guests.push(guest); // Add guest to array
  render(); // Refresh the UI
}

// Render guests or empty state
function render() {
  guestCount.textContent = guests.length; // Update counter
  // If no guests, show empty message
  if (guests.length === 0) {
    emptyState.style.display = "block";
    guestList.innerHTML = `<div class="empty-state">No guests added yet. Start building your guest list!</div>`;
    return;
  }

  emptyState.style.display = "none"; // Hide empty message
  // Map each guest into a block of HTML and render
  guestList.innerHTML = guests
    .map(
      (guest) => `
      <div class="guest-item">
        <div class="guest-info">
          <div class="guest-name">${escapeHtml(guest.name)}</div>
          <div class="guest-details">
            <span class="category-tag category-${guest.category}">${
        guest.category
      }</span>
            <span class="rsvp-status rsvp-${guest.rsvp.replace(" ", "-")}">${
        guest.rsvp
      }</span>
            <span>Added: ${guest.addedTime}</span>
          </div>
        </div>
        <div class="guest-actions">
          <button onclick="toggleRSVP(${guest.id})">Toggle RSVP</button>
          <button onclick="editGuest(${guest.id})">Edit</button>
          <button onclick="removeGuest(${guest.id})">Remove</button>
        </div>
      </div>`
    )
    .join(""); // Convert array of strings into one big HTML string
}

//Toggle RSVP status
function toggleRSVP(id) {
  const guest = guests.find((g) => g.id === id); // To Find guest by ID
  if (guest) {
    // Toggle between attending and not attending
    guest.rsvp = guest.rsvp === "attending" ? "not attending" : "attending";
    render(); // Re-render UI to reflect change
  }
}

// Edit guest name
function editGuest(id) {
  const guest = guests.find((g) => g.id === id); // Find guest by ID
  if (guest) {
    const newName = prompt("Edit guest name:", guest.name); // Ask for new name
    if (newName && newName.trim()) {
      guest.name = newName.trim(); // Update name
      render(); // Re-render list
    }
  }
}

// Remove guest from the list
function removeGuest(id) {
  guests = guests.filter((g) => g.id !== id); // Remove guest by ID
  render(); // Update UI
}

// Show temporary alert messages
function showAlert(message) {
  alertContainer.innerHTML = `<div class="alert">${message}</div>`; // Show alert
  setTimeout(() => {
    alertContainer.innerHTML = ""; // Remove it after 3 seconds
  }, 3000);
}
// Function to safely escape any HTML that users might input in the guest name
function escapeHtml(text) {
  const div = document.createElement("div"); // Create a temporary <div> element
  div.textContent = text; // Set the user-provided text as the textContent (not innerHTML)
  return div.innerHTML; // Return the HTML-encoded version of the text
}
