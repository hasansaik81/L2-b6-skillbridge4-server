import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";


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

]

routerManger.forEach((r)=>router.use(r.path,r.route));
export default router