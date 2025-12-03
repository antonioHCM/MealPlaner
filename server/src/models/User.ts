import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string; // hashed
  name?: string;
  role?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { 
    type: String,
     required: true,
      unique: true,
       lowercase: true
       },

  password: { 
    type: String,
     required: true 
    },

  name: { 
    type: String
   },

  role: { 
    type: String,
     default: "user" 
    },
    
}, { timestamps: true });

export const User = model<IUser>("User", userSchema);
