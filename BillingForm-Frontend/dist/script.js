"use strict";
class BillingForm {
    constructor() {
        this.form = document.getElementById("billingForm");
        this.fullName = document.getElementById("fullName");
        this.email = document.getElementById("email");
        this.address = document.getElementById("address");
        this.paymentError = document.getElementById("paymentError");
        this.form.addEventListener("submit", (e) => this.onSubmit(e));
    }
    onSubmit(event) {
        event.preventDefault();
        this.clearErrors();
        const data = {
            fullName: this.fullName.value.trim(),
            email: this.email.value.trim(),
            address: this.address.value.trim(),
            paymentMethod: this.getPaymentMethod(),
        };
        if (this.validate(data)) {
            this.sendToApi(data);
        }
        else {
            alert("Please fix the form errors.");
        }
    }
    getPaymentMethod() {
        const selected = document.querySelector('input[name="payment"]:checked');
        return selected ? selected.value : null;
    }
    validate(data) {
        let isValid = true;
        !data.fullName && (this.showError("fullNameError", "Full Name is required."), isValid = false);
        !data.email
            ? (this.showError("emailError", "Email is required."), isValid = false)
            : !this.isValidEmail(data.email) &&
                (this.showError("emailError", "Invalid email address."), isValid = false);
        !data.address && (this.showError("addressError", "Address is required."), isValid = false);
        !data.paymentMethod &&
            (this.paymentError.textContent = "Please select a payment method.", isValid = false);
        return isValid;
    }
    showError(elementId, message) {
        const el = document.getElementById(elementId);
        el.textContent = message;
    }
    clearErrors() {
        ["fullNameError", "emailError", "addressError", "paymentError"].forEach((id) => {
            const el = document.getElementById(id);
            el.textContent = "";
        });
    }
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    async sendToApi(data) {
        try {
            const res = await fetch("https://localhost:7188/api/Billing/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                alert("Form submitted successfully!");
                this.form.reset();
            }
            else {
                alert("Failed to submit form.");
            }
        }
        catch (err) {
            alert("Network error.");
            console.error(err);
        }
    }
}
new BillingForm();