interface BillingData {
    fullName: string;
    email: string;
    address: string;
    paymentMethod: string | null;
}
declare class BillingForm {
    private form;
    private fullName;
    private email;
    private address;
    private paymentError;
    constructor();
    private onSubmit;
    private getPaymentMethod;
    private validate;
    private showError;
    private clearErrors;
    private isValidEmail;
    private sendToApi;
}
