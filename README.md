# 🎉 Event Guest List Manager

A simple interactive web app that allows users to manage a guest list for an event. Guests can be added, removed, edited, and marked as attending or not — all without reloading the page.

---

## 📋 Description

This project was created for **Week 2 Code Challenge** as part of a JavaScript learning module. The challenge is to build a working guest list manager that allows a user to:

- Add a guest by typing their name and submitting the form
- Display the guest in a list on the page
- Remove a guest from the list
- Limit the guest list to 10 people
- Toggle RSVP status between **Attending** and **Not Attending**

It emphasizes real-world DOM manipulation, event handling, and dynamic rendering of data using **JavaScript**.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

---

## 📁 File Structure

```
project-root/
├── index.html              # The main HTML layout
├── style.css               # Styling for the app
├── src/
│   └── script.js           # JavaScript logic (formerly index.js)
├── assets/
│   ├── favicon.png         # App favicon
│   └── screenshot.png      # Screenshot of the app UI

```

---

## 🖼️ Screenshot

![Screenshot](./assets/Screenshot%202025-06-17%20112905.png)

---

## 🧪 Testing and How to Run the Project

You can run this app directly in your browser. No installations are required.

### ✅ Option 1: Run on Your Local Machine

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/event-guest-list-manager.git
   ```

2. **Navigate into the project folder**

   ```bash
   cd event-guest-list-manager
   ```

3. **Open `index.html` in your browser**
   - Double-click on `index.html`
   - Or right-click and choose **"Open with" > Browser**

> 💡 You don’t need a server or compiler to run this project.

---

## ▶️ Usage

Once the app is open in your browser:

- Enter a guest name in the input field and click **"Submit"**.
- The guest will be added to the list with:
  - A **Remove** button to delete the guest
  - A **Toggle RSVP** button to mark attending or not attending
- Guests will be restricted to 10; the app alerts if the limit is reached.
- Extra features like category labels, timestamps, and edit options can be added as stretch goals.

---

## 👩‍💻 Author

**Grace Eileen Bass**

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

### 📚 Related Learning Goals

- DOM Manipulation using JavaScript
- Form Handling and Event Listeners
- `event.preventDefault()` usage
- Creating interactive UIs without page reloads

---
