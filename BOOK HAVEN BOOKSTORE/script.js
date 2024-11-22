document.getElementById('subscribe-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting to a server
    const emailField = document.getElementById('email');
    
    if (emailField.checkValidity()) {
        alert('Thank you for subscribing!');
        emailField.value = ''; // Clear the input field
    }
});


const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('header-nav');
const cancelBtn = document.querySelector('.cancel-btn');
const backdrop = document.createElement('div');
backdrop.classList.add('backdrop');

hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    nav.classList.toggle('open', !isOpen);
    hamburger.classList.toggle('open', !isOpen);
    hamburger.setAttribute('aria-expanded', !isOpen);

    if (!isOpen) {
        document.body.appendChild(backdrop);  // Add backdrop
    } else {
        document.body.removeChild(backdrop);  // Remove backdrop
    }
});

cancelBtn.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.removeChild(backdrop);  // Remove backdrop
});

// Close the menu when clicking outside the nav
backdrop.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.removeChild(backdrop);  // Remove backdrop
});


// Carousel code: check if the carousel container exists before adding logic
let currentIndex = 0;
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    function moveCarousel(direction) {
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = totalItems - 1;
        } else if (currentIndex >= totalItems) {
            currentIndex = 0;
        }

        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

// Form submission: check if the form exists before adding an event listener
const customOrderForm = document.getElementById('custom-order-form');
if (customOrderForm) {
    customOrderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const feedback = document.getElementById('feedback').value;

        // Validate form input
        if (name && email && feedback) {
            // Create a new feedback object
            const feedbackData = {
                name: name,
                email: email,
                feedback: feedback,
                date: new Date().toLocaleString() // Store the submission date and time
            };

            // Save the feedback data in localStorage
            let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
            feedbackList.push(feedbackData);

            localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

            // Notify user of successful submission
            alert(`Thank you for your feedback, ${name}! We will get back to you at ${email} shortly.`);

            // Optionally, clear the form after submission
            customOrderForm.reset();
        } else {
            alert("Please fill in all fields before submitting.");
        }
    });
}

// Display feedback: check if the feedback display container exists
const feedbackContainer = document.getElementById('feedback-display');
if (feedbackContainer) {
    function displayFeedback() {
        const feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        if (feedbackList.length > 0) {
            feedbackList.forEach(feedback => {
                const feedbackItem = document.createElement('div');
                feedbackItem.classList.add('feedback-item');
                feedbackItem.innerHTML = `
                    <p><strong>${feedback.name}</strong> (${feedback.date})</p>
                    <p>Email: ${feedback.email}</p>
                    <p>Feedback: ${feedback.feedback}</p>
                    <hr>
                `;
                feedbackContainer.appendChild(feedbackItem);
            });
        } else {
            feedbackContainer.innerHTML = '<p>No feedback submitted yet.</p>';
        }
    }

    // Display feedback on page load (optional)
    window.onload = displayFeedback;
}
