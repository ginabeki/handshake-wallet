"use client";

import { pfisList, currenciesList } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { getOfferings } from "@/lib/state/pfisSlice";
import React, { useEffect, useState } from "react";

const SendMoneyPage = () => {
  const dispatch = useAppDispatch();
  const { offerings, loading, error, status } = useAppSelector(
    (state: any) => state.pfis
  );

  const [currencyCodes, setCurrencyCodes] = useState<any>({
    payin: "",
    payout: "",
  });

  const filteredOfferings = Array.isArray(offerings)
    ? offerings.filter((offering: any) => {
        const matchingOfferings = (offering.offerings || []).filter(
          (off: any) => {
            const payinMatch =
              currencyCodes.payin === "" ||
              off.data.payin.currencyCode === currencyCodes.payin;
            const payoutMatch =
              currencyCodes.payout === "" ||
              off.data.payout.currencyCode === currencyCodes.payout;
            return payinMatch && payoutMatch;
          }
        );
        return matchingOfferings.length > 0;
      })
    : [];

  console.log("filteredOfferings", filteredOfferings);

  const handleCurrencyCodeChange = (e: any) => {
    const { name, value } = e.target;
    setCurrencyCodes((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (pfisList.length > 0) {
      dispatch(getOfferings(pfisList));
    }
  }, [dispatch]);

  if (loading) {
    return <main className="w-full mx-auto">Loading...</main>;
  }

  return (
    <main className="w-full mx-auto">
      <form className="space-x-10 mb-10">
        <div className="inline-flex items-center justify-start space-x-5">
          <label>From</label>
          <select
            name="payin"
            id="payin"
            value={currencyCodes.payin}
            onChange={handleCurrencyCodeChange}
          >
            <option value="">Select</option>
            {currenciesList.map((currency: any, index: any) => (
              <option key={index} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>
        <div className="inline-flex items-center justify-start space-x-5">
          <label>To</label>
          <select
            name="payout"
            id="payout"
            value={currencyCodes.payout}
            onChange={handleCurrencyCodeChange}
          >
            <option value="">Select</option>
            {currenciesList.map((currency: any, index: any) => (
              <option key={index} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div>
        <p>You send: {currencyCodes.payin || "Any"}</p>
        <p>They receive: {currencyCodes.payout || "Any"}</p>
      </div>

      <div className="flex flex-col items-center justify-start space-y-5">
        {filteredOfferings.map((offering: any, index: any) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start space-y-5 p-5 border border-gray-300 rounded-md"
          >
            <p>{offering.pfiName}</p>
            {offering.offerings
              .filter((off: any) => {
                const payinMatch =
                  currencyCodes.payin === "" ||
                  off.data.payin.currencyCode === currencyCodes.payin;
                const payoutMatch =
                  currencyCodes.payout === "" ||
                  off.data.payout.currencyCode === currencyCodes.payout;
                return payinMatch && payoutMatch;
              })
              .map((off: any, idx: any) => (
                <p key={idx}>
                  {off.data.payin.amount} {off.data.payin.currencyCode} to{" "}
                  {off.data.payout.amount} {off.data.payout.currencyCode}
                </p>
              ))}
            <button>Send Money</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SendMoneyPage;
