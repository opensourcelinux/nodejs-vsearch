require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
// file upload
const exphbs = require("express-handlebars");
const fileupload = require('express-fileupload');
// const session=require("e")


// to get the hashing algorithm working for login and registration
// const bcrypt = require("bcrypt");

app.use(fileupload());
app.use(express.static("uploaded_images"))

// require("./src/db/conn");
const http = require("http");
const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "SeCuReDB@123",
    database: "formdataimage"
})

const { json, query, response } = require("express");
const { error } = require("console");

// express json encoding for database
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// hbs
const template_path = path.join(__dirname, "templates/views")
app.set("views", template_path)
app.set("view engine", "hbs");

// parials path
const parital_path = path.join(__dirname, "templates/partials");
hbs.registerPartials(parital_path)

// static path
const static_path = path.join(__dirname, "public")
app.use(express.static(static_path))


// to register the data
app.post("/register", (req, res) => {
    let sampleFile;
    let uploadPath;
    const name = req.body.name;
    const comapanyname = req.body.companyname;
    const service = req.body.service;
    const city = req.body.city;
    const pricerange = req.body.pricerange;
    const companyurl = req.body.companyurl;
    const imagefile = req.files.sampleFile.name;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded");
    }

    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + "/uploaded_images/" + sampleFile.name;

    sampleFile.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
    })

    db.query("INSERT INTO `form1`(`name`, `companyname`, `services`, `city`, `pricerange`, `companyurl`, `imageurl`) VALUES (?,?,?,?,?,?,?)", [name, comapanyname, service, city, pricerange, companyurl, imagefile], (err, result) => {
        if (err) {
            res.send(err);
        }
        res.render("register.hbs");
    })
})

// to get the data
app.get("/show-data", (req, res) => {
    var query = "SELECT * FROM `form1` ORDER BY id DESC";
    db.query(query, (err, rows) => {
        if (!err) {
            res.render("show.hbs", { rows })
        }
    })
})

// to get the latest data
app.get("/", (req, res) => {
    var latestquery = "SELECT * FROM `form1` ORDER BY id DESC LIMIT 3";
    db.query(latestquery, (err, latest) => {
        if (!err) {
            res.render("index.hbs", { latest })
        } else {
            res.render("index.hbs");
        }
    })

})


app.get("/filter", (req, res) => {
    var filter_service = req.query.filterservice;
    var filter_city = req.query.filtercity;
    var filter_price = req.query.filterprice;
    if (filter_price == 1) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 0 AND 25000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
            } else {
                // res.render("filter.hbs");
                res.send(err)
            }
        })

    } else if (filter_price == 2) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 25000 AND 50000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
            } else {
                // res.render("filter.hbs");
                res.send(err)
            }
        })

    } else if (filter_price == 3) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 50000 AND 75000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                console.log("service is running");
                res.render("filter.hbs", { latest })
            } else {
                // res.render("filter.hbs");
                res.send(err)
            }
        })

    } else if (filter_price == 4) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 75000 AND 100000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
            } else {
                // res.render("filter.hbs");
                res.send(err)
            }
        })

    } else if (filter_price == 5) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 100000 AND 150000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
            } else {
                // res.render("filter.hbs");
                res.send(err)
            }
        })

    } else if (filter_price == 6) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 150000 AND 200000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
            } else {
                // res.render("filter.hbs");
                res.send(err)
            }
        })

    } else if (filter_price == 7) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 200000 AND 250000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
            } else {
                // res.render("filter.hbs");
                res.send(err)
            }
        })
    } else if (filter_price == 8) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 250000 AND 500000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
            } else {
                res.send(err)
            }
        })

    } else if (filter_price == 9) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 500000 AND 1000000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
            } else {
                // res.render("filter.hbs");
                res.send(err)
            }
        })

    } else if (filter_price == 10) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange BETWEEN 1000000 AND 2000000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
            } else {
                // res.render("filter.hbs");
                res.send(err)
            }
        })

    } else if (filter_price == 11) {
        var latestquery = "SELECT * FROM `form1` WHERE services = ? AND city = ? AND pricerange > 2000000";
        db.query(latestquery, [filter_service, filter_city], (err, latest) => {
            if (!err) {
                res.render("filter.hbs", { latest })
                console.log("service is running");
            } else {
                res.send(err)
            }
        })

    } else {
        res.send("not working");
    }
}
)


