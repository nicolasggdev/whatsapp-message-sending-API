const { phoneNumberFormatter } = require("../utils/formatter");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  // authStrategy: new LocalAuth({ clientId: "client-one" }),
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

client.on("disconnected", (disc) => {
  console.log("disconnected", disc);
});

exports.sendMessage = async (req, res, next) => {
  // It's pending to add validator
  const { countryCode, number, message } = req.body;

  const phone = await phoneNumberFormatter(countryCode, number);

  if (client.info === undefined) {
    let info = "The system is not ready yet";
    console.log();
    res.status(503).json({
      status: "success",
      message: info,
    });
  } else {
    await client
      .sendMessage(phone, message)
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: "Message sent successfully",
          response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          response: err,
        });
      });
  }
};

// This endpoint doesn't works
exports.closeSession = async (req, res, next) => {
  if (client.info === undefined) {
    res.status(200).json({
      message: "pending",
    });
  } else {
    console.log(1);
    client.on("disconnected", (reason) => {
      console.log(2);
      session = null;
      client.destroy();
      console.log("Reason for disconnected: ", reason);
      client.initialize();
    });

    // client.on("disconnected", (reason) => {
    //   console.log("Client was logged out", reason);
    //   client.initialize(); // this what i was need
    // });

    // client.on("ready", () => {
    //   console.log(2);
    //   client.destroy();
    //   client.initialize();
    // });

    // client.destroy();
    // client.initialize();
    console.log(3);
    res.status(200).json({
      message: "ok",
    });
  }
};
