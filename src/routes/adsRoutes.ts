import { Router } from "express";
import { verifyAuth } from "../middlewares/auth";
import {
  getAds,
  patchDeleteAds,
  patchPayment,
  postAds,
  postPayment,
} from "../controllers/adsController";

const router: Router = Router();

router.post("/", verifyAuth, postAds);

router.post("/payment", verifyAuth, postPayment);

router.patch("/payment", verifyAuth, patchPayment);

router.get("/", verifyAuth, getAds);

router.patch("/delete", verifyAuth, patchDeleteAds);


export default router;
