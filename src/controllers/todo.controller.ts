import {Request,Response} from "express"
import Todo, { ITodo } from "../models/todo.model";

export const getTodos = async (req: Request, res: Response) => {
    try {
        const userId = req?.userId;
        if (!userId) {
            return res.status(401).send({ error: "🚫 Unauthorized. Please log in to continue." });
        }
        
        const todos = await Todo.find({ userId: userId });
        if (!todos) {
            return res.send({ error: "🚫 Failed to retrieve the todos." }).status(401);
        }
        return res.send({ message: "✅ Successfully fetched the todos.", todos: todos }).status(201);
        
    } catch (error) {
        console.error("❌ Error retrieving the todos:", error);
        return res.send({ error: "⚠️ Oops! Failed to retrieve the todos. Please try again." }).status(500);
    }
    
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; 

    if (!userId) {
      return res.status(401).json({ error: "🚫 Unauthorized. Please log in to continue." });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "😠 Please enter a title and description." });
    }

    const newTodo = await Todo.create({ title, description, userId });

    return res.status(201).json({ message: "✅ Successfully created the new todo.", todo: newTodo });

  } catch (error) {
    console.error("❌ Error creating the new todo:", error);
    return res.status(500).json({ error: "⚠️ Oops! Failed to create the new todo. Please try again." });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; 
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "🚫 Unauthorized. Please log in to continue." });
    }

    if (!id) {
      return res.status(400).json({ error: "🚫 Not a valid todo ID!" });
    }

    const todo = await Todo.findOne({ _id: id, userId }).lean();

    if (!todo) {
      return res.status(404).json({ error: "🚫 Could not retrieve the todo. It may not exist or belong to this user." });
    }

    return res.status(200).json({ message: "😊 Successfully retrieved the todo.", todo });

  } catch (error) {
    console.error("❌ Error retrieving the todo:", error);
    return res.status(500).json({ error: "⚠️ Oops! Failed to retrieve the todo. Please try again." });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "🚫 Unauthorized. Please log in to continue." });
    }

    if (!id) {
      return res.status(400).json({ error: "🚫 Not a valid todo ID!" });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { title, description, completed },
      { new: true }
    ).lean();

    if (!updatedTodo) {
      return res.status(404).json({ error: "🚫 Could not update the todo. It may not exist or belong to this user." });
    }

    return res.status(200).json({ message: "😊 Successfully updated the todo.", todo: updatedTodo });

  } catch (error) {
    console.error("❌ Error updating the todo:", error);
    return res.status(500).json({ error: "⚠️ Oops! Failed to update the todo. Please try again." });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; 
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "🚫 Unauthorized. Please log in to continue." });
    }

    if (!id) {
      return res.status(400).json({ error: "🚫 Not a valid todo ID!" });
    }

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId }).lean();

    if (!deletedTodo) {
      return res.status(404).json({ error: "🚫 Could not delete the todo. It may not exist or belong to this user." });
    }

    return res.status(200).json({ message: "😊 Successfully deleted the todo.", todo: deletedTodo });

  } catch (error) {
    console.error("❌ Error deleting the todo:", error);
    return res.status(500).json({ error: "⚠️ Oops! Failed to delete the todo. Please try again." });
  }
};

export const toggleComplete = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; 
    const { id } = req.params;
    const { completed } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "🚫 Unauthorized. User ID not found." });
    }

    if (!id) {
      return res.status(400).json({ error: "🚫 Not a valid todo ID!" });
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { completed },
      { new: true }
    ).lean();

    if (!todo) {
      return res.status(404).json({ error: "🚫 Could not update the todo. It may not exist or belong to this user." });
    }

    return res.status(200).json({ message: "😊 Successfully updated the todo.", todo });

  } catch (error) {
    console.error("❌ Error updating the todo:", error);
    return res.status(500).json({ error: "⚠️ Oops! Failed to update the todo. Please try again." });
  }
};