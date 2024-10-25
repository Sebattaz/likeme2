const express = require("express");
const { getData, postData, addLike } = require("./consultas/consultas");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log("Servidor Levantado"));

app.get("/posts", async (req, res) => {
  const data = await getData();
  res.json(data);
});

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  await postData(titulo, img, descripcion, likes);
  res.status(201).json("Dato ingresado");
});

app.put("/posts/like/:id", async (req, res) => {
    const {id} = req.params;
    await addLike(id);
    res.send("Like agregado");
});
