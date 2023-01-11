import { Man } from "@mui/icons-material";
import $ from "jquery";
import sizeProc from "./sizeProc";


let magnets = [];
let errors = [];
let apiURLS = [];


export default async function getTorrents(csvData, domain, port, site, limit, searchAll) {

    //set default api type
    var apiType = '/api/v1/search?site='
    
    // ALL URL /api/v1/all/search?query=avengers&limit=10
    // SITE URL /api/v1/search?site=1337x&query=avengers&limit=20

    if (searchAll == true) {
        apiType = '/api/v1/all/search?';
        site = '';
    }
    

    // Sets total movies
    $('#total-movies').text(String(csvData.length));

    // loop through csv array
    for (let i = 0; i < csvData.length; i++) {
        // set the search terms
        let percent = parseInt((i / csvData.length) * 100);
        var query = csvData[i];

        $('#percent').find('span').text(percent);
        $('#myBar').css('width', `${percent}%`)
    
        // Loading Results
        $('#current-movie').find('span').text(csvData[i]);
        $('#movie-now').text(String(i));


        // Log movie currently being queried
        console.log(csvData[i]);
        // Remove special characters and URLify the query with %20
        query = query.replace(/[^a-zA-Z0-9 ]/g, '');
        query = query.replaceAll(' ', '%20');
        // URL structure
        var url = `http://${domain}:${port}${apiType}${site}&query=${query}&limit=${limit}`
        // store urls for debug only
        apiURLS.push(url);
        console.log(url);

        $.ajaxSetup({
            "error":function() { console.log('Error with the request has ocurred.')  }
        });
    // API Call
    await $.getJSON(url, function (req) {

            var big = 0;
            var largestID;

            for (let m = 0; m < req.data.length; m++) {
                // get size of item
                var size = req.data[m].size;
                // call function to convert size to MB
                size = sizeProc(size)
                //console.log(size);
                if (size >= big) {
                    big = size;
                    largestID = m;
                }
                
                
            }

            try {
                var magnet = req.data[largestID].magnet;
                magnets.push(magnet);
                console.log(magnet);
              }
              catch(err) {
                console.log(`******** Couldn't find movie ${csvData[i]}`)
                errors.push(csvData[i]);
              }
            


        }
    )
    } 
    // returns array of magnet links
    //console.log(apiURLS);
    console.log('Magnets:')
    console.log(magnets);
    console.log('Errors:')
    console.log(errors);

    var magString = magnets.join('\n');
    console.log(`************Mag String***************\n${magString}`)
    navigator.clipboard.writeText(magString);
    $('#results').hide();
    $('#complete').show();
    $('#complete').text(`Query Completed. ${magnets.length} magnets copied to your clipboard. ${errors.length} movie(s) could not be found.`)


    return magString;

}
