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
// app.get("/edit/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const post = posts.find((p) => p.id === id);
//   if (post) {
//     res.render("edit", { post });
//   } else {
//     res.redirect("/");
//   }
// });
app.get('/update/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const mhs = mahasiswa.findIndex((m) => m.id === id);
  if (mhs) {
    res.render("update", {
      title: "LMS Forsk College",
      layout: "./layouts/edit",
      mhs
    })
  } else { 
    res.redirect("/")
  }
})

// app.post("/edit/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10); 
//   const { content } = req.body; // field yang aman mau diedit
//   const postIndex = posts.findIndex((p) => p.id === id);

//   if (postIndex !== -1) {
//     // Only update content, keep other fields unchanged
//     posts[postIndex].content = content;
//     res.redirect("/");
//   } else {
//     res.redirect("/");
//   }
// });
app.post('/update/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = { nama: req.body.nama, nim: req.body.nim, jurusan: req.body.jurusan };
  const mhsIndex = mahasiswa.findIndex((m) => m.id === id);
  if (mhsIndex !== -1) {
    mahasiswa[mhsIndex] = { ...mahasiswa[mhsIndex], ...data }; // Menggabungkan data baru dengan data lama
    res.redirect("/");
  } else { 
    res.redirect("/");
  }
});

// delete
app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  mahasiswa = mahasiswa.filter((student) => student.id !== id); // Remove post with matching ID
  res.redirect("/");
});
app.listen(port, (req, res) => {
  console.log(`Listening Port ${port}`);
});
