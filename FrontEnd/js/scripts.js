//star rating functionality implementation
document.addEventListener('DOMContentLoaded', () => {
    const ratings = document.querySelectorAll('.rating');

    ratings.forEach(rating => {
        const ratingDisplay = document.createElement('div'); // Create a display element
        ratingDisplay.className = 'rating-display';
        ratingDisplay.textContent = 'Your rating: 0 stars';
        rating.parentElement.appendChild(ratingDisplay); // Append it below the form

        rating.addEventListener('change', (event) => {
            const userRating = event.target.value;
            ratingDisplay.textContent = `Your rating: ${userRating} stars`;

            // Store the rating in localStorage using a unique key
            const ratingKey = `rating-${rating.querySelector('input').name}`;
            localStorage.setItem(ratingKey, userRating);
        });

        // Load the stored rating if it exists
        //const ratingKey = `rating-${rating.querySelector('input').name}`;
        //const storedRating = localStorage.getItem(ratingKey);
        //if (storedRating) {
            //document.getElementById(`star${storedRating}-${rating.querySelector('input').name.split('-')[1]}`).checked = true;
            //ratingDisplay.textContent = `Your rating: ${storedRating} stars`;
        //}
    });
});


//calendar functionality implementation
// Initialize date object with current date
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

// Get the elements needed from the DOM
const daysElement = document.querySelector(".days");
const currentDateElement = document.querySelector(".month ul li:nth-child(2)");
const prevNextIcons = document.querySelectorAll(".month ul li");

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Function to render the calendar
function renderCalendar() {
    // Get first day of the current month and last date of the current month
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    let lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(year, month, 0).getDate();

    let liTags = "";

    // Dates from the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
        liTags += `<li><span class="inactive">${lastDateOfLastMonth - i + 1}</span></li>`;
    }

    // Dates of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
        // Highlight today's date
        let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "active" : "";
        liTags += `<li><span class="${isToday}">${i}</span></li>`;
    }

    // Dates from the next month
    for (let i = lastDayOfMonth; i < 6; i++) {
        liTags += `<li><span class="inactive">${i - lastDayOfMonth + 1}</span></li>`;
    }

    // Set the current month and year in the header
    currentDateElement.innerHTML = `${months[month]}<br><span style="font-size:18px">${year}</span>`;
    // Populate the days in the calendar
    daysElement.innerHTML = liTags;
}

// Event listeners for the previous and next icons
prevNextIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // Update month based on the clicked icon
        month = icon.classList.contains("prev") ? month - 1 : month + 1;

        // Handle year change
        if (month < 0 || month > 11) {
            date = new Date(year, month);
            year = date.getFullYear();
            month = date.getMonth();
        } else {
            date = new Date();
        }

        // Render the calendar again with the new month and year
        renderCalendar();
    });
});

// Initial call to render the calendar
renderCalendar();
