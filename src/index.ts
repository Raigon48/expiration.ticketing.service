import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  try {
    await natsWrapper.connect(
      "ticketing",
      "expiration-asdfjkl",
      "http://nats-srv:4222"
    );

    natsWrapper.client.on("close", () => {
      console.log("Nats connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
  } catch (err) {
    console.error(err);
  }
};

start();
