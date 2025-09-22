

export function validateRefundModalform(paymentDetails: any) {
     const errors: string[] = [];
    if (
      !paymentDetails.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentDetails.email)
    ) {
      errors.push("Enter a valid email address.");
    }
    if (
      !paymentDetails.refundedAmount ||
      isNaN(Number(paymentDetails.refundedAmount))
    ) {
      errors.push("Refunded amount must be a number.");
    }
    if (!paymentDetails.transactionId)
      errors.push("Transaction ID is required.");
    if (!paymentDetails.refundDate) errors.push("Refund date is required.");
    if (!paymentDetails.refundTime) errors.push("Refund time is required.");
    if (!paymentDetails.referenceNumber)
      errors.push("Reference number is required.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }


}