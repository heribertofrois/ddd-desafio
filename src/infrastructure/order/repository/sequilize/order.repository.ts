import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    ); 
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id: id },
      include: ["items"],
    });
    const itens:OrderItem[]=[]
    orderModel.items.forEach(function (value) {
      itens.push(new OrderItem(value.id,value.product.name,value.product.price,value.product.id,value.quantity)) 
    }); 

    return new Order(orderModel.id,orderModel.customer_id,itens);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();

    const itensOrder:Order[] = []

    for(var item in orderModels){

      const orderModel = await OrderModel.findOne({
        where: { id: orderModels[item].id },
        include: ["items"],
      });
      const itens:OrderItem[]=[]
      orderModel.items.forEach(function (value) {
        itens.push(new OrderItem(value.id,value.name,value.price,value.product_id,value.quantity)) 
      });
      itensOrder.push(new Order(orderModels[item].id,orderModels[item].customer_id,itens))
    } 
    return itensOrder;
  }
}
