// Sample job data (in real application, this would come from API calls to multiple job platforms)
const allJobs = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp",
        location: "Remote",
        category: "software",
        experience: "senior",
        salary: "$120k - $150k",
        source: "LinkedIn",
        posted: "2 days ago",
        description: "Looking for an experienced software engineer to lead our backend team. Skills required: Node.js, AWS, MongoDB, and microservices architecture.",
        link: "#"
    },
    {
        id: 2,
        title: "UX Designer",
        company: "DesignStudio",
        location: "us",
        category: "design",
        experience: "mid",
        salary: "$80k - $100k",
        source: "Wellfound",
        posted: "1 week ago",
        description: "Join our creative team to design user-centered experiences for our mobile applications. Proficiency in Figma and experience with user research required.",
        link: "#"
    },
    {
        id: 3,
        title: "Data Scientist Intern",
        company: "AnalyticsPro",
        location: "remote",
        category: "data",
        experience: "internship",
        salary: "$25/hr",
        source: "Indeed",
        posted: "3 days ago",
        description: "Summer internship opportunity for students with strong Python skills and knowledge of machine learning algorithms. Perfect for gaining real-world experience.",
        link: "#"
    },
    {
        id: 4,
        title: "Frontend Developer",
        company: "WebSolutions",
        location: "europe",
        category: "software",
        experience: "entry",
        salary: "$60k - $75k",
        source: "LinkedIn",
        posted: "Just now",
        description: "Looking for a talented frontend developer with React experience. You'll work on building responsive and accessible interfaces for our clients.",
        link: "#"
    },
    {
        id: 5,
        title: "Marketing Manager",
        company: "GrowthHackers",
        location: "us",
        category: "marketing",
        experience: "mid",
        salary: "$90k - $110k",
        source: "Glassdoor",
        posted: "5 days ago",
        description: "Lead our digital marketing efforts including SEO, content strategy, and social media campaigns. Experience in B2B marketing preferred.",
        link: "#"
    },
    {
        id: 6,
        title: "Financial Analyst",
        company: "GlobalFinance",
        location: "asia",
        category: "finance",
        experience: "entry",
        salary: "$55k - $70k",
        source: "Indeed",
        posted: "1 day ago",
        description: "Entry-level position for finance graduates. You'll assist in financial reporting, forecasting, and budget analysis for our international clients.",
        link: "#"
    },
    {
        id: 7,
        title: "Product Manager",
        company: "InnovateTech",
        location: "remote",
        category: "software",
        experience: "senior",
        salary: "$130k - $160k",
        source: "Wellfound",
        posted: "1 week ago",
        description: "Experienced product manager needed to lead our flagship product development. You'll work closely with engineering, design, and marketing teams.",
        link: "#"
    },
    {
        id: 8,
        title: "Graphic Designer",
        company: "CreativeAgency",
        location: "australia",
        category: "design",
        experience: "mid",
        salary: "$70k - $85k",
        source: "LinkedIn",
        posted: "3 days ago",
        description: "Join our award-winning creative team to produce stunning visual content for major brands. Proficiency in Adobe Creative Suite is essential.",
        link: "#"
    },
    {
        id: 9,
        title: "Nurse Practitioner",
        company: "HealthPlus",
        location: "us",
        category: "healthcare",
        experience: "senior",
        salary: "$110k - $130k",
        source: "Indeed",
        posted: "4 days ago",
        description: "Looking for a certified nurse practitioner to join our growing clinic. You'll provide primary care services and collaborate with our medical team.",
        link: "#"
    },
    {
        id: 10,
        title: "Full Stack Developer",
        company: "CodeMasters",
        location: "remote",
        category: "software",
        experience: "mid",
        salary: "$95k - $125k",
        source: "LinkedIn",
        posted: "1 day ago",
        description: "Join our dynamic team building next-generation web applications. Experience with React, Node.js, and SQL/NoSQL databases required.",
        link: "#"
    },
    {
        id: 11,
        title: "Data Analyst",
        company: "DataInsights",
        location: "us",
        category: "data",
        experience: "entry",
        salary: "$65k - $80k",
        source: "Glassdoor",
        posted: "3 days ago",
        description: "Help us turn data into actionable insights. SQL skills and experience with visualization tools like Tableau or Power BI required.",
        link: "#"
    },
    {
        id: 12,
        title: "DevOps Engineer",
        company: "CloudTech",
        location: "europe",
        category: "software",
        experience: "senior",
        salary: "$115k - $140k",
        source: "Indeed",
        posted: "1 week ago",
        description: "Help us build and maintain our cloud infrastructure. Experience with AWS, Kubernetes, and CI/CD pipelines is essential.",
        link: "#"
    }
];

