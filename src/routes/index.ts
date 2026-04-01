import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";
import { CategoryRoutes } from "../modules/Category/category.route";


const router=Router();

const routerManger=[
    {
        path:"/auth",
        route:AuthRoutes,
    },
    {
        path:"/tutors",
        route:TutorRoutes,
    },

    {
        path:"/categories",
        route:CategoryRoutes,
    }

]

routerManger.forEach((r)=>router.use(r.path,r.route));
export default router