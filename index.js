const express = require("express");
const db = require("./config");
const port = process.env.PORT || 9009;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const resultsPerPage = 5;
// get data
app.get("/employee", (req, res) => {
  db.query("select * from allemployees", (err, result) => {
    if (err) throw err;
    const numOfResults = result.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;

    if (page > numberOfPages) {
      res.redirect("/employee?page=" + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
      res.redirect("/employee/?page=" + encodeURIComponent(1));
    }
    const startingLimit = (page - 1) * resultsPerPage;
    db.query(
      `SELECT * FROM allemployees LIMIT ${startingLimit}, ${resultsPerPage}`,
      (err, result) => {
        if (err) throw err;
        let iterator = page - 5 < 1 ? 1 : page - 5;
        let endingLink =
          iterator + 9 <= numberOfPages
            ? iterator + 9
            : page + (numberOfPages - page);
        if (endingLink < page + 4) {
          iterator -= page + 4 - numberOfPages;
        }
        // send data
        res.send({
          page,
          iterator,
          endingLink,
          numberOfPages,
          numOfResults,
          result,
        });
      }
    );
   
  });
});

// post data
app.post("/employee", (req, res) => {
  const body = req.body;
  db.query("INSERT INTO allemployees SET ?", body, (err, result) => {
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
  db.query(
    "DELETE FROM allemployees WHERE id =" + req.params.id,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/", (req, res) => {
  res.send("Running!");
});

app.listen(port, () => {
  console.log(`ASH Service!`, port);
});