// Initialize the current jobs array with all jobs
let currentJobs = [...allJobs];
// Initialize saved jobs array
let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

function renderJobs(jobsToRender) {
    const container = document.getElementById('jobListings');
    const noResultsElement = document.getElementById('noResults');
    const resultsCountElement = document.getElementById('resultsCount');
    
    container.innerHTML = '';

    if (jobsToRender.length === 0) {
        noResultsElement.classList.remove('hidden');
        resultsCountElement.textContent = 'No results found';
        return;
    }

    noResultsElement.classList.add('hidden');
    resultsCountElement.textContent = `Showing ${jobsToRender.length} ${jobsToRender.length === 1 ? 'job' : 'jobs'}`;

    jobsToRender.forEach(job => {
        // Determine badge color based on source
        let sourceBadgeClass;
        switch(job.source) {
            case 'LinkedIn':
                sourceBadgeClass = 'bg-blue-100 text-blue-800';
                break;
            case 'Wellfound':
                sourceBadgeClass = 'bg-green-100 text-green-800';
                break;
            case 'Indeed':
                sourceBadgeClass = 'bg-yellow-100 text-yellow-800';
                break;
            case 'Glassdoor':
                sourceBadgeClass = 'bg-purple-100 text-purple-800';
                break;
            default:
                sourceBadgeClass = 'bg-gray-100 text-gray-800';
        }

        const isJobSaved = savedJobs.some(savedJob => savedJob.id === job.id);
        const saveButtonIcon = isJobSaved ? 'bi-bookmark-fill text-blue-600' : 'bi-bookmark';
        const saveButtonText = isJobSaved ? 'Saved' : 'Save';

        const jobCard = `
            <div class="job-card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">${job.title}</h3>
                    <span class="text-sm ${sourceBadgeClass} px-2 py-1 rounded-full">${job.source}</span>
                </div>
                <h4 class="text-lg text-gray-700 mb-2 flex items-center">
                    <i class="bi bi-building mr-2"></i>${job.company}
                </h4>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        <i class="bi bi-geo-alt"></i> ${job.location}
                    </span>
                    <span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        <i class="bi bi-briefcase"></i> ${job.experience}
                    </span>
                    <span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        <i class="bi bi-cash"></i> ${job.salary}
                    </span>
                </div>
                <p class="text-gray-600 mb-4">${job.description}</p>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-sm text-gray-500 mr-4"><i class="bi bi-clock"></i> ${job.posted}</span>
                        <button class="save-job-btn text-sm text-gray-700 hover:text-blue-600" data-id="${job.id}">
                            <i class="bi ${saveButtonIcon} mr-1"></i> ${saveButtonText}
                        </button>
                    </div>
                    <a href="${job.link}" target="_blank" 
                       class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Apply Now
                    </a>
                </div>
            </div>
        `;
        container.innerHTML += jobCard;
    });

    // Add event listeners to save buttons
    document.querySelectorAll('.save-job-btn').forEach(button => {
        button.addEventListener('click', toggleSaveJob);
    });
}

