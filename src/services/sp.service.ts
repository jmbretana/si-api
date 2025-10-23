import { SpModel, ISp } from "../models/sp.model";

class SpService {
  async getCurrent(): Promise<ISp | null> {
    return await SpModel.findOne().sort({ updatedAt: -1 });
  }

  async getLast(): Promise<ISp | null> {
    return await SpModel.findOne().sort({ updatedAt: -1 });
  }

  async update(data: Partial<ISp>): Promise<ISp> {
    const current = await this.getCurrent();

    if (!current) {
      const newSp = new SpModel(data);
      return await newSp.save();
    }

    Object.assign(current, data);
    return await current.save();
  }

  async create(data: Partial<ISp>): Promise<ISp> {
    const sp = new SpModel(data);
    return await sp.save();
  }
}

export default new SpService();
