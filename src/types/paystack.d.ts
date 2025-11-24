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

interface PaystackPop {
    newTransaction(options: PaystackOptions): void;
}

interface Window {
    PaystackPop: {
        new(): PaystackPop;
    };
}
