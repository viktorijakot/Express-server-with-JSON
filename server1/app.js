const express = require("express");
const fs = require("node:fs");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const randomColor = (_) =>
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1 style=color:" + randomColor() + ";>Hello You!</h1>");
});

app.get("/bebras", (req, res) => {
  res.send("<h1 style=color:" + randomColor() + ";>Bebras</h1>");
});

app.get("/udra", (req, res) => {
  const data = fs.readFileSync("./suo.txt", "utf8");
  res.send("<h1 style=color:" + randomColor() + ";>" + data + "</h1>");
});

app.get("/laiskas", (req, res) => {
  const html = fs.readFileSync("./html/write.html", "utf8");
  res.send(html);
});

// app.post("/laiskas", (req, res) => {
//   console.log(req.body);
//   const laiskas = req.body.zinute
//   fs.writeFileSync("./laiskas.txt", laiskas)

//   const allData = JSON.parse(fs.readFileSync("./laiskas.json", "utf8"));
//   allData.push(req.body)
//   fs.writeFileSync ("./laiskas.json", JSON.stringify(allData))
//   res.send("<h1>OK</h1>");
// });
app.post('/laiskas', (req, res) => {
    console.log(req.body);
    const laiskas = req.body.zinute;
    fs.writeFileSync('./laiskas.txt', laiskas);
  
    const allData = JSON.parse(fs.readFileSync('./laiskas.json', 'utf8'));
    allData.push(req.body);
    fs.writeFileSync('./laiskas.json', JSON.stringify(allData));
  
    res.send('<h1>OK</h1>');
  });

// app.get("/skaityti", (req, res) => {
//     const html = fs.readFileSync("./html/read.html", "utf8");
//     const data = fs.readFileSync("./laiskas.txt", "utf8");
//     const allData = JSON.parse(fs.readFileSync('./laiskas.json', "utf8"))
//     const list =  allData.map(item => '<div>' + item.zinute + '</div>'.join(''))
//     res.send(html.replace('[[[laiskas]]]', list));
//     // res.send(html.replace('[[[laiskas]]]', data));
//   });

app.get('/skaityti', (req, res) => {
    const html = fs.readFileSync('./html/read.html', 'utf8');
    const data = fs.readFileSync('./laiskas.txt', 'utf8');
  
    const allData = JSON.parse(fs.readFileSync('./laiskas.json', 'utf8'));
  
    const list = allData.map(item => '<div>' + item.zinute + '</div>').join('');
  
    res.send(html.replace('[[[laiskas]]]', list));
  
    // res.send(html.replace('[[[laiskas]]]', data));
  });

  app.get('/json', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./laiskas.json', 'utf8'));
  
    res.json(data);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
