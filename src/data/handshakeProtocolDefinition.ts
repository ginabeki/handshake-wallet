const handshakeProtocol = {
    protocol: 'https://handshake.example',
    published: true,
    types: {
        users: {
            schema: "https://handshake.example/usersSchema",
            dataFormats: ["application/json"]
        }
    },
    structure: {
        users: {
            $actions: [
                { who: "anyone", can: "write" },
                { who: "anyone", can: "read" },
            ]
        }
    }
}

export const handshakeInstallProtocol = async (web5: any, did: string) => {
    if (!web5 || !web5.dwn) {
        console.error('Web5 instance is not properly initialized');
        return;
    }
    try {
        console.log("Configuring protocol...");
        const {protocol} = await web5.dwn.protocols.configure({
            message: {
                definition: handshakeProtocol,
            }
        })
        console.log("Protocol configured, sending...");
        await protocol.send(did);
        console.log('Handshake protocol installed successfully');
    } catch (error) {
        console.error('Failed to install Handshake protocol', error);
    }
}