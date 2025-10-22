import { SpHistoryModel, ISpHistory } from '../models/sp-history.model';

class SpHistoryService {
  async create(data: Partial<ISpHistory>): Promise<ISpHistory> {
    const spHistory = new SpHistoryModel(data);
    return await spHistory.save();
  }

  async findAll(limit: number = 100): Promise<ISpHistory[]> {
    return await SpHistoryModel.find()
      .sort({ timeStamp: -1 })
      .limit(limit);
  }

  async findByUuid(uuid: string): Promise<ISpHistory | null> {
    return await SpHistoryModel.findOne({ uuid });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<ISpHistory[]> {
    return await SpHistoryModel.find({
      timeStamp: { $gte: startDate, $lte: endDate }
    }).sort({ timeStamp: -1 });
  }

  async delete(uuid: string): Promise<ISpHistory | null> {
    return await SpHistoryModel.findOneAndDelete({ uuid });
  }
}

export default new SpHistoryService();
