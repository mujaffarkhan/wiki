// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

var currentRow;
var dbName = 'db12';

// Populate the database
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, name,number)');
    tx.executeSql("CREATE TABLE IF NOT EXISTS `facts` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `invention_id` INTEGER, `fact`);");
    tx.executeSql("CREATE TABLE IF NOT EXISTS `inventions` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name`, `eraId` INTEGER, `year`, `inventorId` INTEGER, `imageName`, `imageOffline`, `imageLink`)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS `inventor` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name`, `wikiLink`, `country`);");
    tx.executeSql("CREATE TABLE IF NOT EXISTS `other` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name`, `imageName`, `imageLink`, `imageOffline`);");
    tx.executeSql("CREATE TABLE IF NOT EXISTS `relevant` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `inventionId` INTEGER, `otherId` INTEGER);");
    tx.executeSql("CREATE TABLE IF NOT EXISTS `wikilinks` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `inventionId` INTEGER, `link`, `linkFor`);");
}

// Query the database
function queryDB(tx) {
    tx.executeSql('select * from inventions as i left join facts as f on i.id = f.invention_id', [], querySuccess, errorCB);
}

function searchQueryDB(tx) {
    tx.executeSql("SELECT * FROM DEMO where name like ('%" + document.getElementById("txtName").value + "%')",
            [], querySuccess, errorCB);
}
// Query the success callback
//
function querySuccess(tx, results) {
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var rs = results.rows.item(i);
        $('.invName').html(rs.name);
        $('.invImage').html('<img src="img/'+rs.imageName+'" style="cursor:pointer;">');
        $('.invFacts').html(rs.fact);
    }
    //document.getElementById("tblDiv").innerHTML = tblText;
}

//Delete query
function deleteRow(tx) {
    tx.executeSql('DELETE FROM DEMO WHERE id = ' + currentRow, [], queryDB, errorCB);
}

// Transaction error callback
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

// Transaction success callback
function successCB() {
    var db = window.openDatabase(dbName, "1.0", "Cordova Demo", 200000);
    db.transaction(queryDB, errorCB);
}

