const API_URL = "http://localhost:5500/api/courses";
// Function to load all courses dynamically
async function loadCourses() {
  const res = await fetch(API_URL);
  const courses = await res.json();

  // Load courses into the "Managers" section
  const managersSection = document.querySelector(".row"); // The first .row in your code
  managersSection.innerHTML = ""; // Clear existing content

  courses.forEach((course) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-12", "col-sm-6", "col-md-6", "col-lg-3");

    colDiv.innerHTML = `
      <article class="article">
        <div class="article-header">
          <div class="article-image" style="background-image: url(${course.image})"></div>
          <div class="article-title">
            <h2><a href="#">${course.title}</a></h2>
          </div>
        </div>
        <div class="article-details">
          <p>${course.description}</p>
          <div class="article-cta">
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </article>
    `;

    managersSection.appendChild(colDiv);
  });
}

// Function to delete a course
async function deleteCourse(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadCourses(); // Reload the courses after deletion
}

// Handle form submission to add a new course
const form = document.getElementById("course-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const course = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    image: document.getElementById("image").value,
    videoUrl: document.getElementById("videoUrl").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });

  form.reset();
  loadCourses(); 
});


loadCourses();
