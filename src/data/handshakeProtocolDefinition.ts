const handshakeProtocol = {
  protocol: "https://handshake.example",
  published: true,
  types: {
    users: {
      schema: "https://handshake.example/usersSchema",
      dataFormats: ["application/json"],
    },
  },
  structure: {
    users: {
      $actions: [{ who: "anyone", can: ["create", "read"] }],
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
