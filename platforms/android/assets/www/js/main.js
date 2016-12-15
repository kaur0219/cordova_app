"use-strict";
var lkey = "kaur0219";
var application, team = []
    , stand = [];

function init() {
    if (localStorage.getItem(lkey)) {
        var data = localStorage.getItem(lkey);
        data = JSON.parse(data);
        application = data;
        GamesName()
        Score(application);
        standings(application);
    }
    else {
        fetch('https://griffis.edumedia.ca/mad9014/sports/cricket.php').then(function (response) {
            return response.json();
        }).then(function (response) {
            application = response;
            GamesName()
            Score(application);
            standings(application);
            var data = JSON.stringify(application);
            localStorage.setItem(lkey, data);
        }).catch(function (err) {
            alert(err.message);
            console.log(err.message);
        });
    }
}

function force_init() {
    fetch('https://griffis.edumedia.ca/mad9014/sports/cricket.php').then(function (response) {
        return response.json();
    }).then(function (response) {
        application = response;
        GamesName()
        Score(application);
        standings(application);
        localStorage.removeItem(lkey);
        var data = JSON.stringify(application);
        localStorage.setItem(lkey, data);
    }).catch(function (err) {
        alert(err.message);
        console.log(err.message);
    });
}

function Score(d) {
    var scores = document.getElementById('sc');
    d.scores.forEach(function (s) {
        let table = document.createElement("table");
        let tr1 = document.createElement("tr");
        let tr2 = document.createElement("tr");
        let tr3 = document.createElement("tr");
        let td1 = document.createElement("th");
        td1.innerHTML = "Home";
        let td2 = document.createElement("th");
        td2.innerHTML = "Home Score";
        let td3 = document.createElement("th");
        td3.innerHTML = "Away Score";
        let td4 = document.createElement("th");
        td4.innerHTML = "Away";
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        let td21 = document.createElement("td");
        td21.innerHTML = icon(team[s.games[0].home]) + "<br>" + team[s.games[0].home];
        tr2.appendChild(td21);
        let td22 = document.createElement("td");
        td22.innerHTML = s.games[0].home_score;
        tr2.appendChild(td22);
        let td23 = document.createElement("td");
        td23.innerHTML = s.games[0].away_score;
        tr2.appendChild(td23);
        let td24 = document.createElement("td");
        td24.innerHTML = icon(team[s.games[0].away]) + "<br>" + team[s.games[0].away];
        tr2.appendChild(td24);
        let td31 = document.createElement("td");
        td31.innerHTML = icon(team[s.games[1].home]) + "<br>" + team[s.games[1].home];
        tr3.appendChild(td31);
        let td32 = document.createElement("td");
        td32.innerHTML = s.games[1].home_score;
        tr3.appendChild(td32);
        let td33 = document.createElement("td");
        td33.innerHTML = s.games[1].away_score;
        tr3.appendChild(td33);
        let td34 = document.createElement("td");
        td34.innerHTML = icon(team[s.games[1].away]) + "<br>" + team[s.games[1].away];
        tr3.appendChild(td34);
        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        scores.appendChild(table);
    });
}

function GamesName() {
    application.teams.forEach(function (d) {
        team[d.id] = d.name;
        stand[d.id] = {
            "w": 0
            , "l": 0
            , "t": 0
            , "p": 0
        }
    })
}

function standings(d) {
    var standings = document.getElementById('st');
    standings.innerHTML = "standings";
    var Table = "<table><tr><th>Team</th><th>W</th><th>L</th><th>T</th><th>P</th></tr>";
    d.scores.forEach(function (s) {
        s.games.forEach(function (t) {
            let sh = t.home_score.split("-");
            sh = parseInt(sh[0]);
            let sa = t.away_score.split("-");
            sa = parseInt(sa[0]);
            if (sh >> sa) {
                stand[t.home].w += 1;
                stand[t.home].p += 2;
                stand[t.away].l += 1;
            }
            else if (sh << sa) {
                stand[t.away].w += 1;
                stand[t.away].p += 2;
                stand[t.home].l += 1;
            }
            else {
                stand[t.home].t += 1;
                stand[t.away].t += 1;
                stand[t.home].p += 1;
                stand[t.away].p += 1;
            }
        })
    });
    team.forEach(function (d, id) {
        Table += "<tr><td> " + icon(team[id]) + "<br> " + team[id] + "</td><td>" + stand[id].w + "</td><td>" + stand[id].l + "</td><td>" + stand[id].t + "</td><td>" + stand[id].p + "</td></tr>";
    })
    Table += "</table>";
    standings.innerHTML = Table;
}

function icon(name) {
    var i = "";
    switch (name) {
    case "Gujarat Lions":
        i = "GL"
        break;
    case "Kings XI Punjab":
        i = "KP";
        break;
    case "Sunrisers Hyderabad":
        i = "SH";
        break;
    case "Royal Challengers Bangalore":
        i = "RCB";
        break;
    case "Rising Pune Supergiants":
        i = "RPS";
        break;
    case "Mumbai Indians":
        i = "MI";
        break;
    case "Kolkata Knight Riders":
        i = "KKR";
        break;
    case "Delhi Daredevils":
        i = "DD";
        break;
    }
    var ic = "<img class='icon' src='img"+'/' + i + ".png' alt='team logo' >";
    return ic;
}
document.getElementById("Standings_btn").addEventListener("click", function () {
    document.getElementById("st-page").classList.add("active");
    document.getElementById("sc-page").classList.remove("active");
});
document.getElementById("Score_btn").addEventListener("click", function () {
    document.getElementById("st-page").classList.remove("active");
    document.getElementById("sc-page").classList.add("active");
});
document.getElementById("refresh").addEventListener("click", function () {
    application = {};
    team = [];
    stand = []
    let sc = document.getElementById('sc');
    let st = document.getElementById('st');
    sc.innerHTML = "";
    st.innerHTML = "";
    force_init();
});

init();