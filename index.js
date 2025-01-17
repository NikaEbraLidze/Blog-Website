import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];
let postIdCounter = 1;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

//

app.get("/", (req, res) => {
    res.render("home.ejs", { posts: posts, homepa: "active", homepb: "", homepc: "" });
});

app.get("/home", (req, res) => {
    res.render("home.ejs", { posts: posts, homepa: "active", homepb: "", homepc: "" });
});

app.get("/create", (req, res) => {
    res.render("create.ejs", { homepa: "", homepb: "active", homepc: "" });
});

app.get("/whocreate", (req, res) => {
    res.render("whocreate.ejs", { homepa: "", homepb: "", homepc: "active" });
});

app.get("/createnow", (req, res) => {
    res.render("postcreate.ejs", { homepa: "", homepb: "active", homepc: "" });
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.post("/submit", (req, res) => {
    const title = req.body.title;
    const story = req.body.story;

    posts.push({ title: title, story: story, id: postIdCounter++ });

    res.redirect("/");
});

app.get("/discard", (req, res) => {
    posts.pop;
    posts.pop;
    res.render("home.ejs", { posts: posts, homepa: "active", homepb: "", homepc: "" });
});

app.post("/delete", (req, res) => {
    const postId = req.body.postId;
    posts = posts.filter(post => post.id !== parseInt(postId));
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id); // ID
    const post = posts.find(post => post.id === postId); 

    if (post) {
        res.render("postedit.ejs", {
            title: post.title,
            story: post.story,
            id: post.id,
            homepa: "", homepb: "active", homepc: ""
        });
    } else {
        res.redirect("/"); 
    }
});

app.post("/update", (req, res) => {
    const { title, story, id } = req.body;

    if (id) {
        const postId = parseInt(id);
        const postIndex = posts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
            posts[postIndex].title = title;
            posts[postIndex].story = story;
        }
    } else {
        posts.push({ title: title, story: story, id: postIdCounter++ });
    }

    res.redirect("/");
});

app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
