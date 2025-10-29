import { IOri, OriModel } from "../models/ori.model";
import { FcModel, IFc } from "../models/fc.model";
import { ISp, SpModel } from "../models/sp.model";

import "dotenv/config";
import { UnifyModel } from "../models/unify-data.model";

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
      fc: 60,
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

    await UnifyModel.updateOne(
      {},
      {
        $set: {
          ori: oriData.ori,
          oriSeconds: oriData.oriSeconds,
          fc: fcData.fc,
          fcSeconds: fcData.fcSeconds,
          sp: spData.sp,
          spSeconds: spData.spSeconds,
        },
      }
    );

    return {
      data: {
        ori: oriData,
        fc: fcData,
        sp: spData,
      },
      status: "success",
    };
  }
}

export default new ResetService();
