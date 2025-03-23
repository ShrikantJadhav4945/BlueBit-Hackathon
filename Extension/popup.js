// Constants
const API_KEY = 'AIzaSyBD85a-q01Ml3x1Ov3NcT_c70lM5oFCWmg';
const CX = 'b517a1021b95f4a54'
// Store current view state
let currentView = 'search';
let searchResults = [];
let savedJobs = [];
let isLoading = false;

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Load saved jobs from storage
  loadSavedJobs();
  
  // Set up event listeners
  document.getElementById("search-btn").addEventListener("click", searchJobs);
  document.getElementById("search-tab").addEventListener("click", showSearchView);
  document.getElementById("saved-tab").addEventListener("click", showSavedJobsView);
  
  // Search on Enter key
  document.getElementById("search-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchJobs();
    }
  });

  // Initial view setup
  showSearchView();
});

// Load saved jobs from Chrome storage
function loadSavedJobs() {
  if (chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['savedJobs'], (result) => {
      savedJobs = result.savedJobs || [];
    });
  } else {
    // Fallback to localStorage for testing outside Chrome
    const savedJobsStr = localStorage.getItem('savedJobs');
    savedJobs = savedJobsStr ? JSON.parse(savedJobsStr) : [];
  }
}

// Save jobs to Chrome storage
function saveSavedJobs() {
  if (chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ 'savedJobs': savedJobs });
  } else {
    // Fallback to localStorage for testing outside Chrome
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }
}

// Animation helper function
function animateElementFade(element, direction) {
  // Remove any existing transition classes
  element.classList.remove("fade-enter", "fade-enter-active", "fade-exit", "fade-exit-active");
  
  if (direction === 'in') {
    // Fade in
    element.classList.add("fade-enter");
    setTimeout(() => {
      element.classList.remove("fade-enter");
      element.classList.add("fade-enter-active");
    }, 10);
  } else {
    // Fade out
    element.classList.add("fade-exit");
    setTimeout(() => {
      element.classList.remove("fade-exit");
      element.classList.add("fade-exit-active");
    }, 10);
  }
}

// Show search view
function showSearchView() {
  if (currentView === 'search') return;
  
  currentView = 'search';
  document.getElementById("search-tab").classList.add("active");
  document.getElementById("saved-tab").classList.remove("active");
  
  const resultsDiv = document.getElementById("results");
  
  // Fade out current content
  animateElementFade(resultsDiv, 'out');
  
  // After fade out, update content
  setTimeout(() => {
    // Display last search results if available
    if (searchResults.length > 0) {
      displaySearchResults(searchResults);
    } else {
      displayEmptyState("search");
    }
  }, 300);
}

// Show saved jobs view
function showSavedJobsView() {
  if (currentView === 'saved') return;
  
  currentView = 'saved';
  document.getElementById("saved-tab").classList.add("active");
  document.getElementById("search-tab").classList.remove("active");
  
  const resultsDiv = document.getElementById("results");
  
  // Fade out current content
  animateElementFade(resultsDiv, 'out');
  
  // After fade out, update content
  setTimeout(() => {
    displaySavedJobs();
  }, 300);
}

// Display empty state
function displayEmptyState(type) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  
  let message = "";
  let icon = "";
  
  if (type === "search") {
    message = "Search for jobs to get started";
    icon = "🔍";
  } else if (type === "saved") {
    message = "No saved jobs yet.<br>Save jobs to access them later.";
    icon = "🔖";
  } else if (type === "no-results") {
    message = "No jobs found matching your search.<br>Try different keywords.";
    icon = "🔍";
  }
  
  const emptyStateDiv = document.createElement("div");
  emptyStateDiv.className = "empty-state";
  emptyStateDiv.innerHTML = `
    <div class="empty-state-icon">${icon}</div>
    <div class="empty-state-text">${message}</div>
  `;
  
  resultsDiv.appendChild(emptyStateDiv);
  animateElementFade(resultsDiv, 'in');
}

