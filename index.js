import bodyParser from "body-parser";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";



const app = express();
const port = 3000;
let mahasiswa = [];

// set static 
app.use(express.static("public"));
// data post
app.use(bodyParser.urlencoded({ extended: true }));
// set template engine
app.use(expressEjsLayouts);
app.set('layout', './layouts/full-width');
app.set("view engine", "ejs");

// app.post("/publish", (req, res) => {
//   const { title, content, nama } = req.body;
//   const id = posts.length;
//   posts.push({ id, title, content, nama });
//   res.redirect("/");
// });

app.post("/add", (req, res) => {
  const { nama, nim, email, jurusan } = req.body;
  const id = mahasiswa.length;
  mahasiswa.push({ id, nama, nim, email, jurusan });
  res.redirect("/");
  console.log(mahasiswa);
  })
// rendering viwe
app.get('/', (req, res) => {
  res.render('index', {
    title: "LMS Forsk College",
    mahasiswa,
  }); // pastikan file index.ejs memiliki konten
});
app.get('/add', (req,res) => {
  res.render('add', {
    title: "LMS Forsk College",
    layout: "./layouts/add"
  })
})
app.get("/update", (req,res) => {
  res.render("update", {
    title: "LMS Forsk College",
    layout: "./layouts/edit",
  })
})

app.listen(port, (req, res) => {
  console.log(`Listening Port ${port}`);
});
