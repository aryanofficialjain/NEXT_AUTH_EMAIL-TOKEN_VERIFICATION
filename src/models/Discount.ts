const { model, Schema } = require("mongoose");

const discountSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true, // Ensure each discount code is unique
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensure the discount amount is non-negative
  },
  type: {
    type: String,
    enum: ["percentage", "fixed"], // Discount type can be percentage or fixed amount
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  applicableCars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car", // Reference to the Car schema
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema, the admin who created the discount
    required: true,
  },
}, { timestamps: true });

const Discount = model("Discount", discountSchema);

module.exports = Discount;