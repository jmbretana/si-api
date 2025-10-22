import { FcHistoryModel, IFcHistory } from '../models/fc-history.model';

class FcHistoryService {
  async create(data: Partial<IFcHistory>): Promise<IFcHistory> {
    const fcHistory = new FcHistoryModel(data);
    return await fcHistory.save();
  }

  async findAll(limit: number = 100): Promise<IFcHistory[]> {
    return await FcHistoryModel.find()
      .sort({ timeStamp: -1 })
      .limit(limit);
  }

  async findByUuid(uuid: string): Promise<IFcHistory | null> {
    return await FcHistoryModel.findOne({ uuid });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<IFcHistory[]> {
    return await FcHistoryModel.find({
      timeStamp: { $gte: startDate, $lte: endDate }
    }).sort({ timeStamp: -1 });
  }

  async delete(uuid: string): Promise<IFcHistory | null> {
    return await FcHistoryModel.findOneAndDelete({ uuid });
  }
}

export default new FcHistoryService();
