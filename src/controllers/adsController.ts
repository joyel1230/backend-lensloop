import Stripe from "stripe";
import { Request, Response } from "express";
import { Ads } from "../models/ads";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2022-11-15",
});

export const postPayment = async (req: Request, res: Response) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      description: "Lenseloop Ads",
      payment_method: id,
      confirm: true,
    });
    console.log(payment, "payment");
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Payment Failed",
      seccess: false,
    });
  }
};

export const postAds = async (req: Request, res: Response) => {
  try {
    const data = await new Ads({ ...req.body, date: new Date() }).save();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const patchPayment = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const data = await Ads.updateOne(
      { _id: req.body.id },
      { $set: { payment: true } }
    );
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getAds = async (req: Request, res: Response) => {
  try {
    if (req.query.userId) {
      const ads = await Ads.find({ userId: req.query.userId,deleted: false }).populate(
        "userId"
      );
      res.json(ads);
    } else {
      const ads = await Ads.find({}).populate("userId");
      res.json(ads);
    }
  } catch (error) {
    console.log(error);
  }
};

export const patchDeleteAds = async (req: Request, res: Response) => {
  try {
    const { postId, value } = req.body;
    await Ads.updateOne({ _id: postId }, { $set: { deleted: value } });
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
