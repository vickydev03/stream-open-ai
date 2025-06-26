// const express = require("express");
import express from "express";
// import { configDotenv } from "dotenv";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
// const dotenv = require("dotenv");
// configDotenv()
// dotenv.config();
// console.log(process.env.STREAM_VIDEO_API_KEY, "ajay");

import { streamVideo } from "./stream-video.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/connect-openai", async (req, res) => {
  console.log("Received request to connect OpenAI agent");

  const { agentUserId, instruction, meetingId } = req.body;

  if (!agentUserId || !instruction) {
    return res
      .status(400)
      .json({ error: "agentUserId and instruction are required" });
  }
  const call = streamVideo.video.call("default", meetingId);

  try {
    const client = await streamVideo.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPEN_API_KEY,
      agentUserId: agentUserId,
    });

    client.updateSession({
      instructions: instruction,
    });

    res.json({ status: 200, message: "OpenAI agent connected successfully" });
  } catch (err) {
    console.error("OpenAI agent connection error:", err);
    res.status(500).json({ error: "Agent connection failed" });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is running on port 4000");
});
