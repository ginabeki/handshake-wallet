const offer = [
  [
    {
      metadata: {
        from: "did:dht:enwguxo8uzqexq14xupe4o9ymxw3nzeb9uug5ijkj9rhfbf1oy5y",
        protocol: "1.0",
        kind: "offering",
        id: "offering_01j609945sesdss5xnzkzs0w64",
        createdAt: "2024-08-23T18:51:45.721Z",
      },
      data: {
        description: "Exchange your Euros for US Dollars",
        payoutUnitsPerPayinUnit: "1.09",
        payout: {
          currencyCode: "USD",
          methods: [
            {
              kind: "USD_BANK_TRANSFER",
              estimatedSettlementTime: 43200,
              requiredPaymentDetails: {
                $schema: "http://json-schema.org/draft-07/schema#",
                title: "USD Required Payment Details",
                type: "object",
                required: ["accountNumber", "routingNumber"],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: "USD Bank Account Number",
                    description: "Bank account number to pay out USD to",
                    type: "string",
                  },
                  routingNumber: {
                    title: "USD Bank Routing Number",
                    description: "Bank routing number for the USD account",
                    type: "string",
                  },
                },
              },
            },
          ],
        },
        payin: {
          currencyCode: "EUR",
          methods: [
            {
              kind: "EUR_BANK_TRANSFER",
              requiredPaymentDetails: {
                $schema: "http://json-schema.org/draft-07/schema#",
                title: "EUR Required Payment Details",
                type: "object",
                required: ["accountNumber", "IBAN"],
                additionalProperties: false,
                properties: {
                  accountNumber: {
                    title: "EUR Bank Account Number",
                    description: "Bank account number to pay in EUR",
                    type: "string",
                  },
                  IBAN: {
                    title: "EUR IBAN",
                    description:
                      "International Bank Account Number for the EUR account",
                    type: "string",
                  },
                },
              },
            },
          ],
        },
        requiredClaims: {
          id: "3f78edc1-9f75-478b-a0d8-c9ee2550d366",
          format: {
            jwt_vc: {
              alg: ["ES256K", "EdDSA"],
            },
          },
          input_descriptors: [
            {
              id: "73b86039-d07e-4f9a-9f3d-a8f7a8ec1635",
              constraints: {
                fields: [
                  {
                    path: ["$.vc.credentialSchema.id", "$.credentialSchema.id"],
                    filter: {
                      type: "string",
                      const: "https://vc.schemas.host/kcc.schema.json",
                    },
                  },
                  {
                    path: ["$.vc.issuer", "$.issuer"],
                    filter: {
                      type: "string",
                      const:
                        "did:dht:bh8me68fsdb6xuyy3dsh4aanczexga3k3m7fk4ie6hj5jy6inq5y",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      signature:
        "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZW53Z3V4bzh1enFleHExNHh1cGU0bzl5bXh3M256ZWI5dXVnNWlqa2o5cmhmYmYxb3k1eSMwIn0..Pv46W9ePaQMHDB9u3tvX4toPkJ9HGLgNRzYJR5RQL5l8JB3yfLmXijXU4TuBVuKUjRutPXLVruxOvYgeooxRCA",
    },
  ],
];
