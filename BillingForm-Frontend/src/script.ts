interface BillingData {
  fullName: string;
  email: string;
  address: string;
  paymentMethod: string | null;
}

class BillingForm {
  private form = document.getElementById("billingForm") as HTMLFormElement;
  private fullName = document.getElementById("fullName") as HTMLInputElement;
  private email = document.getElementById("email") as HTMLInputElement;
  private address = document.getElementById("address") as HTMLInputElement;
  private paymentError = document.getElementById("paymentError") as HTMLElement;

  constructor() {
    this.form.addEventListener("submit", (e) => this.onSubmit(e));
  }

  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.clearErrors();

    const data: BillingData = {
      fullName: this.fullName.value.trim(),
      email: this.email.value.trim(),
      address: this.address.value.trim(),
      paymentMethod: this.getPaymentMethod(),
    };

    if (this.validate(data)) {
      this.sendToApi(data);
    } else {
      alert("Please fix the form errors.");
    }
  }

  private getPaymentMethod(): string | null {
    const selected = document.querySelector<HTMLInputElement>('input[name="payment"]:checked');
    return selected ? selected.value : null;
  }

  private validate(data: BillingData): boolean {
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
  

  private showError(elementId: string, message: string): void {
    const el = document.getElementById(elementId) as HTMLElement;
    el.textContent = message;
  }

  private clearErrors(): void {
    ["fullNameError", "emailError", "addressError", "paymentError"].forEach((id) => {
      const el = document.getElementById(id) as HTMLElement;
      el.textContent = "";
    });
  }

  private isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private async sendToApi(data: BillingData): Promise<void> {
    try {
      const res = await fetch("https://localhost:7188/api/Billing/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Form submitted successfully!");
        this.form.reset();
      } else {
        alert("Failed to submit form.");
      }
    } catch (err) {
      alert("Network error.");
      console.error(err);
    }
  }
}

new BillingForm();
