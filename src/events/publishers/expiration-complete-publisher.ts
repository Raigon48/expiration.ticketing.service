import { ExpirationComplete, Publisher, Subjects } from "@raipackages/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationComplete> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
