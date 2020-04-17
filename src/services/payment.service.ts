export class PaymentService {
  public proceed = async(method: any, price: number, paymentInfo?: any): Promise<any> => {
    setTimeout(
      () => {
        return Promise.resolve();
      },
      3000,
    );
    return Promise.resolve();
  }
}
