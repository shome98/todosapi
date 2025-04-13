import { Router,Request,Response,NextFunction } from "express";
import { createTodo, deleteTodo, getTodoById, getTodos, toggleComplete, updateTodo } from "../controllers/todo.controller";
import { auth } from "../middleware/auth.middleware";

export const asyncHandler = (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch(error => next(error));
    };
};
const router = Router();

router.get("/", asyncHandler(auth),asyncHandler(getTodos));
router.post("/", asyncHandler(auth),asyncHandler(createTodo));
router.get("/:id", asyncHandler(auth),asyncHandler(getTodoById));
router.post("/:id", asyncHandler(auth),asyncHandler(updateTodo));
router.patch("/:id", asyncHandler(auth), asyncHandler(toggleComplete));
router.delete("/:id", asyncHandler(auth), asyncHandler(deleteTodo));

export default router;