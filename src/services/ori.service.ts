import { OriModel, IOri } from "../models/ori.model";
import { OriHistoryModel, IOriHistory } from "../models/ori-history.model";
class OriService {
  async getCurrent(): Promise<IOri | null> {
    return await OriModel.findOne().sort({ updatedAt: -1 });
  }

  async getLast(): Promise<IOri | null> {
    return await OriModel.findOne().sort({ updatedAt: -1 });
  }

  async update(data: Partial<IOri>): Promise<IOri> {
    const current = await this.getCurrent();

    if (!current) {
      const newOri = new OriModel(data);
      return await newOri.save();
    }

    Object.assign(current, data);
    return await current.save();
  }

  async create(data: Partial<IOriHistory>): Promise<IOriHistory> {
    const ori = new OriHistoryModel(data);
    return await ori.save();
  }
}

export default new OriService();
