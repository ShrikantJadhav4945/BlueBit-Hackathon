// popup.js
const API_KEY = 'AIzaSyB4GGyjNqfH9fhJ2OllgMCJhA-OPtZZR30';
const CX = '71bd2f794eb8f4af0'; // Replace with your real search engine ID

function searchJobs() {
  const query = document.getElementById("search-input").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Searching...";

  fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => {
      resultsDiv.innerHTML = "";
      const items = data.items || [];

      if (items.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
      }

      items.forEach((item) => {
        const div = document.createElement("div");
        div.className = "result-item";
        div.innerHTML = `
          <a href="${item.link}" target="_blank">${item.title}</a>
          <p>${item.snippet}</p>
        `;
        resultsDiv.appendChild(div);
      });
    })
    .catch((error) => {
      resultsDiv.innerHTML = "<p>Error fetching data.</p>";
      console.error("Error:", error);
    });
}

// Attach event listener after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search-btn").addEventListener("click", searchJobs);
});
