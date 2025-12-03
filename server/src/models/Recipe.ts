import mongoose from "mongoose";
const Product = require('./Product');

const RecipeItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Product',
      required: true 
    },

  quantity: { 
    type: Number,
     default: 1,
      min: 0 
    },

  unit: { 
    type: String 
  },

  priceAtUse: { 
    type: Number,
     min: 0 
    }// optional until service sets it
}, { _id: false });

const RecipeSchema = new mongoose.Schema({
  recepiName: { 
    type: String,
     required: true,
      trim: true
     },

  authorUser: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
      required: true,
       index: true
       },
  date: { type: Date,
     default: Date.now
     },

  items: { 
    type: [RecipeItemSchema],
     default: [] },

  totalPriceCents: { 
    type: Number,
     default: 0,
      min: 0 
    },

  instructions: {
    type: String
  }

});

module.exports = mongoose.model('Recipe', RecipeSchema);
