import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const fullUrl = req.body.fullUrl;
    console.log("The FullUrl is: ", fullUrl);
    const urlFound = await urlModel.find({ fullUrl });

    if (urlFound.length > 0) {
      res.status(409);
      res.send(urlFound);
    } else {
      const shortURL = await urlModel.create({
        fullUrl,
      });
      res.status(201).send(shortURL);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const shortURLs = await urlModel.find().sort({ createdAt: -1 });
  console.log("The FullUrl is: ", shortURLs);
  try {
    if (shortURLs.length > 0) {
      res.status(201).send(shortURLs);
    } else {
      res.status(404).send({ message: "Short Url's Not Found!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  const shortURL = await urlModel.findOne({ shortUrl: req.params.id });
  if (!shortURL) {
    res.status(404).send({ message: "Full Url Not Found" });
  } else {
    shortURL.clicks++;
    shortURL.save();
    res.redirect(`${shortURL.fullUrl}`);
  }
  try {
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const shortURL = await urlModel.findByIdAndDelete({ _id: req.params.id });
  if (shortURL) {
    res.status(201).send({ message: "Requested URL successfully Deleted!" });
    console.log("Requested URL successfully Deleted!");
  }
  try {
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};
