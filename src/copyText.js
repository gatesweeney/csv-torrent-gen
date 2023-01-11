export default function copyText(magnetArray) {
    var magString = toString(magnetArray);
    magString = magString.replace(',', '\n');
    navigator.clipboard.writeText(magString);
}