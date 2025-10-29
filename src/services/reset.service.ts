import { IOri, OriModel } from "../models/ori.model";
import { FcModel, IFc } from "../models/fc.model";
import { ISp, SpModel } from "../models/sp.model";

import "dotenv/config";

class ResetService {
  async reset() {
    // set ori value en 1 and seconds en 1 to current date
    const oriData: Partial<IOri> = {
      id: 1,
      ori: 1,
      oriSeconds: 1,
      timestamp: new Date(),
    };

    const fcData: Partial<IFc> = {
      id: "A",
      fc: 1,
      fcSeconds: 1,
      updatedAt: new Date(),
    };

    const spData: Partial<ISp> = {
      id: 1,
      sp: 1,
      spSeconds: 1,
      updatedAt: new Date(),
    };

    await OriModel.updateOne(
      {},
      { $set: { ...oriData, updatedAt: new Date() } }
    );
    await FcModel.updateOne({}, { $set: { ...fcData, updatedAt: new Date() } });
    await SpModel.updateOne({}, { $set: { ...spData, updatedAt: new Date() } });

    return true;
  }
}

export default new ResetService();