function renderSavedJobs() {
    const container = document.getElementById('savedJobsContainer');
    const noSavedJobsMessage = document.getElementById('noSavedJobs');
    
    if (savedJobs.length === 0) {
        noSavedJobsMessage.style.display = 'block';
        container.innerHTML = '';
        return;
    }
    
    noSavedJobsMessage.style.display = 'none';
    container.innerHTML = '';

    savedJobs.forEach(job => {
        let sourceBadgeClass;
        switch(job.source) {
            case 'LinkedIn':
                sourceBadgeClass = 'bg-blue-100 text-blue-800';
                break;
            case 'Wellfound':
                sourceBadgeClass = 'bg-green-100 text-green-800';
                break;
            case 'Indeed':
                sourceBadgeClass = 'bg-yellow-100 text-yellow-800';
                break;
            case 'Glassdoor':
                sourceBadgeClass = 'bg-purple-100 text-purple-800';
                break;
            default:
                sourceBadgeClass = 'bg-gray-100 text-gray-800';
        }

        const savedJobItem = `
            <div class="saved-job py-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">${job.title}</h3>
                        <p class="text-gray-600">${job.company} · ${job.location}</p>
                        <div class="flex items-center mt-2">
                            <span class="text-sm ${sourceBadgeClass} px-2 py-1 rounded-full">${job.source}</span>
                            <span class="text-sm text-gray-500 ml-3"><i class="bi bi-clock"></i> ${job.posted}</span>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <a href="${job.link}" target="_blank" 
                           class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            Apply
                        </a>
                        <button class="remove-saved-job px-2 py-2 text-gray-500 hover:text-red-600" data-id="${job.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += savedJobItem;
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-saved-job').forEach(button => {
        button.addEventListener('click', function() {
            const jobId = parseInt(this.getAttribute('data-id'));
            savedJobs = savedJobs.filter(job => job.id !== jobId);
            localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
            renderSavedJobs();
            // Re-render main job listing to update save buttons
            renderJobs(currentJobs);
        });
    });
}

function toggleSaveJob() {
    const jobId = parseInt(this.getAttribute('data-id'));
    const job = allJobs.find(job => job.id === jobId);
    
    const jobIndex = savedJobs.findIndex(savedJob => savedJob.id === jobId);
    if (jobIndex === -1) {
        // Job is not saved, add it
        savedJobs.push(job);
        this.innerHTML = '<i class="bi bi-bookmark-fill text-blue-600 mr-1"></i> Saved';
    } else {
        // Job is saved, remove it
        savedJobs.splice(jobIndex, 1);
        this.innerHTML = '<i class="bi bi-bookmark mr-1"></i> Save';
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    renderSavedJobs();
}

function filterJobs() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const location = document.getElementById('locationFilter').value;
    const experience = document.getElementById('experienceFilter').value;
    const category = document.getElementById('categoryFilter').value;
    const source = document.getElementById('sourceFilter').value;
    
    // Show loading indicator
    document.getElementById('loadingIndicator').classList.remove('hidden');
    
    // Simulate API call delay
    setTimeout(() => {
        const filtered = allJobs.filter(job => {
            const matchesSearch = 
                !searchText || 
                job.title.toLowerCase().includes(searchText) ||
                job.company.toLowerCase().includes(searchText) ||
                job.description.toLowerCase().includes(searchText);
            
            const matchesLocation = !location || job.location === location;
            const matchesExperience = !experience || job.experience === experience;
            const matchesCategory = !category || job.category === category;
            const matchesSource = !source || job.source === source;

            return matchesSearch && matchesLocation && matchesExperience && matchesCategory && matchesSource;
        });

        currentJobs = filtered;
        renderJobs(filtered);
        
        // Hide loading indicator
        document.getElementById('loadingIndicator').classList.add('hidden');
    }, 500); // Simulate network delay
}

// Salary estimation function
function estimateSalary() {
    const jobTitle = document.getElementById('jobTitleInput').value.trim();
    const location = document.getElementById('locationInput').value.trim();

    if (!jobTitle || !location) {
        alert('Please enter both job title and location');
        return;
    }

    // Show loading indicator
    document.getElementById('loadingIndicator').classList.remove('hidden');
    document.getElementById('salaryResult').classList.add('hidden');

    // Simulate API call - in a real app, you'd use the JSearch API here
    setTimeout(() => {
        // Simulate random salary range based on job title
        let minSalary, maxSalary;
        
        if (jobTitle.toLowerCase().includes('senior') || jobTitle.toLowerCase().includes('lead')) {
            minSalary = 110 + Math.floor(Math.random() * 20);
            maxSalary = minSalary + 20 + Math.floor(Math.random() * 30);
        } else if (jobTitle.toLowerCase().includes('intern') || jobTitle.toLowerCase().includes('junior')) {
            minSalary = 45 + Math.floor(Math.random() * 15);
            maxSalary = minSalary + 10 + Math.floor(Math.random() * 20);
        } else {
            minSalary = 75 + Math.floor(Math.random() * 20);
            maxSalary = minSalary + 15 + Math.floor(Math.random() * 25);
        }

        // Update the salary result display
        document.getElementById('salaryRange').textContent = `$${minSalary}K - $${maxSalary}K`;
        document.getElementById('salaryLocation').textContent = location;
        document.getElementById('salaryResult').classList.remove('hidden');
        
        // Hide loading indicator
        document.getElementById('loadingIndicator').classList.add('hidden');
    }, 1000);
}

// Add event listeners
document.getElementById('searchButton').addEventListener('click', filterJobs);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        filterJobs();
    }
});
document.getElementById('locationFilter').addEventListener('change', filterJobs);
document.getElementById('experienceFilter').addEventListener('change', filterJobs);
document.getElementById('categoryFilter').addEventListener('change', filterJobs);
document.getElementById('sourceFilter').addEventListener('change', filterJobs);
document.getElementById('estimateSalaryBtn').addEventListener('click', estimateSalary);

// Initial renders
renderJobs(allJobs);
renderSavedJobs();