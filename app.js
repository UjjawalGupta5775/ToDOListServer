const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Pick Bottle", "Fill Water", "Drink Water"];
let workList = [];

app.get("/", function(req, res){
  let day = date.getDate();
  res.render("list", {listTitle:day, newItem:items});
})

app.post("/", function(req, res){
  console.log(req.body.list);
  let item = req.body.newItem;
  if (req.body.list === "Work"){
    workList.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req, res){
  res.render("list", {listTitle:"Work List", newItem:workList});
})

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workList.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(process.env.PORT || 3001, function(){
  console.log("Server is up and running on port 3001");
})
