import { UserModel, IUser } from '../models/user.model';

class UserService {
  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(data);
    return await user.save();
  }

  async findAll(): Promise<IUser[]> {
    return await UserModel.find().select('-password').sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id).select('-password');
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email }).select('+password');
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-password');
  }

  async delete(id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default new UserService();
