import express from "express";
import MyRestaurantController from "../controllers/MyRestaurantController";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1014,
    },

});

router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

router.post("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse, validateMyRestaurantRequest, MyRestaurantController.createMyRestaurant);

router.put("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse, MyRestaurantController.updateMyRestaurant);

export default router;