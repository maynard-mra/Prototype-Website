// -----------------------------------------------------------------------------------------------------------------------------
// global
// -----------------------------------------------------------------------------------------------------------------------------

// Navigation animation
const nav = document.getElementById("navbar");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
        nav.classList.add("nav--hidden");
    } else {
        nav.classList.remove("nav--hidden");
    }
    lastScrollY = window.scrollY;
});

// Click to open more in nav
const dropbtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

dropbtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle('open');
});

// Close when clicking anywhere else
document.addEventListener('click', () => {
    dropdownContent.classList.remove('open');
});

document.querySelectorAll(".report-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        window.location.href = "report.html";
    });
});



// -----------------------------------------------------------------------------------------------------------------------------
// home.html
// -----------------------------------------------------------------------------------------------------------------------------

if (document.getElementById("btn1")) {
    document.getElementById("btn1").onclick = function () {
        window.location.href = "database.html";
    };
}

if (document.getElementById("btn2")) {
    document.getElementById("btn2").onclick = function () {
        window.location.href = "tips.html";
    };
}

if (document.getElementById("search")) {
    document.getElementById("search").onclick = function () {
        window.location.href = "database.html";
    };
}

// -----------------------------------------------------------------------------------------------------------------------------
// database.html
// -----------------------------------------------------------------------------------------------------------------------------
if (document.getElementById("database2-table")) {
    let allBreaches = [];
    const tableBody = document.querySelector("#database2-table tbody");  // The table rows area
    const searchInput = document.getElementById("breachSearchInput");    // The text input box
    const searchBtn = document.getElementById("breachSearchBtn");        // The search button
    const noResultMsg = document.getElementById("no-result");     // "No results" message

    // Hide the "no results" message by default
    noResultMsg.style.display = "none";

    //Format numbers (1,000,000)
    function formatNumber(num) {
        return num.toLocaleString();
    }

    function formatDate(dateString) {

        // If there's no date, just return "Unknown"
        if (!dateString) return "Unknown";

        const date = new Date(dateString);

        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    function displayBreaches(breaches) {

        // First, clear whatever rows are currently in the table
        tableBody.innerHTML = "";

        // If the list is empty, show the "no results" message and stop
        if (breaches.length === 0) {
            noResultMsg.style.display = "block";
            return;
        }

        //hide the "no results" message
        noResultMsg.style.display = "none";

        // Loop through each breach in the list and create a table row for it
        breaches.forEach(function (breach) {
            const row = document.createElement("tr");
            const dataTypes = breach.DataClasses ? breach.DataClasses.join(", ") : "Unknown";

            row.innerHTML = `
                <td>${breach.Name}</td>
                <td>${breach.Domain || "N/A"}</td>
                <td>${formatDate(breach.BreachDate)}</td>
                <td>${formatNumber(breach.PwnCount)}</td>
                <td>${dataTypes}</td>
            `;

            // Add the row to the table body
            tableBody.appendChild(row);
        });
    }

    function filterBreaches() {

        // Read input and convert to lowercase 
        const searchTerm = searchInput.value.toLowerCase().trim();

        // If the search box is empty, show everything
        if (searchTerm === "") {
            displayBreaches(allBreaches);
            return;
        }

        // Go through all the breaches and keep only the ones that match the search term
        const filtered = allBreaches.filter(function (breach) {

            
            const nameMatch = breach.Name.toLowerCase().includes(searchTerm); // Check if the breach NAME contains the search term
            const domainMatch = breach.Domain ? breach.Domain.toLowerCase().includes(searchTerm) : false; // Check if the breach DOMAIN contains the search term
            const dataMatch = breach.DataClasses // Check if any of the DATA TYPES contain the search term

                ? breach.DataClasses.some(function (type) {
                    return type.toLowerCase().includes(searchTerm);
                })
                : false;

            // Keep this breach if it matches ANY of the three checks above
            return nameMatch || domainMatch || dataMatch;
        });

        // Display the filtered list
        displayBreaches(filtered);
    }

    const HIBP_URL = "https://corsproxy.io/?url=https://haveibeenpwned.com/api/v3/breaches";
    fetch(HIBP_URL)

        .then(function (response) {

            // Check if the server replied with an error (e.g. 404, 500)
            if (!response.ok) {
                throw new Error("Server responded with status: " + response.status);
            }

            // .json() reads the response and converts it from raw text into a JavaScript object.
            return response.json();
        })

        .then(function (data) {

            // Save it to allBreaches variable so we can search it later.
            allBreaches = data;

            // Show all the breaches in the table
            displayBreaches(allBreaches);
        })

        .catch(function (error) {

            // If something went wrong (no internet, API down), show an error message
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="table-loading">
                        Failed to load breach data. Please try again later.
                    </td>
                </tr>
            `;
            console.error("Error fetching breach data:", error);
        });

    // When the user clicks "Search", run filterBreaches() in case filter as user types is not working
    searchBtn.addEventListener("click", function () {
        filterBreaches();
    });

    // Filter as the user types
    searchInput.addEventListener("input", function () {
        filterBreaches();
    });
}



// -----------------------------------------------------------------------------------------------------------------------------
// tips.html
// -----------------------------------------------------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------------------------------------------------
// about.html
// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------
// report.html
// -----------------------------------------------------------------------------------------------------------------------------