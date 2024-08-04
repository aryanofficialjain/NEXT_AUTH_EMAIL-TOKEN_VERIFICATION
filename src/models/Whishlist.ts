import mongoose, { Schema } from "mongoose";


const wishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const Wishlist = mongoose.models.whishlists || mongoose.model("Whishlist", wishlistSchema);

export default Wishlist;

