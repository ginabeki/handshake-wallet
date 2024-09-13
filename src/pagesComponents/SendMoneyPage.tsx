"use client";

import { pfisList } from "@/data";
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

  const handleCurrencyCodeChange = (e: any) => {
    setCurrencyCodes({
      ...currencyCodes,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (pfisList.length > 0) {
      // pfisList.forEach((pfi) => {
      //   dispatch(getOfferings(pfi.did));
      // });
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
          <label>Your send</label>
          <input
            type="text"
            name="payin"
            id="payin"
            maxLength={5}
            placeholder="currency code"
            value={currencyCodes.payin}
            onChange={handleCurrencyCodeChange}
          />
        </div>
        <div className="inline-flex items-center justify-start space-x-5">
          <label>Your send</label>
          <input
            type="text"
            name="payout"
            id="payout"
            maxLength={5}
            placeholder="currency code"
            value={currencyCodes.payout}
            onChange={handleCurrencyCodeChange}
          />
        </div>
      </form>

      <div>
        <p>You send {currencyCodes.payin}</p>
        <p>they recieved {currencyCodes.payout}</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-10">
        {Array.isArray(offerings) && offerings.length > 0 ? (
          offerings.map((allOfferings: any) =>
            allOfferings.map((offering: any, index: any) => {
              return (
                <div key={index} className="bg-gray-200 w-full p-2">
                  <div>
                    {offering.data.payin.currencyCode} -{" "}
                    {offering.data.payout.currencyCode}
                  </div>
                  <div>{offering.data.description}</div>
                </div>
              );
            })
          )
        ) : (
          <div>No offerings found</div>
        )}
        {}
      </div>
    </main>
  );
};

export default SendMoneyPage;
