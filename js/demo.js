// setup all variables in the beginning of the doc
var count = 0;
// multiple line variable use backticks
var playgroun1 = `
    You clicked once, you won't see this again. ^>^
`;
// data variable is in demo.json 
// var mydata = JSON.parse(data);
var year = new Date();

// this checks for url variables like ?steem=sn0n
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
// set steem default user if not set
if (getQueryVariable("steem") !== false) {
    user = getQueryVariable("steem");
        document.getElementById("sitelabel").innerHTML = user + "'s steem profile ";
    console.log(user + " connected");   
} else {
    // this works. toggle for dev
    user = "sn0n";
    console.log(user);

}
// steem bit



window.onload = function loading() {



        // EXECUTE FOR STEEM
        const now = new Date().toISOString().split('.')[0];
        


        steem.api.getDiscussionsByAuthorBeforeDate(user, 'profile', now, 1, (err, result) => {

            // do steem things
            if (result) {
                var blokify = JSON.parse((result[0].body));
                document.getElementById("name").innerHTML = blokify[0].name;
                document.getElementById("usertitle").innerHTML = blokify[0].title;
                document.getElementById("steemagent").innerHTML = "<a href='http://steemit.com/@"+ user +"' target='_blank'>@" + user + "</a>";
                var profage = year.getFullYear() - blokify[0].birthyear;
                document.getElementById("age").innerHTML = profage; 
                document.getElementById("sign").innerHTML = blokify[0].sign;
                document.getElementById("location").innerHTML = blokify[0].location;
                document.getElementById("gender").innerHTML = blokify[0].gender;

                if (blokify[0].skills !== undefined) {
                    var skills = blokify[0].skills;
                    skillsLog = skills.split(',');
                    skillsLog.forEach(function (entry) {
                        console.log(entry);
                        entryy = entry.replace(/\s+/g, '');
                        entryy = entryy.replace(/[^a-zA-Z0-9]/g, '');
                        entryy = entryy.toLowerCase();
                        var a = document.createElement('a');
                        var linkText = document.createTextNode(entry);
                        a.appendChild(linkText);
                        a.title = entry;
                        a.target = "_blank";
                        a.href = "https://steemit.com/trending/" + entryy;
                        document.getElementById("skills").appendChild(a);
                    });
                } else {
                    console.log("no skills")
                }
                //var a = document.createElement('a');
                //var linkText = document.createTextNode(entry);
                //a.appendChild(linkText);
                //a.title = entry;
                //a.href = "http://steemit.com/trending/"+entry;
                //document.getElementById("skills").appendChild(a);



                //document.getElementById("skills").innerHTML = blokify[0].skills;
                document.getElementById("biofull").innerHTML = blokify[0].biofull;




                // start friends section
                if (blokify[1] !== undefined) {
                    document.getElementById("Friend1").innerHTML = "<a href='http://steemit.com/" + blokify[1].Friend1 + "' target='_blank'>" + blokify[1].Friend1 + "</a>";
                    document.getElementById("Friend2").innerHTML = "<a href='http://steemit.com/" + blokify[1].Friend2 + "' target='_blank'>" + blokify[1].Friend2 + "</a>";
                    document.getElementById("Friend3").innerHTML = "<a href='http://steemit.com/" + blokify[1].Friend3 + "' target='_blank'>" + blokify[1].Friend3 + "</a>";
                    document.getElementById("Friend4").innerHTML = "<a href='http://steemit.com/" + blokify[1].Friend4 + "' target='_blank'>" + blokify[1].Friend4 + "</a>";
                    document.getElementById("Friend5").innerHTML = "<a href='http://steemit.com/" + blokify[1].Friend5 + "' target='_blank'>" + blokify[1].Friend5 + "</a>";
                    document.getElementById("Friend6").innerHTML = "<a href='http://steemit.com/" + blokify[1].Friend6 + "' target='_blank'>" + blokify[1].Friend6 + "</a>";
                    document.getElementById("Friend7").innerHTML = "<a href='http://steemit.com/" + blokify[1].Friend7 + "' target='_blank'>" + blokify[1].Friend7 + "</a>";
                    document.getElementById("Friend8").innerHTML = "<a href='http://steemit.com/" + blokify[1].Friend8 + "' target='_blank'>" + blokify[1].Friend8 + "</a>";
                } else {
                    console.log("no friends") 
                }



                // steem js bits
            } else {
                reject(err);
            }


        });
    
    // end steem bits

    var i;
    for (i = 0; i < 8; i++) {
        console.log('i = ' + (i + 1));
    }

    // if (getQueryVariable("id") !== false) {
    //    document.getElementById("external").innerHTML = getQueryVariable("id");
        // todo: ID tags
  //  } else {
  //      document.getElementById("external").innerHTML = "none";
  //  }
   
    //loading end
};


// PLAYGROUND button            
function demo() {

    document.getElementById("playground").innerHTML = playgroun1;

    if (count > 0) {
        console.log(count);



        var db = new Nedb({
            filename: 'library.db',
            autoload: true
        });
        db.insert({ count: count }, function (err) {

        });
        db.find({ count: 1 }, function (err, docs) {
            document.getElementById("playground").innerHTML = "Visit " + docs.length + " and count: " + count;
        });

        count++;
    } else {
        console.log(count);

        count++;
    }
}




// stats logging
var db = new Nedb({ filename: 'db.json', autoload: true });

db.findOne({ _id: 1 }, function (err, doc) {
    doc = doc || { _id: 1, counter: 0 };

    console.log('This example was executed ' + doc.counter + ' times. Last access time was ' + doc.lastSeenAt);

    doc.lastSeenAt = new Date();
    doc.counter++;

    db.update({ _id: 1 }, doc, { upsert: true }, function (err, num) {
        console.log('Updated ' + num + ' records');
    });
});
















