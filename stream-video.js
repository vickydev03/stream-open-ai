
import { StreamClient } from "@stream-io/node-sdk";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.STREAM_VIDEO_API_KEY,"ajay")

// import { StreamClient } from "@stream-io/node-sdk";

// or
// const { StreamClient } = require("@stream-io/node-sdk");
// import { StreamVideoClient } from "@stream-io/video-client";

const apiKey = process.env.STREAM_VIDEO_API_KEY ;
const secret = process.env.STREAM_VIDEO_API_SECRET;
export const streamVideo = new StreamClient(apiKey, secret);
// export const streamVideoClient = new StreamVideoClient();

