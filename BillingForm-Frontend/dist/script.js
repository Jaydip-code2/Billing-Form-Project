"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const formElements = {
        form: document.getElementById("billingForm"),
        fullNameEl: document.getElementById("fullName"),
        emailEl: document.getElementById("email"),
        addressEl: document.getElementById("address"),
        paymentError: document.getElementById("paymentError")
    };
    formElements.form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();
        const payment = document.querySelector('input[name="payment"]:checked');
        const formData = {
            FullName: formElements.fullNameEl.value.trim(),
            Email: formElements.emailEl.value.trim(),
            Address: formElements.addressEl.value.trim(),
            PaymentMethod: payment ? payment.value : null
        };
        let hasError = false;
        if (formData.FullName === "") {
            markInvalid(formElements.fullNameEl, "Full Name is required.");
            hasError = true;
        }
        if (formData.Email === "") {
            markInvalid(formElements.emailEl, "Email is required.");
            hasError = true;
        }
        else if (!validateEmail(formData.Email)) {
            markInvalid(formElements.emailEl, "Please enter a valid email address.");
            hasError = true;
        }
        if (formData.Address === "") {
            markInvalid(formElements.addressEl, "Address is required.");
            hasError = true;
        }
        if (!payment) {
            formElements.paymentError.textContent = "Please select a payment method.";
            hasError = true;
        }
        if (hasError) {
            alert("Please correct the highlighted fields.");
            return;
        }
        submitFormData(formData);
    });
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function markInvalid(input, message) {
        input.classList.add("invalid");
        const errorDiv = document.getElementById(input.id + "Error");
        if (errorDiv)
            errorDiv.textContent = message;
    }
    function clearErrors() {
        document.querySelectorAll(".invalid").forEach((el) => {
            el.classList.remove("invalid");
        });
        document.querySelectorAll(".error-message").forEach((el) => {
            el.textContent = "";
        });
    }
    async function submitFormData(formData) {
        try {
            const response = await fetch('https://localhost:7188/api/Billing/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Form submitted successfully!');
                formElements.form.reset();
                // Print submitted data to console
                console.log(formData);
            }
            else {
                alert('Failed to submit form. Please try again.');
            }
        }
        catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.');
        }
    }
});
//# sourceMappingURL=script.js.map