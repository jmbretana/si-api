const Ori = require('../models/ori.model');

class OriService {
  async create(data) {
    const ori = new Ori(data);
    return await ori.save();
  }

  async findAll() {
    return await Ori.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Ori.findOne({ id });
  }

  async update(id, data) {
    return await Ori.findOneAndUpdate(
      { id },
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Ori.findOneAndDelete({ id });
  }
}

module.exports = new OriService();
