// "use client";

// import { pfisList, currenciesList } from "@/data";
// import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
// import { getOfferings } from "@/lib/state/pfisSlice";
// import { getVcJwt } from "@/lib/state/vcSlice";
// import React, { useEffect, useState } from "react";
// import { PresentationExchange } from "@web5/credentials";

// const SendMoneyPage = () => {
//   const dispatch = useAppDispatch();
//   const { did } = useAppSelector((state: any) => state.auth);
//   const { data } = useAppSelector((state: any) => state.userProfile);
//   const { offerings, loading } = useAppSelector((state: any) => state.pfis);
//   const { jwt, loading: loadkcc } = useAppSelector((state: any) => state.kcc);
//   const [selectedOffering, setSelectedOffering] = useState<any>(null);
//   const [selectedCredentials, setSelectedCredentials] = useState<any>(null);
//   const [rfq, setRfq] = useState<any>(null);
//   const [rfqData, setRfqData] = useState<any>({
//     to: "",
//     from: did,
//     offeringId: "",
//     claims: selectedCredentials,
//     payin: {
//       kind: "",
//       amount: "",
//       accountNumber: "",
//       routingNumber: "",
//     },
//     payout: {
//       kind: "",
//       accountNumber: "",
//     },
//   });

//   const [currencyCodes, setCurrencyCodes] = useState<any>({
//     payin: "",
//     payout: "",
//   });

//   const filteredOfferings = Array.isArray(offerings)
//     ? offerings.filter((offering: any) => {
//         const matchingOfferings = (offering.offerings || []).filter(
//           (off: any) => {
//             const payinMatch =
//               currencyCodes.payin === "" ||
//               off.data.payin.currencyCode === currencyCodes.payin;
//             const payoutMatch =
//               currencyCodes.payout === "" ||
//               off.data.payout.currencyCode === currencyCodes.payout;
//             return payinMatch && payoutMatch;
//           }
//         );
//         return matchingOfferings.length > 0;
//       })
//     : [];

//   const handleCurrencyCodeChange = (e: any) => {
//     const { name, value } = e.target;
//     setCurrencyCodes((prev: any) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     if (pfisList.length > 0) {
//       dispatch(getOfferings(pfisList));
//     }
//   }, [dispatch]);

//   const handleVerifyCustomer = () => {
//     if (did && data) {
//       dispatch(
//         getVcJwt({
//           customerName: data.name,
//           countryCode: "CD",
//           customerDID: did,
//         })
//       );
//     }
//     console.log("Login to continue");
//   };

//   console.log("user data : ", data);
//   console.log("vc jwt : ", jwt);

//   if (loading) {
//     return <main className="w-full mx-auto">Loading...</main>;
//   }

//   console.log("selectedOffering", selectedOffering);

//   const handleSelectedCredentials = () => {
//     if (selectedOffering && jwt) {
//       const slctdCredentials = PresentationExchange.selectCredentials({
//         vcJwts: jwt,
//         presentationDefinition: selectedOffering.data.requiredClaims,
//       });

//       setSelectedCredentials(slctdCredentials);
//     }
//   };

//   console.log("selectedCredentials", selectedCredentials);

//   const handleRfq = () => {};

//   return (
//     <main className="w-full mx-auto">
//       {did && data && (
//         <button
//           type="button"
//           className="bg-green-500 text-black p-2 rounded-lg"
//           onClick={handleVerifyCustomer}
//         >
//           Verify account
//         </button>
//       )}
//       {selectedOffering && jwt && (
//         <button
//           type="button"
//           className="bg-green-500 text-black p-2 rounded-lg"
//           onClick={handleSelectedCredentials}
//         >
//           Select credentials
//         </button>
//       )}
//       <form className="space-x-10 mb-10">
//         <div className="inline-flex items-center justify-start space-x-5">
//           <label>From</label>
//           <select
//             name="payin"
//             id="payin"
//             value={currencyCodes.payin}
//             onChange={handleCurrencyCodeChange}
//           >
//             <option value="">Select</option>
//             {currenciesList.map((currency: any, index: any) => (
//               <option key={index} value={currency.code}>
//                 {currency.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="inline-flex items-center justify-start space-x-5">
//           <label>To</label>
//           <select
//             name="payout"
//             id="payout"
//             value={currencyCodes.payout}
//             onChange={handleCurrencyCodeChange}
//           >
//             <option value="">Select</option>
//             {currenciesList.map((currency: any, index: any) => (
//               <option key={index} value={currency.code}>
//                 {currency.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </form>

