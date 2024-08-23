// Function for star rating functionality
function initializeStarRating() {
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
}

// Function for login functionality
function initializeLogin() {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        const loginButton = document.getElementById("login-submit");
        const loginErrorMsg = document.getElementById("login-error");

        loginButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the form from submitting
            const username = document.getElementById("first").value;
            const password = document.getElementById("password").value;

            if (username === "sample" && password === "sample1234*") {
                loginErrorMsg.style.opacity = 0;
                // Redirect to the home page or dashboard
                window.location.href = "index.html";
            } else {
                loginErrorMsg.style.opacity = 1;
                loginErrorMsg.textContent = "Invalid username and/or password";
            }
        });
    }
}

// Function for create account functionality
function initializeCreateAccount() {
    const createAccountForm = document.getElementById("create-account-form");
    if (createAccountForm) {
        const createAccountButton = document.getElementById("new-account-submit");
        const createAccountErrorMsg = document.getElementById("new-account-error");

        createAccountButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the form from submitting
            const username = document.getElementById("first").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();

            // Validate that all fields are filled
            if (!username || !password || !confirmPassword) {
                createAccountErrorMsg.style.opacity = 1;
                createAccountErrorMsg.textContent = "All fields are required.";
                return;
            }

            if (password === confirmPassword && username !== "daisy") {
                createAccountErrorMsg.style.opacity = 0;
                alert("Account was successfully made.");
                // Redirect to the login page
                window.location.href = "login.html";
            } else if (username === "daisy") {
                createAccountErrorMsg.style.opacity = 1;
                createAccountErrorMsg.textContent= "Username already exists, please choose another.";
            } else if (password !== confirmPassword) {
                createAccountErrorMsg.style.opacity = 1;
                createAccountErrorMsg.textContent = "Passwords don't match, please try again.";
            }
        });
    }
}


// Function for calendar functionality
function initializeCalendar() {
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
}

//profile settings button function
function goToSettings() {
    window.location.href = 'user_settings.html';
}

//settings profile button function
function goToProfile() {
    window.location.href = 'user_profile.html';
}

// Initialize all functionalities when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeLogin();
    initializeCreateAccount();
    initializeCalendar();
    initializeStarRating();
});