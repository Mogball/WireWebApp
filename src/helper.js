const formatMoney = function (n, showPlus, hideDollar) {
    hideDollar = !!hideDollar;
    showPlus = !!showPlus;
    n /= 100;
    let s = n < 0 ? '—' : (showPlus ? '+' : '') + '';
    s += hideDollar ? '' : '$';
    let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(2), 10));
    let j = i.length > 3 ? i.length % 3 : 0;
    return s + (j ? i.substr(0, j) + ',' : '')
        + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1,')
        + (2 ? '.' + Math.abs(n - i).toFixed(2).slice(2) : '');
};

const formatComma = function (n, c) {
    let s = n < 0 ? '—' : '';
    let i = String(parseInt(Math.abs(Number(n) || 0).toFixed(c), 10));
    let j = i.length > 3 ? i.length % 3 : 0;
    return s + (j ? i.substr(0, j) + ',' : '')
        + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1,");
};

const mapTypeToLabel = function (type) {
    switch (type) {
        case "singleItem":
            return "Item";
        case "auction":
            return "Auction";
        case "retailStore":
            return "Store";
        case "restaurant":
            return "Restaurant";
        default:
            return "Custom";
    }
};

// eslint-disable-next-line
String.prototype.format = function () {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
};

const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = function (date, showYear) {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth();
    let year = !!showYear ? ", {0}".format(date.getYear()) : "";
    return "{0}:{1}{2} {3} {4}{5}".format(
        hour === 0 ? 12 : hour > 12 ? hour - 12 : hour,
        minute >= 10 ? minute : '0' + minute,
        hour >= 12 ? 'pm' : 'am', monthMap[month], day, year);
};

const objIsEmpty = function (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

exports.formatMoney = formatMoney;
exports.formatComma = formatComma;
exports.formatDate = formatDate;

exports.objIsEmpty = objIsEmpty;

exports.mapTypeToLabel = mapTypeToLabel;