//admin page -------------------


app.get("/admin", (req, res) => {
    var latestquery = "SELECT * FROM `form1` ORDER BY id";
    db.query(latestquery, (err, latest) => {
        if (!err) {
            res.render("admin1.hbs", { latest })
        } else {
            res.render("admin1.hbs");
            console.log("no admin registered");
        }
    })
})

app.get("/login", (req, res) => {
    res.render("login.hbs");
})

app.post("/login", (req, res) => {
    const username = req.body.loginusername;
    const password = req.body.loginpassword;
    var loginquery = "SELECT * FROM `user_login` WHERE user_email=? and user_password=?"
    db.query(loginquery, [username, password], (err, result) => {
        if (result.length > 0) {
            var latestquery = "SELECT * FROM `form1` ORDER BY id";
            db.query(latestquery, (err, latest) => {
                if (!err) {
                    res.render("admin1.hbs", { latest })
                } else {
                    res.render("admin1.hbs");
                    console.log("no admin registered");
                }
            })
        } else {
            res.send("incorrect username and password");
        }
    })
})


app.post("/adminlogin", (req, res) => {
    const adminuser = req.body.loginusername;
    const adminpassword = req.body.loginpassword;
    if (adminuser && adminpassword) {
        query = `SELECT * FROM user_login WHERE user_email = "${adminuser}"`;
        db.query(query, (err, data) => {
            if (data.length > 0) {
                for (let count = 0; count < data.length; count++) {
                    if (data[count].user_password == adminpassword) {
                        req.session.user_id = data[count].user_id;
                        res.render("admin.hbs")
                    }
                    else {
                        res.send("Incorrect Password")
                    }

                }
            } else {
                res.send("Incorrect email address")
            }
            response.end();
        })
    } else {
        res.send("please enter email address and password details");
        res.end();
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy();
})




app.get("/delete/:id", (req, res) => {
    var id = req.params.id;
    var sql = `delete from form1 where id=${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect("/admin");
    })
})



app.get("/edit/:id", (req, res) => {
    res.render("edit.hbs")

})


app.get("/femalemc", (req, res) => {
    var query = `select * from form1 where services ="Female Mc"`;
    db.query(query, (err, female) => {
        if (err) {
            res.render("shortcut.hbs", { title: "No Data" })
        } else {
            res.render("shortcut.hbs", { female, title: "Female MC" })
        }
    })
})

app.get("/band", (req, res) => {
    var query = `select * from form1 where services ="Band"`;
    db.query(query, (err, female) => {
        if (err) {
            res.render("shortcut.hbs", { title: "No Data" })
        } else {
            res.render("shortcut.hbs", { female, title: "Band" })
        }
    })
})

app.get("/standup-comedian", (req, res) => {
    var query = `select * from form1 where services ="Standup Comedian"`;
    db.query(query, (err, female) => {
        if (err) {
            res.render("shortcut.hbs", { title: "No Data" })
        } else {
            res.render("shortcut.hbs", { female, title: "Standup Comedian" })
        }
    })
})

app.get("/photographer", (req, res) => {
    var query = `select * from form1 where services ="Photographer"`;
    db.query(query, (err, female) => {
        if (err) {
            res.render("shortcut.hbs", { title: "No Data" })
        } else {
            res.render("shortcut.hbs", { female, title: "Photographer" })
        }
    })
})

app.get("/singer", (req, res) => {
    var query = `select * from form1 where services ="Singer"`;
    db.query(query, (err, female) => {
        if (err) {
            res.render("shortcut.hbs", { title: "No Data" })
        } else {
            res.render("shortcut.hbs", { female, title: "Singer" })
        }
    })
})

app.get("/printer", (req, res) => {
    var query = `select * from form1 where services ="Printer"`;
    db.query(query, (err, female) => {
        if (err) {
            res.render("shortcut.hbs", { title: "No Data" })
        } else {
            res.render("shortcut.hbs", { female, title: "Printer" })
        }
    })
})

app.get("*", (req, res) => {
    res.send("<h1>no page found</h1>")
})
var https = http.createServer(app);

https.listen(8000, () => {
    console.log(`server running at port 8000`);
});

