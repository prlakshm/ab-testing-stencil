/*
    Author: sotech117
    License: Educational under Brown University
    Date: 1/22/24
 */

// citation: https://www.geeksforgeeks.org/how-to-create-and-download-csv-file-in-javascript/

// performs a downloadUtils of a csv file, given a string buffer in the format of csv text
const download = data => {
    // creating a Blob for having a csv file format
    // and passing the data with type
    const blob = new Blob([data], {type: 'text/csv'});

    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob);

    // Creating an anchor(a) tag of HTML
    const a = document.createElement('a');

    // Passing the blob downloading url
    a.setAttribute('href', url);

    // Setting the anchor tag attribute for downloading
    // and passing the downloadUtils file name
    const date = new Date();
    // stamp in format of `YYYY-MM-DDTHHmmss`
    const stamp = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    const fileName = `cs1300-ab-testing-data-${stamp}.csv`;
    a.setAttribute('download', fileName);

    // Performing a downloadUtils with click
    a.click()
}

// given the data as an array of objects, generates the text of it's corresponding csv
const buildcsv = data => {
    // Empty array for storing the values
    let csvRows = [];

    console.log("buildcsv", data);
    data.forEach(d => {
        // if the array is empty, append the headers (which are the keys)
        if (csvRows.length === 0) {
            const headers = Object.keys(d);
            csvRows.push(headers.join(','));
        }

        // append the data
        const values = Object.values(d).join(',');
        csvRows.push(values)

    })
    // Returning the array joining with new line
    return csvRows.join('\n');
}
