import { UnifyModel, IUnify } from "../models/unify-data.model";

class UnifyService {
  async getCurrent(): Promise<IUnify | null> {
    // Ordenar por _id descendente para obtener el más reciente
    const result = await UnifyModel.findOne().sort({ _id: -1 });
    console.log("getCurrent result:", result);
    console.log(
      "Total documents in collection:",
      await UnifyModel.countDocuments()
    );
    return result;
  }

  async getLast(): Promise<IUnify | null> {
    // Verificar si existe updatedAt en algún documento
    const result = await UnifyModel.findOne().sort({ _id: -1 });
    return result;
  }

  async update(data: Partial<IUnify>): Promise<IUnify> {
    const current = await this.getCurrent();

    if (!current) {
      const newUnify = new UnifyModel(data);
      return await newUnify.save();
    }

    Object.assign(current, data);
    return await current.save();
  }

  async create(data: Partial<IUnify>): Promise<IUnify> {
    const unify = new UnifyModel(data);
    return await unify.save();
  }
}

export default new UnifyService();
