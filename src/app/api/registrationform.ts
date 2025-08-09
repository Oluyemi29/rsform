// "use server";
// import { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const parseForm = (
//   req: NextApiRequest
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   const form = new formidable.IncomingForm({ keepExtensions: true });
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       else resolve({ fields, files });
//     });
//   });
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // your code

//   try {
//     const data = req.body;

//     return res.status(200).json({
//       success: true,
//       message: "User registered successfully",
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// }
