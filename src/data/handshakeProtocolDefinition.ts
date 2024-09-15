export const handshakeProtocol = {
  protocol: "https://handshake.example",
  published: true,
  types: {
    users: {
      schema: "https://handshake.example/users",
      dataFormats: ["application/json"],
    },
    marketplaceItem: {
      schema: "https://handshake.example/marketplaceItem",
      dataFormats: ["application/json"],
    },
    marketplace: {
      schema: "https://handshake.example/marketplace",
      dataFormats: ["application/json"],
    },
    marketplaceMessage: {
      schema: "https://handshake.example/marketplaceMessage",
      dataFormats: ["application/json"],
    },
  },
  structure: {
    users: {
      $actions: [{ who: "anyone", can: ["create", "read", "update"] }],
    },
    marketplace: {
      $actions: [{ who: "anyone", can: ["create", "read"] }],
    },
    marketplaceItem: {
      $actions: [
        { who: "anyone", can: ["read"] },
        {
          who: "author",
          of: "marketplaceItem",
          can: ["create", "update", "delete"],
        },
      ],
    },
    marketplaceMessage: {
      $actions: [
        { who: "author", of: "marketplaceItem", can: ["read"] },
        { who: "recipient", of: "marketplaceMessage", can: ["create", "read"] },
      ],
    },
  },
};

export const handshakeInstallProtocol = async (web5: any, did: string) => {
  if (!web5) {
    return;
  }
  try {
    const { protocol } = await web5.dwn.protocols.configure({
      message: {
        definition: handshakeProtocol,
      },
    });

    await protocol.send(did);
    console.log("Handshake protocol installed successfully");
  } catch (error) {
    console.error("Failed to install Handshake protocol", error);
  }
};