// Display loading indicator
function displayLoading() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading-indicator";
  loadingDiv.innerHTML = `<div class="spinner"></div>`;
  
  resultsDiv.appendChild(loadingDiv);
}

// Display saved jobs
function displaySavedJobs() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  
  if (savedJobs.length === 0) {
    displayEmptyState("saved");
    return;
  }
  
  savedJobs.forEach((job, index) => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.innerHTML = `
      <a href="${job.link}" target="_blank">${job.title}</a>
      <p>${job.snippet}</p>
      <button class="save-btn saved" data-index="${index}">
        <span class="save-icon">🔖</span>
        <span class="save-icon-saved">✓</span>
        Saved
      </button>
    `;
    resultsDiv.appendChild(div);
  });
  
  // Add event listeners to remove buttons
  document.querySelectorAll(".save-btn.saved").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.getAttribute("data-index"));
      removeSavedJob(index);
    });
  });
  
  // Animate in
  animateElementFade(resultsDiv, 'in');
}

// Remove a saved job
function removeSavedJob(index) {
  savedJobs.splice(index, 1);
  saveSavedJobs();
  displaySavedJobs();
}

// Save a job
function saveJob(job) {
  // Check if job is already saved (by link)
  const jobExists = savedJobs.some(savedJob => savedJob.link === job.link);
  
  if (!jobExists) {
    savedJobs.push(job);
    saveSavedJobs();
    return true;
  }
  
  return false;
}

// Search for jobs
function searchJobs() {
  const query = document.getElementById("search-input").value;
  if (!query.trim() || isLoading) return;
  
  isLoading = true;
  displayLoading();

  fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => {
      isLoading = false;
      searchResults = data.items || [];
      displaySearchResults(searchResults);
    })
    .catch((error) => {
      isLoading = false;
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div class="empty-state-text">Error fetching data.<br>Please try again later.</div>
        </div>
      `;
      console.error("Error:", error);
    });
}

// Display search results
function displaySearchResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  
  if (items.length === 0) {
    displayEmptyState("no-results");
    return;
  }

  items.forEach((item, index) => {
    // Create a job object
    const job = {
      title: item.title,
      link: item.link,
      snippet: item.snippet || "No description available"
    };
    
    // Check if this job is already saved
    const isJobSaved = savedJobs.some(savedJob => savedJob.link === job.link);
    
    const div = document.createElement("div");
    div.className = "result-item";
    div.innerHTML = `
      <a href="${job.link}" target="_blank">${job.title}</a>
      <p>${job.snippet}</p>
      <button class="save-btn ${isJobSaved ? 'saved' : ''}" data-index="${index}">
        <span class="save-icon">🔖</span>
        <span class="save-icon-saved">✓</span>
        ${isJobSaved ? 'Saved' : 'Save'}
      </button>
    `;
    resultsDiv.appendChild(div);
    
    // Add slight delay for staggered animation effect
    setTimeout(() => {
      div.style.opacity = "1";
      div.style.transform = "translateY(0)";
    }, 50 * index);
  });
  
  // Add event listeners to save buttons
  document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const target = e.currentTarget;
      const index = parseInt(target.getAttribute("data-index"));
      const job = {
        title: items[index].title,
        link: items[index].link,
        snippet: items[index].snippet || "No description available"
      };
      
      if (target.classList.contains('saved')) {
        // Find this job in savedJobs by link and remove it
        const savedIndex = savedJobs.findIndex(savedJob => savedJob.link === job.link);
        if (savedIndex !== -1) {
          savedJobs.splice(savedIndex, 1);
          saveSavedJobs();
          target.classList.remove('saved');
          target.innerHTML = `
            <span class="save-icon">🔖</span>
            <span class="save-icon-saved">✓</span>
            Save
          `;
        }
      } else {
        // Save the job
        saveJob(job);
        target.classList.add('saved');
        target.innerHTML = `
          <span class="save-icon">🔖</span>
          <span class="save-icon-saved">✓</span>
          Saved
        `;
      }
    });
  });
  
  // Animate in
  animateElementFade(resultsDiv, 'in');
}