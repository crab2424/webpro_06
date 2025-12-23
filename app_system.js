"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//landing
app.get("/", (req, res) => {
    res.render("landing");
});

//prefecture

//データ
let prefectures = [
    { id: 0, name: "都道府県" ,code: 0, area: 0, population: 0, capital: "", region: "" },
    { id: 1, name: "東京都" ,code: 13, area: 2199.94, population: 14273066, capital: "新宿区", region: "関東" },
    { id: 2, name: "大阪府" ,code: 27, area: 1905.25, population: 8777998, capital: "大阪市", region: "近畿" },
    { id: 3, name: "福岡県" ,code: 40, area: 4987.66, population: 5088841, capital: "福岡市", region: "九州" },
];

//一覧
app.get("/pref", (req, res) => {
    res.render('pref/pref', { data: prefectures });
});

//詳細
app.get("/pref/:id", (req, res) => {
    const number = req.params.id;
    const detail = prefectures[number];
    res.render('pref/pref_detail', {id: number, data: detail });
});

//新規フォーム
app.get("/pref/create", (req, res) => {
    res.render('public/pref_new.html');
});

//編集フォーム
app.get("/pref/edit/:id", (req, res) => {
    const number = req.params.id;
    const detail = prefectures[number];
    res.render('pref/pref_edit', {id: number, data: detail });
});

//削除確認フォーム
app.get("/pref/check/:id", (req, res) => {
    const number = req.params.id;
    const detail = prefectures[number];
    res.render('pref/pref_check', {id: number, data: detail });
});

//作成処理
app.post("/pref", (req, res) => {
    const id = prefectures.length + 1;
    const name = req.body.name;
    const code = req.body.code;
    const area = req.body.area;
    const population = req.body.population;
    const capital = req.body.capital;
    const region = req.body.region;
    prefectures.push({ id: id, name: name, code: code, area: area, population: population, capital: capital, region: region });
    console.log("新規追加後の都道府県：", prefectures);
    res.render('pref/pref', { data: prefectures });
});

//更新処理
app.post("/pref/update/:id", (req, res) => {
    prefectures[req.params.id].name = req.body.name;
    prefectures[req.params.id].code = req.body.code;
    prefectures[req.params.id].area = req.body.area;
    prefectures[req.params.id].population = req.body.population;
    prefectures[req.params.id].capital = req.body.capital;
    prefectures[req.params.id].region = req.body.region;
    console.log("更新後の都道府県：", prefectures[req.params.id]);
    res.render('pref/pref_detail', {id: req.params.id, data: prefectures[req.params.id]} );
});

//削除処理
app.get("/pref/delete/:id", (req, res) => {
    const name = prefectures[req.params.id].name;
    prefectures.splice(req.params.id, 1);
    console.log(name + "を削除しました");
    res.redirect('/pref');
});







//constellation











//element

app.listen(8080, () => console.log("Example app listening on port 8080!"));