//       <div>
//         <p>You send: {currencyCodes.payin || "Any"}</p>
//         <p>They receive: {currencyCodes.payout || "Any"}</p>
//       </div>

//       <div className="flex flex-col items-center justify-start space-y-5">
//         {filteredOfferings.map((offering: any, index: any) => (
//           <div
//             key={index + 1}
//             className="flex flex-col items-center justify-start space-y-5 p-5 border border-gray-300 rounded-md"
//           >
//             <p>{offering.pfiName}</p>
//             {offering.offerings
//               .filter((off: any) => {
//                 const payinMatch =
//                   currencyCodes.payin === "" ||
//                   off.data.payin.currencyCode === currencyCodes.payin;
//                 const payoutMatch =
//                   currencyCodes.payout === "" ||
//                   off.data.payout.currencyCode === currencyCodes.payout;
//                 return payinMatch && payoutMatch;
//               })
//               .map((off: any, idx: any) => (
//                 <>
//                   {/* <p>
//                     <span>Id : </span>
//                     <span>{off.metadata.id}</span>
//                   </p>
//                   <p>
//                     <span>Kind : </span>
//                     <span>{off.metadata.kind}</span>
//                   </p>
//                   <p>
//                     <span>Protocol : </span>
//                     <span>{off.metadata.protocol}</span>
//                   </p>
//                   <p>
//                     <span>Signature : </span>
//                     <span>{off.signature}</span>
//                   </p> */}
//                   <p>
//                     {off.data.payin.currencyCode} to{" "}
//                     {off.data.payout.currencyCode}
//                   </p>
//                   {off.data.payin.methods.map((method: any, i: any) => (
//                     <p key={i}>{method.kind}</p>
//                   ))}
//                   to{" "}
//                   {off.data.payout.methods.map((method: any, i: any) => (
//                     <>
//                       <p key={i}> {method.kind}</p>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setSelectedOffering(off);
//                         }}
//                         className="bg-green-500 text-black p-2 rounded-lg"
//                       >
//                         Proceed{" "}
//                       </button>
//                     </>
//                   ))}
//                 </>
//               ))}
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default SendMoneyPage;

"use client";

import { pfisList, currenciesList } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { getOfferings } from "@/lib/state/pfisSlice";
import { getVcJwt } from "@/lib/state/vcSlice";
import React, { useEffect, useState } from "react";
import { PresentationExchange } from "@web5/credentials";

