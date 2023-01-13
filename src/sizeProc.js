import $ from "jquery";

export default function sizeProc(sizeRaw) {
    //Split String ex. '2.35 GB'
    var sizeSplit = sizeRaw.split(' ');
    // set unit to var
    console.log(sizeSplit[1])
    var sizeUnit = sizeSplit[1].toString().toLowerCase();
    //Convert to float
    var sizeNum = parseFloat(sizeSplit[0])
    var sizeOut;
    // Check for unit and convert to MB
    if (sizeUnit === 'gb' || 'gib') {
        sizeOut = sizeNum * 1024;
    } else if (sizeUnit === 'kb' || 'kib') {
        sizeOut = sizeNum / 1024;
    } else {
        sizeOut = sizeNum;
    }

    return sizeOut;
}