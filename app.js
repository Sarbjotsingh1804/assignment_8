const express = require('express');
const bodyParser = require('body-parser');


var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sarbjotsingh1804:sarbjotsingh1804@cluster0.gban9di.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
const trySchema = new mongoose.Schema({
    name: String,
});
const Item = mongoose.model("task", trySchema);
const todo = new Item({
    name:"Learn MERN Stack"
});

const todo2 = new Item({
    name:"Learn DSA"
});
const todo3 = new Item({
    name:"Learn DAA"
});
const todo4 = new Item({
    name:"Learn React"
});



// todo.save();
// todo2.save();
// todo3.save();
// todo4.save();
app.get("/", function (req, res) {
    Item.find({}).then(function (foundItems) {
        res.render("list", {ejes: foundItems});
    }).catch(function (err) {
        console.log(err);
    });

});

app.post("/", function (req, res) {

    const newItem = req.body.elem1;
    const todo4 = new Item({
        name: newItem
    });
    todo4.save();
    res.redirect("/");
});

app.post("/delete", function (req, res) {

    const checked = req.body.checkbox1;
    Item.findByIdAndDelete(checked).then(function() {
        res.redirect("/");
    }).catch(function(err) {
        console.log(err);
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
}
);
