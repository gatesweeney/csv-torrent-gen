export default function sizeProc(sizeRaw) {
    //Split String ex. '2.35 GB'
    var sizeSplit = sizeRaw.split(' ');
    //Convert to float
    var sizeNum = parseFloat(sizeSplit[0])
    var sizeOut;
    // Check for unit and convert
    if (sizeSplit[1] == 'GB') {
        sizeOut = sizeNum * 1024;
    } else if (sizeSplit[1] == 'KB') {
        sizeOut = sizeNum / 1024;
    } else {
        sizeOut = sizeNum;
    }

    return sizeOut;
}