const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ACSchema = new Schema(
  {
    as: {
      type: Boolean,
      default: true
    }
  },{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
);

const ACModel = mongoose.model("AC", ACSchema);

module.exports = ACModel;