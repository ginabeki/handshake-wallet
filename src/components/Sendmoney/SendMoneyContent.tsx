import { pfisList, currenciesList, rates } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { useCallback, useEffect, useState } from "react";
import {
    getOfferings,
    setRfq,
    setSelectedCredentials,
    setSelectedPfi,
} from "@/lib/state/pfisSlice";
import { getVcJwt } from "@/lib/state/vcSlice";
import { PresentationExchange } from "@web5/credentials";
import { Rfq, TbdexHttpClient } from "@tbdex/http-client";

const SendMoneyContent = () => {
    // ... (all your existing state and logic)
    const [step, setStep] = useState<number>(1);
    const dispatch = useAppDispatch();
    const { did, customerDid } = useAppSelector((state: any) => state.auth);
    const { name } = useAppSelector((state: any) => state.userProfile);
    const { offerings, loading, selectedPfi, selectedCredentials, rfq } =
        useAppSelector((state: any) => state.pfis);
    const { jwt, loading: verifyingUser } = useAppSelector(
        (state: any) => state.kcc
    );
    const [isOpen, setIsOpen] = useState(false);
    const [currencyCodes, setCurrencyCodes] = useState({
        payin: currenciesList[0].code,
        payout: currenciesList[1].code,
    });

    const [account, setAccount] = useState({
        payin: "1234567890",
        routing: "123456789",
        payout: "3245231234",
    });

    const [rate, setRate] = useState(1);
    const fee = 1.99; // hardcoded fee

    // get the conversion rate based on payin code and payout code
    const getRate = (baseCurrency: string, targetCurrency: string) => {
        // Find the rates object for the baseCurrency
        const baseRate = rates.find((rate) => rate.baseCurrency === baseCurrency);
        if (baseRate) {
            // Find the specific rate for the targetCurrency
            const currencyRate = baseRate.rates.find(
                (rate) => rate.currency === targetCurrency
            );
            return currencyRate ? currencyRate.rate : 1; // Return rate or 1 if not found
        }
        return 1; // Return 1 if baseCurrency not found
    };

    // track if user is typing in the input fields
    const [isTyping, setIsTyping] = useState({
        payin: false,
        payout: false,
    });

    // track the amount in the input fields
    const [amount, setAmount] = useState({
        payin: "0",
        payout: "0",
    });

    // Fetch offerings when component mounts
    useEffect(() => {
        dispatch(getOfferings(pfisList));
    }, [dispatch]);

    // Calculate the rate when currencyCodes change
    useEffect(() => {
        const { payin, payout } = currencyCodes;
        const conversionRate = getRate(payin, payout);
        setRate(conversionRate);
    }, [currencyCodes]);

    // Calculate the payin amount when payout amount is changed
    useEffect(() => {
        if (isTyping.payin) {
            const payinValue = parseFloat(amount.payin) || 0;
            setAmount((prev) => ({
                ...prev,
                payout: (payinValue * rate).toFixed(2),
            }));
        }
    }, [amount.payin, isTyping.payin, rate]);

    // Calculate the payout amount when payin amount is changed
    useEffect(() => {
        if (isTyping.payout) {
            const payoutValue = parseFloat(amount.payout) || 0;
            setAmount((prev) => ({
                ...prev,
                payin: (payoutValue / rate).toFixed(2),
            }));
        }
    }, [amount.payout, isTyping.payout, rate]);

    // Handler to toggle the offerings dropdown
    const handleGetOffers = (pfi: any) => {
        dispatch(setSelectedPfi(pfi));
        setIsOpen(!isOpen);
    };

    // Handlers for input changes
    const handlePayinChange = (e: any) => {
        setIsTyping({ payin: true, payout: false }); // Indicate user is typing in payin
        setAmount({
            ...amount,
            payin: e.target.value,
        });
    };

    // Handlers for input changes
    const handlePayoutChange = (e: any) => {
        setIsTyping({ payin: false, payout: true }); // Indicate user is typing in payout
        setAmount({
            ...amount,
            payout: e.target.value,
        });
    };

    // Handler for currency change
    const handleCurrencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrencyCodes(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }, []);

    // Hanlder for account change
    const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    // Filter out offerings that match the selected currencies
    const filteredOfferings = Array.isArray(offerings)
        ? offerings
            .map((pfi: any) => ({
                ...pfi,
                offerings: pfi.offerings.filter(
                    (offering: any) =>
                        offering.data.payin.currencyCode === currencyCodes.payin &&
                        offering.data.payout.currencyCode === currencyCodes.payout
                ),
            }))
            // Filter out PFIs without matching offerings
            .filter((pfi: any) => pfi.offerings.length > 0)
        : [];

    // verify user
    const verifyUser = async () => {
        if (!did) {
            alert("Please login to verify your identity");
            return;
        }

        if (!name) {
            alert("Please create your profile to verify your identity");
            return;
        }

        dispatch(
            getVcJwt({
                customerName: name,
                countryCode: "US",
                customerDID: did,
            })
        );
    };

    // set selected credential
    const credential = () => {
        if (!selectedPfi) {
            alert("Please select a PFI to proceed");
            return;
        }
        const selectedCredentials = PresentationExchange.selectCredentials({
            vcJwts: jwt,
            presentationDefinition: selectedPfi.offerings[0]?.data?.requiredClaims,
        });
        dispatch(setSelectedCredentials(selectedCredentials));
    };

    function formatAccountNumber(accountNumber: string) {
        // Convert account number to string and use regex to insert space every 4 digits
        return accountNumber.toString().replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    // Request a quote
    const requestQuote = async () => {
        const rfq = Rfq.create({
            metadata: {
                to: selectedPfi.offerings[0]?.metadata.from,
                from: did,
                protocol: "1.0",
            },
            data: {
                offeringId: selectedPfi.offerings[0]?.metadata?.id,
                payin: {
                    kind: selectedPfi.offerings[0]?.data?.payin?.methods[0].kind,
                    amount: amount.payin.toString(),
                    paymentDetails: {
                        accountNumber: account.payin.replace(/\s+/g, "").toString(),
                        routingNumber: account.routing.replace(/\s+/g, "").toString(),
                    },
                },
                payout: {
                    kind: selectedPfi.offerings[0]?.data?.payout?.methods[0].kind,
                    paymentDetails: {
                        accountNumber: account.payout.replace(/\s+/g, "").toString(),
                    },
                },
                claims: selectedCredentials,
            },
        });

        try {
            await rfq.verifyOfferingRequirements(selectedPfi.offerings[0]);
        } catch (error) {
            console.log("Error Verifying requirement", error);
            return;
        }

        try {
            await rfq.sign(customerDid);
        } catch (error) {
            console.log("Error signing RFQ", error);
            return;
        }

        try {
            await TbdexHttpClient.createExchange(rfq);
        } catch (error) {
            console.log("Error creating exchange", error);
            return;
        }

        dispatch(setRfq(rfq));
        console.log("success");
        console.log(rfq);
    };

    console.log(selectedPfi?.offerings[0]);

    // Create the exchange
    const processQuote = async () => {
        // dispatch(proccessQuote({ rfq, customerDid: did, selectedOffering: selectedPfi.offerings[0] }));
    };
    return (
        <form className="w-full">
            {/* Step 1 */}
            {step === 1 && (
                <div className="w-full space-y-4">
                    {/* You send money */}
                    <div className="relative w-full rounded-lg overflow-hidden border-2 border-black p-3">
                        <div className="flex flex-col items-start justify-between space-y-1">
                            <label htmlFor="amount">You Send</label>
                            <input
                                type="text"
                                id="payin-amount"
                                name="payin-amount"
                                className="text-3xl font-bold w-auto outline-none border-none"
                                value={amount.payin}
                                min={0}
                                onChange={(e) => handlePayinChange(e)}
                            />
                        </div>
                        <div className="absolute h-full inset-y-0 right-0 flex flex-col items-center justify-center p-2 bg-secondar-yellow">
                            <select
                                className="bg-transparent border-none outline-none w-[100px] text-xl font-bold text-center"
                                onChange={handleCurrencyChange}
                                name="payin"
                            >
                                {currenciesList.map((currency, index) => (
                                    <option key={index} value={currency.code}>
                                        {currency.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Conversion Market Rate */}
                    <div className="inline-flex items-start justify-center space-x-2 text-[14px]">
                        <p className=" text-primary-green">Market Rate</p>
                        <p className="font-semibold text-black">
                            1 {currencyCodes.payin} = {rate} {currencyCodes.payout}
                        </p>
                    </div>

                    {/* They Get */}
                    <div className="relative w-full rounded-lg overflow-hidden border-2 border-black p-3">
                        <div className="flex flex-col items-start justify-between space-y-1">
                            <label htmlFor="amount">They Get</label>
                            <input
                                type="text"
                                id="payout-amount"
                                name="payout-amount"
                                className="text-3xl font-bold w-auto outline-none border-none"
                                value={amount.payout}
                                min={0}
                                onChange={(e) => handlePayoutChange(e)}
                            />
                        </div>
                        <div className="absolute h-full inset-y-0 right-0 flex flex-col items-center justify-center p-2 bg-secondar-yellow">
                            <select
                                className="bg-transparent border-none outline-none w-[100px] text-xl font-bold text-center"
                                name="payout"
                                onChange={handleCurrencyChange}
                            >
                                {currenciesList
                                    .filter(
                                        (currency) => currency.code !== currencyCodes.payin
                                    ) // Filter out the selected payin currency
                                    .map((currency, index) => (
                                        <option key={index} value={currency.code}>
                                            {currency.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    {/* Fee */}
                    <div className="w-full flex flex-row items-center justify-between">
                        <p className="text-[14px] font-semibold text-black/70">
                            Fee
                        </p>
                        <p className="text-[14px] font-semibold text-black/70">
                            {fee} {currencyCodes.payin}
                        </p>
                    </div>
                    {/* Total to pay */}
                    <div className="w-full flex flex-row items-center justify-between">
                        <p className="text-[14px] font-semibold text-black/70">
                            Total to pay
                        </p>
                        <p className="text-[14px] font-semibold text-black/70">
                            {parseFloat(amount.payin) + fee} {currencyCodes.payin}
                        </p>
                    </div>

                    {did ? (
                        name ? (
                            jwt ? (
                                <>
                                    {/* Offerings */}
                                    <div className="relative w-full flex flex-col items-center justify-between">
                                        {loading ? (
                                            <button
                                                type="button"
                                                className="w-full text-[14px] font-semibold text-black/70 text-center bg-primary-gray/70 border py-3 px-5 border-black rounded-lg"
                                                disabled
                                            >
                                                Loading Offers
                                            </button>
                                        ) : filteredOfferings.length === 0 ? (
                                            <button
                                                type="button"
                                                className="w-full text-[14px] font-medium text-black/70 text-center bg-red-100 border py-3 px-5 border-black rounded-lg"
                                                disabled
                                            >
                                                <span>
                                                    No Offer Available for{" "}
                                                    <span className="text-red-500 font-bold">
                                                        {currencyCodes.payin}
                                                    </span>{" "}
                                                    to{" "}
                                                    <span className="text-red-500 font-bold">
                                                        {currencyCodes.payout}
                                                    </span>
                                                </span>
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    className="w-full text-[14px] font-semibold text-black/70 text-center bg-primary-gray border py-3 px-5 border-black rounded-lg"
                                                    onClick={() => setIsOpen(!isOpen)}
                                                >
                                                    View {filteredOfferings.length} Offer
                                                    {filteredOfferings.length > 1 && "s"}
                                                </button>
                                                {isOpen && (
                                                    <div className="absolute w-full flex flex-col items-center justify-center space-y-4 bg-yellow-200 inset-x-0 translate-y-[50px] p-3 rounded-lg text-[12px]">
                                                        {filteredOfferings.map(
                                                            (pfi: any, index: number) => (
                                                                <div
                                                                    key={index}
                                                                    className="bg-blue-200 w-full rounded-md p-4 space-y-3"
                                                                >
                                                                    <span className="w-full text-[14px] font-bold capitalize">
                                                                        {pfi.pfiName}
                                                                    </span>
                                                                    {pfi.offerings.map(
                                                                        (offering: any, index: number) => (
                                                                            <div key={index} className="relative p-2 bg-green-50 rounded-md w-full flex flex-col items-start justify-start space-y-2">
                                                                                <div className="w-full inline-flex items-center justify-between">
                                                                                    <div className="inline-flex items-center justify-start">
                                                                                        <span className="font-semibold text-[14px]">
                                                                                            {
                                                                                                offering.data.payin
                                                                                                    .currencyCode
                                                                                            }{" "}
                                                                                            to{" "}
                                                                                            {
                                                                                                offering.data.payout
                                                                                                    .currencyCode
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span>
                                                                                            1{" "}
                                                                                            {
                                                                                                offering.data.payin
                                                                                                    .currencyCode
                                                                                            }{" "}
                                                                                            ={" "}
                                                                                        </span>
                                                                                        <span className="font-semibold">
                                                                                            {
                                                                                                offering.data
                                                                                                    .payoutUnitsPerPayinUnit
                                                                                            }{" "}
                                                                                            {
                                                                                                offering.data.payout
                                                                                                    .currencyCode
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="inline-flex items-center justify-between space-x-2">
                                                                                    {offering.data?.payin?.methods?.map(
                                                                                        (
                                                                                            method: any,
                                                                                            index: number
                                                                                        ) => (
                                                                                            <div
                                                                                                key={`${index}+1`}
                                                                                                className="text-primary-green font-medium"
                                                                                            >
                                                                                                {method.kind}
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                                    <span>to</span>
                                                                                    {offering.data?.payout?.methods?.map(
                                                                                        (method: any) => (
                                                                                            <div key={index} className="text-primary-green font-medium">
                                                                                                {method.kind}
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                                <div>
                                                                                    {offering.data?.payout?.methods?.map(
                                                                                        (method: any) => (
                                                                                            <div key={index}>
                                                                                                <span className="text-black">
                                                                                                    Speed :
                                                                                                </span>{" "}
                                                                                                <span className="text-primary-green font-medium">
                                                                                                    {(
                                                                                                        method.estimatedSettlementTime /
                                                                                                        1000 /
                                                                                                        60
                                                                                                    ).toFixed(2)}
                                                                                                </span>
                                                                                                <span className="text-black">
                                                                                                    {" "}
                                                                                                    minutes
                                                                                                </span>
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                                <div className="w-full flex flex-col items-center justify-center space-y-3">
                                                                                    <div className="w-full text-center">
                                                                                        {offering.data.description}?
                                                                                    </div>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="w-full text-center bg-primary-green text-white py-1.5 px-4"
                                                                                        onClick={() =>
                                                                                            handleGetOffers(pfi)
                                                                                        }
                                                                                    >
                                                                                        Select Offer
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Next button */}
                                    {filteredOfferings.length > 0 && (
                                        <div
                                            className={`w-auto flex flex-row items-center ${step > 1 ? "justify-between" : "justify-end"
                                                }`}
                                        >
                                            {step > 1 && (
                                                <button
                                                    className="border block bg-primary-green text-white py-2 px-5 rounded-lg"
                                                    type="button"
                                                    onClick={() => setStep(step - 1)}
                                                >
                                                    Back
                                                </button>
                                            )}

                                            {selectedPfi && (
                                                <button
                                                    className="border block bg-primary-green text-white py-2 px-5 rounded-lg"
                                                    type="button"
                                                    onClick={() => {
                                                        credential();
                                                        setStep(step + 1);
                                                    }}
                                                >
                                                    Next
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className="w-full text-[14px] font-semibold text-white text-center bg-primary-green border py-3 px-5 border-black rounded-md"
                                    onClick={() => verifyUser()}
                                >
                                    {verifyingUser
                                        ? "Verifying ..."
                                        : "Verify your account"}
                                </button>
                            )
                        ) : (
                            <div className="w-full text-[14px] font-semibold text-black/70 text-center bg-red-100 border py-3 px-5 border-black rounded-md">
                                Create your profile to continue
                            </div>
                        )
                    ) : (
                        <div className="w-full text-[14px] font-semibold text-black/70 text-center bg-red-100 border py-3 px-5 border-black rounded-md">
                            Login to continue
                        </div>
                    )}
                </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <div className="w-full space-y-5">
                    <div className="text-[18px] font-semibold">Request Quote</div>
                    <p className="text-black/70 text-[14px]">
                        Now that you&apos;ve found an offering that meets your
                        needs, you can request a quote to receive a formal offer.
                    </p>

                    <div className="flex flex-col items-start justify-between space-y-1 border-2 border-black p-2 rounded-lg overflow-hidden">
                        <label className="font-semibold" htmlFor="amount">
                            Sending Account Number
                        </label>
                        <input
                            type=""
                            id="payin"
                            name="payin"
                            className="text-md font-medium w-full outline-none border-none text-primary-green"
                            placeholder={`${formatAccountNumber("0000000000000000")}`}
                            value={`${formatAccountNumber(account.payin)}`}
                            min={0}
                            maxLength={12}
                            onChange={(e) => handleAccountChange(e)}
                        />
                    </div>

                    <div className="flex flex-col items-start justify-between space-y-1 border-2 border-black p-2 rounded-lg overflow-hidden">
                        <label className="font-semibold" htmlFor="amount">
                            Reception Account Number
                        </label>
                        <input
                            type=""
                            id="payout"
                            name="payout"
                            className="text-md font-medium w-full outline-none border-none text-primary-green"
                            placeholder={`${formatAccountNumber("0000000000000000")}`}
                            value={`${formatAccountNumber(account.payout)}`}
                            min={0}
                            maxLength={12}
                            onChange={(e) => handleAccountChange(e)}
                        />
                    </div>

                    {!rfq && account.payin && account.payout && (
                        <button
                            className="w-full border block bg-primary-green text-white py-2 px-5 rounded-lg"
                            type="button"
                            onClick={() => requestQuote()}
                        >
                            Request Quote
                        </button>
                    )}

                    {rfq && account.payin && account.payout && (
                        <button
                            className="w-full border block bg-primary-green text-white py-2 px-5 rounded-lg"
                            type="button"
                            onClick={() => processQuote()}
                        >
                            {loading ? " ..." : "Place Order"}
                        </button>
                    )}
                    <div
                        className={`w-auto flex flex-row items-center ${step > 1 ? "justify-between" : "justify-end"
                            }`}
                    >
                        {step > 1 && (
                            <button
                                className="border block bg-primary-green text-white py-2 px-5 rounded-lg"
                                type="button"
                                onClick={() => setStep(step - 1)}
                            >
                                Back
                            </button>
                        )}
                        <button
                            className="border block bg-primary-green text-white py-2 px-5 rounded-lg"
                            type="button"
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default SendMoneyContent;