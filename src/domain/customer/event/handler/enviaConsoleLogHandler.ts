import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAlterEndCustomerEvent from "../customer-alter-end-customer.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAlterEndCustomerEvent>
{
  handle(event: CustomerAlterEndCustomerEvent): void {
    console.log("Endereço do cliente: "+event.eventData.id+", "+event.eventData.name+" alterado para "+ event.eventData.street+
    " , "+ event.eventData.number+" , "+ event.eventData.zip+" , "+ event.eventData.city)
  }
}
