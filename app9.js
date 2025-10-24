"use strict";
const express = require("express");
const app = express();

let bbs = []; // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
    const message1 = "Hello world";
    const message2 = "Bon jour";
    res.render("show", { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
    res.render("show", { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
    res.render("icon", {
        filename: "./public/Apple_logo_black.svg",
        alt: "Apple Logo",
    });
});

app.get("/omikuji1", (req, res) => {
    const num = Math.floor(Math.random() * 6 + 1);
    let luck = "";
    if (num == 1) luck = "大吉";
    else if (num == 2) luck = "中吉";

    res.send("今日の運勢は" + luck + "です");
});

app.get("/omikuji2", (req, res) => {
    const num = Math.floor(Math.random() * 6 + 1);
    let luck = "";
    if (num == 1) luck = "大吉";
    else if (num == 2) luck = "中吉";

    res.render("omikuji2", { result: luck });
});

app.get("/janken2", (req, res) => {
    let hand = req.query.hand;
    let win = Number(req.query.win) || 0;
    let total = Number(req.query.total) || 0;
    console.log({ hand, win, total });
    const num = Math.floor(Math.random() * 3 + 1);
    let cpu = "";
    let judgement = "";
    if (num == 1) cpu = "グー";
    else if (num == 2) cpu = "チョキ";
    else cpu = "パー";
    // ここに勝敗の判定を入れる
    // 以下の数行は人間の勝ちの場合の処理なので，
    // 判定に沿ってあいこと負けの処理を追加する

    if (hand == undefined) {
        hand = "未選択";
    } else {
        if (
            (hand == "グー" && cpu == "チョキ") ||
            (hand == "チョキ" && cpu == "パー") ||
            (hand == "パー" && cpu == "グー")
        ) {
            judgement = "勝ち";
            win += 1;
        } else if (hand == cpu) {
            judgement = "あいこ";
        } else {
            judgement = "負け";
        }
        total += 1;
    }

    const display = {
        your: hand,
        cpu: cpu,
        judgement: judgement,
        win: win,
        total: total,
    };
    res.render("janken2", display);
});

app.get("/get_test", (req, res) => {
    res.json({
        answer: 0,
    });
});

app.get("/add", (req, res) => {
    console.log("GET");
    console.log(req.query);
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);
    console.log(num1);
    console.log(num2);
    res.json({ answer: num1 + num2 });
});

app.post("/add", (req, res) => {
    console.log("POST");
    console.log(req.body);
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    console.log(num1);
    console.log(num2);
    res.json({ answer: num1 + num2 });
});

// これより下はBBS関係
app.post("/check", (req, res) => {
    // 本来はここでDBMSに問い合わせる
    res.json({ number: bbs.length });
});

app.post("/read", (req, res) => {
    // 本来はここでDBMSに問い合わせる
    const start = Number(req.body.start);
    console.log("read -> " + start);
    if (start == 0) res.json({ messages: bbs });
    else res.json({ messages: bbs.slice(start) });
});

app.post("/post", (req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    console.log([name, message]);
    // 本来はここでDBMSに保存する
    bbs.push({ name: name, message: message });
    res.json({ number: bbs.length });
});

app.get("/bbs", (req, res) => {
    console.log("GET /BBS");
    res.json({ test: "GET /BBS" });
});

app.post("/bbs", (req, res) => {
    console.log("POST /BBS");
    res.json({ test: "POST /BBS" });
});

app.get("/bbs/:id", (req, res) => {
    console.log("GET /BBS/" + req.params.id);
    res.json({ test: "GET /BBS/" + req.params.id });
});

app.put("/bbs/:id", (req, res) => {
    console.log("PUT /BBS/" + req.params.id);
    res.json({ test: "PUT /BBS/" + req.params.id });
});

app.delete("/bbs/:id", (req, res) => {
    console.log("DELETE /BBS/" + req.params.id);
    res.json({ test: "DELETE /BBS/" + req.params.id });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
