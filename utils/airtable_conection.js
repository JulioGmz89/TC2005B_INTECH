var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keygVLsGwcbWkQDhG'}).base('appgA70pzdc6MiIJi');
/*
base('Tasks').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Global view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (page) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'));
    });

    // To fetch the next page of records, call fetchNextPage.
    // If there are more records, page will get called again.
    // If there are no more records, done will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
*/
// If you only want the first page of records, you can
// use firstPage instead of eachPage.
base('Tasks').select({
    maxRecords: 10,
	view: 'Global view'
}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'));
    });
});

