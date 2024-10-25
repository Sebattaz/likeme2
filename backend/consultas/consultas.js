require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  allowExitOnIdle: true,
});

const getData = async () => {
    const data = await pool.query("SELECT * FROM posts ORDER BY id;");
    return data.rows;
};

const postData = async (titulo, img, descripcion, likes)=>{
    const add =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(add, values);
};

const addLike = async(id)=>{
    const consulta = "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *"
    const values = [id];
    const result = await pool.query(consulta, values);
    return result.rows;
}

const deleteData = async (id)=>{
    const consulta ="DELETE FROM posts WHERE id = $1"
    const values = [id];
    const result = await pool.query(consulta,values);
    return result.rows;

}


module.exports = {getData, postData, addLike, deleteData};