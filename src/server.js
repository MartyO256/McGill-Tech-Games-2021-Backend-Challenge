const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/status", (req, res) => {
  res.json({
    status: "up",
  });
});

app.get("/processPathData/:pathParameter", (req, res) => {
  const { pathParameter } = req.params;
  res.json({
    pathParam: pathParameter,
  });
});

app.get("/processQueryData", (req, res) => {
  // Respond with the first key-value pair in the query
  for (const key in req.query) {
    res.json({ key, value: req.query[key] });
    return;
  }
  res.status(500); // No query data
});

app.post("/processPOSTData", (req, res) => {
  const { value1, value2, value3, value4 } = req.body;
  res.json({ values: [value1, value2, value3, value4] });
});

const database = ["string1", "string2"];

app.get("/data", (req, res) => {
  res.json(database);
});

app.post("/data", (req, res) => {
  database.push(req.body.newString);
  res.status(201).send();
});

app.delete("/data/:index", (req, res) => {
  const { index } = req.params;
  if (database.length == 0 || index < 0 || index >= database.length) {
    res.status(500).send();
  } else {
    database.splice(parseInt(index, 10), 1);
    res.status(200).send();
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
