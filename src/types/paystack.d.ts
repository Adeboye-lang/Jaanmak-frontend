declare module '@paystack/checkout-js' {
    interface PaystackOptions {
        key: string;
        email: string;
        amount: number;
        ref?: string;
        currency?: string;
        channels?: string[];
        metadata?: any;
        label?: string;
        onSuccess: (response: any) => void;
        onCancel: () => void;
        onClose?: () => void;
    }

    class PaystackPop {
        newTransaction(options: PaystackOptions): void;
    }

    export default PaystackPop;
}