// Cordova is ready            
function onDeviceReady() {
    var db = window.openDatabase(dbName, "1.0", "Cordova Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
}

//Insert query
function insertDB(tx) {
//    tx.executeSql('INSERT INTO `inventions` (`name`, `eraId`, `year`, `inventorId`, `imageName`, `imageOffline`, `imageLink`) VALUES'+
//	'("<a>Stone tools</a> (Oldowan)", "0", "<a>Ethiopia</a>", "0", "https://en.wikipedia.org/wiki/File:National_park_stone_tools.jpg", "", "https://en.wikipedia.org/wiki/File:National_park_stone_tools.jpg"),'+
//	'("<a>Stone tools</a> (Oldowan)", "0", "<a>Ethiopia</a>", "0", "https://en.wikipedia.org/wiki/File:National_park_stone_tools.jpg', '', 'https://en.wikipedia.org/wiki/File:National_park_stone_tools.jpg")');
    tx.executeSql('INSERT INTO `inventions` (`name`, `eraId`, `year`, `inventorId`, `imageName`, `imageOffline`, `imageLink`) VALUES' +
            '("<a href=\'\/wiki/Stone_tools\'\>Stone tools</a> (Oldowan)", "asc", "<a>Ethiopia</a>", 2, "240px-National_park_stone_tools.jpg", "", "https://en.wikipedia.org/wiki/File:National_park_stone_tools.jpg"),\n\
("<a href=\'\/wiki/Stone_tools\'\>Stone tools</a> (Oldowan)", "asc", "<a>Ethiopia</a>", 2, "240px-National_park_stone_tools.jpg", "", "https://en.wikipedia.org/wiki/File:National_park_stone_tools.jpg")');
    
    tx.executeSql('INSERT INTO `facts` (`invention_id`, `fact`) VALUES \n\
	(1, "A stone tool is, in the most general sense, any tool made either partially or entirely out of stone.\n-> Stone has been used to make a wide variety of different tools throughout history, including <a href=\'\/wiki/Arrow_heads\'\ title=\'\Arrow heads\'\ class=\'\mw-redirect\'\>arrow heads</a>, spearpoints and <a href=\'\/wiki/Querns\'\ title=\'\Querns\'\ class=\'\mw-redirect\'\>querns</a>. Stone tools may be made of either <a href=\'\/wiki/Ground_stone\'\ title=\'\Ground stone\'\>ground stone</a> or <a href=\'\/wiki/Chipped_stone\'\ title=\'\Chipped stone\'\ class=\'\mw-redirect\'\>chipped stone</a>, and a person who creates tools out of the latter is known as a <a href=\'\/wiki/Flintknapper\'\ title=\'\Flintknapper\'\ class=\'\mw-redirect\'\>flintknapper</a>.\n-> Grooved, cut and fractured animal bone fossils, made by using stone tools, were found in <a href=\'\/wiki/Dikika\'\ title=\'\Dikika\'\>Dikika</a>, <a href=\'\/wiki/Ethiopia\'\ title=\'\Ethiopia\'\>Ethiopia</a> near (200 yards) the remains of"),\n\
(2, "A stone tool is, in the most general sense, any tool made either partially or entirely out of stone.\n-> Stone has been used to make a wide variety of different tools throughout history, including <a href=\'\/wiki/Arrow_heads\'\ title=\'\Arrow heads\'\ class=\'\mw-redirect\'\>arrow heads</a>, spearpoints and <a href=\'\/wiki/Querns\'\ title=\'\Querns\'\ class=\'\mw-redirect\'\>querns</a>. Stone tools may be made of either <a href=\'\/wiki/Ground_stone\'\ title=\'\Ground stone\'\>ground stone</a> or <a href=\'\/wiki/Chipped_stone\'\ title=\'\Chipped stone\'\ class=\'\mw-redirect\'\>chipped stone</a>, and a person who creates tools out of the latter is known as a <a href=\'\/wiki/Flintknapper\'\ title=\'\Flintknapper\'\ class=\'\mw-redirect\'\>flintknapper</a>.\n-> Grooved, cut and fractured animal bone fossils, made by using stone tools, were found in <a href=\'\/wiki/Dikika\'\ title=\'\Dikika\'\>Dikika</a>, <a href=\'\/wiki/Ethiopia\'\ title=\'\Ethiopia\'\>Ethiopia</a> near (200 yards) the remains of")');
}

function goInsert() {
    var db = window.openDatabase(dbName, "1.0", "Cordova Demo", 200000);
    db.transaction(insertDB, errorCB, successCB);
}

function goSearch() {
    var db = window.openDatabase(dbName, "1.0", "Cordova Demo", 200000);
    db.transaction(searchQueryDB, errorCB);
}

function goDelete() {
    var db = window.openDatabase(dbName, "1.0", "Cordova Demo", 200000);
    db.transaction(deleteRow, errorCB);
    document.getElementById('qrpopup').style.display = 'none';
}

//Show the popup after tapping a row in table
//
function goPopup(row, rowname, rownum) {
    currentRow = row;
    document.getElementById("qrpopup").style.display = "block";
    document.getElementById("editNameBox").value = rowname;
    document.getElementById("editNumberBox").value = rownum;
}

function editRow(tx) {
    tx.executeSql('UPDATE DEMO SET name ="' + document.getElementById("editNameBox").value +
            '", number= "' + document.getElementById("editNumberBox").value + '" WHERE id = '
            + currentRow, [], queryDB, errorCB);
}
function goEdit() {
    var db = window.openDatabase(dbName, "1.0", "Cordova Demo", 200000);
    db.transaction(editRow, errorCB);
    document.getElementById('qrpopup').style.display = 'none';
}