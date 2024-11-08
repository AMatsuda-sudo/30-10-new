const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    const user = {
        name: "Guilherme",
        surname: "Rocha",
        age: 27
    }


    res.render("home", { user: user, auth: true, approved: true });
});

app.get("/dashboard", function (req, res){
    const items = [
        "item a", "item b", "item c"
    ]
    res.render("dashboard", {items: items});
})



app.listen(3000)