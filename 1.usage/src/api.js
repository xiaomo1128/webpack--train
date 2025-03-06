let express = require("express");
const app = express();
app.get("/users", (req, res) => {
  res.json({
    name: "tom",
    age: 20,
  });
});

app.listen(2000, () => console.log("server is running 2000"));
