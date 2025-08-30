import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false, // we will handle form data manually
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Form parsing failed" });

      try {
        const formData = new FormData();
        formData.append("username", fields.username);
        formData.append("email", fields.email);
        formData.append("password", fields.password);

        if (files.image) {
          const fileStream = fs.createReadStream(files.image.filepath);
          formData.append("image", fileStream, files.image.originalFilename);
        }

        // Send to Django backend
        const djangoRes = await fetch("https://food99api.onrender.com/api/api/signup/", {
          method: "POST",
          body: formData,
        });

        const data = await djangoRes.json();
        res.status(djangoRes.status).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
