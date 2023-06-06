interface IPlansService {
  create(data: any): Promise<any>;
}

class PlansService implements IPlansService {
  create(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
