import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true,
      trim: true,
       index: true
       },

  pictureUrl: String,

  supermarketChain: { 
    type: String,
     index: true 
    },
  priceCents: { 
    type: Number,
     required: true, min: 0
     },

  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
      required: true,
       index: true 
      },

  createdAt: { 
    type: Date,
     default: Date.now 
    }
});

module.exports = mongoose.model('Product', ProductSchema);
