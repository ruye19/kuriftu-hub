
const API_URL = "http://localhost:5500/api/feedback"; 
async function submitFeedback(event) {
  event.preventDefault(); 
  const feedback = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  });

  if (response.ok) {
    alert("Feedback submitted successfully!");
    document.querySelector("form").reset(); 
  } else {
    alert("Failed to submit feedback. Please try again later.");
  }
}
document.querySelector("form").addEventListener("submit", submitFeedback);
