import { OriHistoryModel, IOriHistory } from '../models/ori-history.model';

class OriHistoryService {
  async create(data: Partial<IOriHistory>): Promise<IOriHistory> {
    const oriHistory = new OriHistoryModel(data);
    return await oriHistory.save();
  }

  async findAll(limit: number = 100): Promise<IOriHistory[]> {
    return await OriHistoryModel.find()
      .sort({ timeStamp: -1 })
      .limit(limit);
  }

  async findByUuid(uuid: string): Promise<IOriHistory | null> {
    return await OriHistoryModel.findOne({ uuid });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<IOriHistory[]> {
    return await OriHistoryModel.find({
      timeStamp: { $gte: startDate, $lte: endDate }
    }).sort({ timeStamp: -1 });
  }

  async delete(uuid: string): Promise<IOriHistory | null> {
    return await OriHistoryModel.findOneAndDelete({ uuid });
  }
}

export default new OriHistoryService();
