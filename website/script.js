// Add your Google API Key and Custom Search Engine ID here
const API_KEY = 'AIzaSyBD85a-q01Ml3x1Ov3NcT_c70lM5oFCWmg';
const CX = 'b517a1021b95f4a54';

// Fetch jobs dynamically using Google Custom Search API
async function fetchJobsFromAPI(query) {
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${CX}`;

    try {
        document.getElementById('loadingIndicator').classList.remove('hidden');
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const apiJobs = data.items.map((item, index) => ({
                id: 1000 + index, // Avoid conflicts with local job IDs
                title: item.title,
                company: 'External Source',
                location: 'Remote',
                category: 'N/A',
                experience: 'N/A',
                salary: 'N/A',
                source: 'Google Search',
                posted: 'Just now',
                description: item.snippet,
                link: item.link
            }));

            renderJobs(apiJobs);
        } else {
            console.error('No results found');
            document.getElementById('noResults').classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error fetching job listings:', error);
    } finally {
        document.getElementById('loadingIndicator').classList.add('hidden');
    }
}

// Function to render job listings dynamically
function renderJobs(jobs) {
    const container = document.getElementById('jobListings');
    const noResultsElement = document.getElementById('noResults');
    const resultsCountElement = document.getElementById('resultsCount');

    container.innerHTML = '';

    if (jobs.length === 0) {
        noResultsElement.classList.remove('hidden');
        resultsCountElement.textContent = 'No results found';
        return;
    }

    noResultsElement.classList.add('hidden');
    resultsCountElement.textContent = `Showing ${jobs.length} ${jobs.length === 1 ? 'job' : 'jobs'}`;

    jobs.forEach(job => {
        const jobCard = `
            <div class="job-card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">${job.title}</h3>
                    <span class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">${job.source}</span>
                </div>
                <p class="text-gray-600 mb-4">${job.description}</p>
                <div class="flex items-center justify-between">
                    <a href="${job.link}" target="_blank" 
                       class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Apply Now
                    </a>
                </div>
            </div>
        `;
        container.innerHTML += jobCard;
    });
}

// Add event listener to search button
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query !== '') {
        fetchJobsFromAPI(query);
    } else {
        alert('Please enter a search term.');
    }
});

// Allow search on pressing 'Enter'
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});