const SendMoneyPage = () => {
  const dispatch = useAppDispatch();
  const { did } = useAppSelector((state: any) => state.auth);
  const { data } = useAppSelector((state: any) => state.userProfile);
  const { offerings, loading } = useAppSelector((state: any) => state.pfis);
  const { jwt } = useAppSelector((state: any) => state.kcc);

  const [currencyCodes, setCurrencyCodes] = useState({
    payin: "",
    payout: "",
  });
  const [selectedOffering, setSelectedOffering] = useState<any>(null);

  const handleCurrencyCodeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrencyCodes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (pfisList.length > 0) {
      dispatch(getOfferings(pfisList));
    }
  }, [dispatch]);

  const handleVerifyCustomer = () => {
    if (did && data) {
      dispatch(
        getVcJwt({
          customerName: data.name,
          countryCode: "CD",
          customerDID: did,
        })
      );
    }
  };

  const handleSelectedCredentials = () => {
    if (selectedOffering && jwt) {
      const credentials = PresentationExchange.selectCredentials({
        vcJwts: jwt,
        presentationDefinition: selectedOffering.data.requiredClaims,
      });
      // Assuming the next step is necessary here
      console.log("Selected Credentials:", credentials);
    }
  };

  const getFilteredOfferings = () => {
    if (!Array.isArray(offerings)) return [];

    return offerings.filter((offering) =>
      (offering.offerings || []).some((off: any) => {
        const payinMatch =
          !currencyCodes.payin ||
          off.data.payin.currencyCode === currencyCodes.payin;
        const payoutMatch =
          !currencyCodes.payout ||
          off.data.payout.currencyCode === currencyCodes.payout;
        return payinMatch && payoutMatch;
      })
    );
  };

  if (loading) {
    return <main className="w-full mx-auto">Loading...</main>;
  }

  return (
    <main className="w-full mx-auto">
      {did && data && (
        <button
          type="button"
          className="bg-green-500 text-black p-2 rounded-lg"
          onClick={handleVerifyCustomer}
        >
          Verify account
        </button>
      )}

      {selectedOffering && jwt && (
        <button
          type="button"
          className="bg-green-500 text-black p-2 rounded-lg"
          onClick={handleSelectedCredentials}
        >
          Select credentials
        </button>
      )}

      <form className="space-x-10 mb-10">
        <CurrencySelect
          label="From"
          name="payin"
          value={currencyCodes.payin}
          onChange={handleCurrencyCodeChange}
        />
        <CurrencySelect
          label="To"
          name="payout"
          value={currencyCodes.payout}
          onChange={handleCurrencyCodeChange}
        />
      </form>

      <div>
        <p>You send: {currencyCodes.payin || "Any"}</p>
        <p>They receive: {currencyCodes.payout || "Any"}</p>
      </div>

      <div className="flex flex-col items-center justify-start space-y-5">
        {getFilteredOfferings().map((offering: any, index: number) => (
          <OfferingCard
            key={index}
            offering={offering}
            currencyCodes={currencyCodes}
            setSelectedOffering={setSelectedOffering}
          />
        ))}
      </div>
    </main>
  );
};

const CurrencySelect = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="inline-flex items-center justify-start space-x-5">
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}>
      <option value="">Select</option>
      {currenciesList.map((currency, index) => (
        <option key={index} value={currency.code}>
          {currency.name}
        </option>
      ))}
    </select>
  </div>
);

const OfferingCard = ({
  offering,
  currencyCodes,
  setSelectedOffering,
}: {
  offering: any;
  currencyCodes: any;
  setSelectedOffering: (off: any) => void;
}) => {
  const filteredOfferings = offering.offerings.filter((off: any) => {
    const payinMatch =
      !currencyCodes.payin ||
      off.data.payin.currencyCode === currencyCodes.payin;
    const payoutMatch =
      !currencyCodes.payout ||
      off.data.payout.currencyCode === currencyCodes.payout;
    return payinMatch && payoutMatch;
  });

  return (
    <div className="flex flex-col items-center justify-start space-y-5 p-5 border border-gray-300 rounded-md">
      <p>{offering.pfiName}</p>
      {filteredOfferings.map((off: any, idx: number) => (
        <div key={idx}>
          <p>
            {off.data.payin.currencyCode} to {off.data.payout.currencyCode}
          </p>
          {off.data.payin.methods.map((method: any, i: number) => (
            <p key={i}>{method.kind}</p>
          ))}
          {off.data.payout.methods.map((method: any, i: number) => (
            <div key={i}>
              <p>{method.kind}</p>
              <button
                type="button"
                className="bg-green-500 text-black p-2 rounded-lg"
                onClick={() => setSelectedOffering(off)}
              >
                Proceed
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SendMoneyPage;
