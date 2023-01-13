import { Man } from "@mui/icons-material";
import $ from "jquery";
//import sizeProc from "./sizeProc";


let magnets = [];
let errors = [];
let apiURLS = [];


export default async function getTorrents(csvData, domain, port, site, limit, searchAll) {
    
    //set default api type
    var apiType;
    
    // ALL URL /api/v1/all/search?query=avengers&limit=10
    // SITE URL /api/v1/search?site=1337x&query=avengers&limit=20

    if (searchAll === true) {
        apiType = '/api/v1/all/search?';
        site = '';
    } else {
        apiType = '/api/v1/search?site=';
    }

    console.log(apiType);
    

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
        console.log(`-------------      NEW MOVIE       --------\n${csvData[i]}`);
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
            var largestID = null;
            var sizes = [];

            for (let m = 0; m < req.data.length; m++) {
                // get size of item
                var size = String(req.data[m].size);

                // set unit to var
                var sizeUnit = size.match(/[a-zA-Z]+/);
                
                //Convert to float
                var sizeNum = parseFloat(size.match(/[0-9]*\.[0-9]+/))
                

                var converted;
                var sizeOut;

                // Check for unit and convert to MB
                if (sizeUnit == 'GiB') {
                    sizeOut = sizeNum * 1024;
                    converted = 'GB';
                } else if (sizeUnit == 'KiB') {
                    sizeOut = sizeNum / 1024;
                    converted = 'KB';
                } else if (sizeUnit == 'MiB') {
                    sizeOut = sizeNum;
                    converted = 'MB';
                } else {
                    sizeOut = 'DNP';
                }
                if (sizeOut >= big) {
                    big = sizeOut;
                    largestID = m;
                }

                sizes.push(`Size: ${sizeNum}  Unit: ${sizeUnit}  Size converted: ${sizeOut}`)
                
                
            }

            console.log(sizes);
            console.log(`********** Largest ID: ${largestID}`);

            let fColor = 'green';
            let linkTitle = 'Magnet';

            try {
                var magnet = req.data[largestID].magnet;
                magnets.push(magnet);
                console.log(magnet.substring(0,20));


              }
              catch(err) {
                console.log(`******** Couldn't find movie: ${csvData[i]}`)
                errors.push(csvData[i]);
                magnet = '#';
                fColor= 'red';
                linkTitle = 'Error';
            }
            
            let ele = `<td><a class="mLink" style="color: ${fColor};" href="${magnet}">${linkTitle}</a></td>`;
            let sizeRow = `<td>${sizes[largestID]}</td>`;

            $('.tRow').eq(i).append(ele);
            $('.tRow').eq(i).append(sizeRow);

            $('.mLink')[i].click();



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
