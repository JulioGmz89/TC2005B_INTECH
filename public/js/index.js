fetch('https://airtable.com/api', {
    method: 'GET',
    body 
}).then(result => {
    return result.json(); 
}).then(data => {
    
}).catch(err => {
    console.log(err);
});
};
