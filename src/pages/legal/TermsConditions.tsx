import { AlertCircle } from 'lucide-react';

const TermsConditions = () => {
    return (
        <div className="min-h-screen bg-[#FFF9F9] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Terms & Conditions</h1>
                    <p className="text-gray-500 text-lg font-light">Please read carefully before using our services.</p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-pink-50 space-y-12">

                    <div className="prose prose-pink max-w-none">
                        <p className="text-gray-600 font-light leading-relaxed text-lg">
                            JAANMAK NIG. LTD. is dedicated to providing outstanding products and services. We are delighted to offer you a range of quality products and services at great prices and we strive to make improvements to our business, to ensure full customer satisfaction at all times.
                        </p>
                    </div>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Return Policy</h2>
                        <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                            <p>
                                Due to the nature of our products, we cannot offer cash refunds on a purchase, for hygienic/health concerns.
                            </p>
                            <p>
                                We will not accept any returns or exchanges of any altered, opened or used product. You can exchange items that have not been dispatched to you yet and are still within our business premises. If you receive a defective product, please notify us within 48 hours.
                            </p>
                            <p>
                                Store credit can however be issued to you when necessary and this can apply to our services too.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Checkout and Payment</h2>
                        <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                            <ul className="list-disc list-inside space-y-2">
                                <li>Make a selection and place your order (via our website). The size and quantity of each product is available on clicking the product.</li>
                                <li>Check out and make payment for your order.</li>
                                <li>Once payment is confirmed by us, we will process your order (packaging and shipping).</li>
                                <li>Delivery of your order by our shipping partner concludes the transaction.</li>
                            </ul>
                            <p>
                                Via the Website: Making a purchase could not be easier. Just browse our online shop and add items to your cart. Once you're happy with your selection click on "Checkout" and you will be taken through, to complete the order purchase. After payment has been confirmed by us your order will be processed and delivered subsequently.
                            </p>
                            <div className="bg-pink-50 p-6 rounded-2xl mt-4 border border-pink-100">
                                <h3 className="font-bold text-pink-800 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Important Note
                                </h3>
                                <p className="text-sm text-pink-900">
                                    Presently, we do not offer the pay on delivery option; orders dispatched by our logistic partner are paid prior. Alternatively, you can call to request a pick up from our pick up centre. An appointment can be arranged after you have made an order. We cannot arrange to meet you anywhere else but our pickup centre.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Cancellation / Amend Order</h2>
                        <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                            <p>
                                Please, ensure that the address details you supply are complete and correct. If the courier finds it difficult to deliver to you, they will contact us and we will in turn contact you.
                            </p>
                            <p>
                                Couriers apply significant fines and redirection fees to items that cannot be delivered due to incorrect or incomplete address details and cancellations. Any such fines, fees and subsequent redelivery costs will be passed on to you.
                            </p>
                            <p>
                                If your goods have already been paid for, an amendment can be effected, IF your order has not yet been dispatched. In the event that a transfer to you is effected, a banking surcharge will be deducted from your total. We will not accept liability for your amendment.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Order Cancellation</h2>
                        <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                            <p>
                                To cancel, send a message to <span className="font-medium text-pink-600">Juneangelbw@gmail.com</span> or WhatsApp <span className="font-medium text-pink-600">+234 906 931 2431</span>, not more than 3 hours after your order was placed. After this time, we might be unable to cancel your order, change your address, or change your order.
                            </p>
                            <p>
                                If we are successfully able to cancel your order, a 10% of each item value will be subtracted from your refund to cover for costs incurred. If you request for a package to be delivered to a new location after it has been shipped, transfer charges will be deducted, if applies.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Postponed Delivery</h2>
                        <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                            <p>
                                If you become unavailable to receive your order and your order has already been shipped, please contact us and we will retrieve your order from our logistic partners. However, you would be charged as follows:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li><span className="font-medium">Postponed delivery to the next day:</span> You may be charged an additional sum.</li>
                                <li><span className="font-medium">Postponed delivery beyond the next day:</span> You will be charged an additional sum, the same value as your shipping fee.</li>
                                <li><span className="font-medium">Return (after a number of days has been exceeded):</span> We will retain the initial value of your shipping fee to cover our shipping and returns cost as well as an additional charge for handling.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Out of Stock Items</h2>
                        <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                            <p>
                                Prices displayed are correct, based on our current stock holding. Due to the current instability in global commodity markets, Nigeria's currency and logistic instability, we reserve the right to amend our prices without prior notice. Our website is updated on a regular basis.
                            </p>
                            <p>
                                In the rare case of a change of price, we will always contact you to let you know and confirm you wish to go ahead before we proceed with the order.
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
