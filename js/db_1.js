var currentRow;
// Populate the database
function populateDB(tx) {
    // Create the facts table
    //tx.executeSql("CREATE TABLE IF NOT EXISTS `facts` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `invention_id` INTEGER, `fact`);");
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, name,number)');
    
    // Create the inventions table
//    tx.executeSql("CREATE TABLE IF NOT EXISTS `inventions` (" +
//            "`id` int(11) NOT NULL AUTO_INCREMENT," +
//            "`name` varchar(256) NOT NULL," +
//            "`year` varchar(50) NOT NULL," +
//            "`inventorId` int(6) NOT NULL," +
//            "`imageName` varchar(100) NOT NULL," +
//            "`imageOffline` enum('Y','N') NOT NULL DEFAULT 'Y'," +
//            "`imageLink` varchar(1000) NOT NULL," +
//            "PRIMARY KEY (`id`)" +
//            ");");
//    // Create the inventor table
//    tx.executeSql("CREATE TABLE IF NOT EXISTS `inventor` (" +
//            "`id` int(11) NOT NULL AUTO_INCREMENT," +
//            "`name` varchar(100) NOT NULL DEFAULT '0'," +
//            "`wikiLink` varchar(1000) NOT NULL DEFAULT '0'," +
//            "`country` varchar(100) DEFAULT NULL," +
//            "PRIMARY KEY (`id`)" +
//            ");");
//    // Create the other table
//    tx.executeSql("CREATE TABLE IF NOT EXISTS `other` (" +
//            "`id` int(11) NOT NULL," +
//            "`name` varchar(200) NOT NULL," +
//            "`imageName` varchar(200) DEFAULT NULL," +
//            "`imageLink` varchar(1000) DEFAULT NULL," +
//            "`imageOffline` enum('Y','N') NOT NULL DEFAULT 'Y'," +
//            "PRIMARY KEY (`id`)" +
//            ");");
//    // Create the relevant table
//    tx.executeSql("CREATE TABLE IF NOT EXISTS `relevant` (`id` int(11) NOT NULL,`inventionId` int(11) NOT NULL,`otherId` int(11) NOT NULL, PRIMARY KEY (`id`));");
//    // Create the wikilinks table
//    tx.executeSql("CREATE TABLE IF NOT EXISTS `wikilinks` (`id` int(11) NOT NULL AUTO_INCREMENT, `inventionId` int(11) NOT NULL DEFAULT '0', `link` varchar(1000) NOT NULL DEFAULT '0', `linkFor` varchar(100) NOT NULL DEFAULT '0', PRIMARY KEY (`id`));");
}

// Query the database
function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

function searchQueryDB(tx) {
    tx.executeSql("SELECT * FROM DEMO where name like ('%" + document.getElementById("txtName").value + "%')",
            [], querySuccess, errorCB);
}

// Query the success callback
function querySuccess(tx, results) {
    var tblText = '<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var tmpArgs = results.rows.item(i).id + ",'" + results.rows.item(i).name
                + "','" + results.rows.item(i).number + "'";
        tblText += '<tr onclick="goPopup(' + tmpArgs + ');"><td>' + results.rows.item(i).id + '</td><td>'
                + results.rows.item(i).name + '</td><td>' + results.rows.item(i).number + '</td></tr>';
    }
    tblText += "</table>";
    document.getElementById("tblDiv").innerHTML = tblText;
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
    var db = window.openDatabase("newsDatabase2", "1.0", "Cordova Demo", 200000);
    db.transaction(queryDB, errorCB);
}

// Cordova is ready            
function onDeviceReady() {alert(8999)
    var db = window.openDatabase("newsDatabase2", "1.0", "Cordova Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
}

//Insert query
function insertDB(tx) {
    tx.executeSql('INSERT INTO DEMO (name,number) VALUES ("' + document.getElementById("txtName").value
            + '","' + document.getElementById("txtNumber").value + '")');
}

function goInsert() {
    var db = window.openDatabase("newsDatabase2", "1.0", "Cordova Demo", 200000);
    db.transaction(insertDB, errorCB, successCB);
}

function goSearch() {
    var db = window.openDatabase("newsDatabase2", "1.0", "Cordova Demo", 200000);
    db.transaction(searchQueryDB, errorCB);
}

function goDelete() {
    var db = window.openDatabase("newsDatabase2", "1.0", "Cordova Demo", 200000);
    db.transaction(deleteRow, errorCB);
    document.getElementById('qrpopup').style.display = 'none';
}

//Show the popup after tapping a row in table
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
    var db = window.openDatabase("newsDatabase2", "1.0", "Cordova Demo", 200000);
    db.transaction(editRow, errorCB);
    document.getElementById('qrpopup').style.display = 'none';
}