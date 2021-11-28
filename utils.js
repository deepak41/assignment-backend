function isWithin30Days(createdDate) {
    var today = new Date();
    var created = new Date(createdDate);
    var diffDays = parseInt((today - created) / (1000 * 60 * 60 * 24)); 
    if(diffDays>30) return false;
    return true;
}

function isclosed(obj) {
    if((new Date(obj.endDate)) < (new Date()) || obj.procuredAmount >= obj.totalAmount) {
        return true;
    }
    return false;
}

module.exports = {
    isWithin30Days: isWithin30Days,
    isclosed: isclosed
}
  