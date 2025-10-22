import { FcModel, IFc } from '../models/fc.model';

class FcService {
  async getCurrent(): Promise<IFc | null> {
    return await FcModel.findOne().sort({ updatedAt: -1 });
  }

  async update(data: Partial<IFc>): Promise<IFc> {
    const current = await this.getCurrent();
    
    if (!current) {
      const newFc = new FcModel(data);
      return await newFc.save();
    }

    Object.assign(current, data);
    return await current.save();
  }

  async create(data: Partial<IFc>): Promise<IFc> {
    const fc = new FcModel(data);
    return await fc.save();
  }
}

export default new FcService();
