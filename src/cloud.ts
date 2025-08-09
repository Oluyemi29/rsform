import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
  api_key: process.env.CLOUD_APIKEY as string,
  api_secret: process.env.CLOUD_SECRETKEY as string,
  cloud_name: process.env.CLOUD_NAME as string,
});

export default cloudinary;
