import { OrderCreatedListener } from "./events/listeners/order-created-listener";
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

    new OrderCreatedListener(natsWrapper.client).listen();

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
  } catch (err) {
    console.error(err);
  }
};

start();
