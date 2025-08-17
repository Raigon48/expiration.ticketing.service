import { Listener, OrderCreatedEvent, Subjects } from "@raipackages/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = "expiration-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, expiresAt } = data;

    const delay = new Date(expiresAt).getTime() - new Date().getTime();

    await expirationQueue.add(
      { orderId: id },
      {
        delay: delay,
      }
    );
    msg.ack();
  }
}
