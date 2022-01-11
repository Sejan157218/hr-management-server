const express = require("express");
const db = require("./config");
const port = process.env.PORT || 9000
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


// get data 
app.get("/employee", (req, res) => {
  db.query("select * from allemployees", (err, result) => {
    if (err) {
        res.send(err);
    } else {
      res.send(result);
    }
  });
});



// post data
app.post("/employee", (req, res) => {
    const body=req.body;
  db.query("INSERT INTO allemployees SET ?",body, (err, result) => {
    if (err) {
        res.send(err);
    } else {
      res.send(result);
    }
  });
});

// post data
app.delete("/employee/:id", (req, res) => {
    console.log(req.params.id);
    db.query("DELETE FROM allemployees WHERE id ="+ req.params.id, (err, result) => {
      if (err) {
          res.send(err);
      } else {
        res.send(result);
      }
    });
  });


app.get('/', (req, res) => {
    res.send('Running!')
})

app.listen(9000, () => {
  console.log(`Add Employee!`, 9000);
});
