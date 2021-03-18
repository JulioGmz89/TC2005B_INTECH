var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keygVLsGwcbWkQDhG'}).base('appVI19KKG65iTRLD');

base('Design projects').select({
    // Selecting the first 3 records in All projects:
    //maxRecords: 3,
    view: "Completed projects"
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



