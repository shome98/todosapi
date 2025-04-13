import mongoose, { Document, Model, models, Schema } from "mongoose";

export interface ITodo extends Document{
    title: string;
    description?: string;
    completed: boolean|false;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: Schema.Types.ObjectId | string;
}
const todoSchema = new Schema<ITodo>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
}, { timestamps: true });
const modelName = "Todo";


const Todo: Model<ITodo> =
  (mongoose.models[modelName] as Model<ITodo>) ||
  mongoose.model<ITodo>(modelName, todoSchema);
export default Todo;