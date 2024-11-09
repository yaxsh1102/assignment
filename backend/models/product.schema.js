const mongoose = require("mongoose")




const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
      },
      title: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      sold: {
        type: Boolean,
        default: false
      },
      dateOfSale: {
        type: Date,
        required: true
      }
    });

    module.exports = mongoose.model("Product" , productSchema)