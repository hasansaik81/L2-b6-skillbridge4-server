import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { ReviewRoutes } from "../modules/Reiview/reiview.route";


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
        path:"/category",
        route:CategoryRoutes,
    },
    {
        path:"/bookings",
        route:BookingRoutes,
    },
    {
        path:"/reviews",
        route:ReviewRoutes,
    }

]

routerManger.forEach((r)=>router.use(r.path,r.route));
export default router