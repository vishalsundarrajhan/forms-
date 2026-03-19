document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year in Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Welcome Screen Logic
    const welcomeScreen = document.getElementById('welcomeScreen');
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn && welcomeScreen) {
        getStartedBtn.addEventListener('click', () => {
            welcomeScreen.classList.add('hidden');
        });
    }

    const form = document.getElementById('therapyRegistrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');

    if (!form) return;

    // Helper functions for validation
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePhone = (phone) => {
        return /^[0-9]{10}$/.test(String(phone).replace(/\D/g, ''));
    };

    const showError = (input, show) => {
        const wrapper = input.closest('.input-wrapper') || input.closest('.select-wrapper');
        if (wrapper) {
            if (show) {
                wrapper.classList.add('error');
            } else {
                wrapper.classList.remove('error');
            }
        }
    };

    // Real-time validation removal on input
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                showError(input, false);
            }
        });

        input.addEventListener('change', () => {
            if (input.value.trim() !== '') {
                showError(input, false);
            }
        });
    });

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const formData = new FormData(form);

        // Required inputs basic validation
        ['firstName', 'lastName', 'therapyType', 'preferredDate', 'preferredTime'].forEach(fieldName => {
            const input = form.querySelector(`[name="${fieldName}"]`);
            if (input && !input.value.trim()) {
                showError(input, true);
                isValid = false;
            } else {
                showError(input, false);
            }
        });

        // Email specific validation
        const emailInput = form.querySelector('[name="email"]');
        if (emailInput && !validateEmail(emailInput.value)) {
            showError(emailInput, true);
            isValid = false;
        }

        // Phone specific validation
        const phoneInput = form.querySelector('[name="phone"]');
        if (phoneInput && !validatePhone(phoneInput.value)) {
            showError(phoneInput, true);
            isValid = false;
        }

        if (!isValid) return;

        // Simulate API call and success transition
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulating network request (1.5 seconds)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Hide form and show success
            form.style.display = 'none';
            successMessage.classList.remove('hidden');

            // Scroll to top of container smoothly
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        }, 1500);
    });

    // Reset Form for another registration
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            form.style.display = 'block';
            successMessage.classList.add('hidden');

            // Clear all error states
            inputs.forEach(input => showError(input, false));
        });
    }

    // Set minimum date for date picker to today
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        // Ensure "active-label" is toggled beautifully for date
        dateInput.addEventListener('change', function () {
            const label = this.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (this.value) {
                    label.classList.add('active-label');
                } else {
                    label.classList.remove('active-label');
                }
            }
        });
    }
});
