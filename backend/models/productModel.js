import mongoose from "mongoose";
import bwipjs from "bwip-js"; // Import bwip-js library

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    barcode: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Middleware to generate barcode before saving the product
productSchema.pre("save", async function (next) {
  try {
    if (!this.barcode) {
      // Generate barcode using bwip-js
      const barcodeBuffer = await bwipjs.toBuffer({
        bcid: "code128", // Barcode type (Code 128 in this case)
        text: this._id.toString(), // Using product's ID as the barcode data
        scale: 3, // Scale factor
        height: 10, // Bar height, adjust as needed
        includetext: true, // Include human-readable text
      });

      // Save the barcode as a base64 string
      this.barcode = barcodeBuffer.toString("base64");
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Products", productSchema);
