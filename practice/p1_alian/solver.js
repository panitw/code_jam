function getEarthValue(digitSystem, digits) {
    var base = digitSystem.length;
    var sum = 0;
    for (var i = 0; i < digits.length; i++) {
        var index = digitSystem.indexOf(digits[digits.length-1-i]);
        var digitValue = index * Math.pow(base, i);
        sum += digitValue;
    }
    return sum;
}

function toAlianNumber(digitSystem, earthValue) {
    var base = digitSystem.length;
    var output = [];
    var i = 1;
    while (earthValue != 0) {
        var digit = earthValue % base;
        output.unshift(digitSystem[digit]);
        earthValue = Math.floor(earthValue / base);
        i++;
    }
    return output.join("");
}

module.exports = {
    parse: function (input, manager) {
        var data = input.read();
        var numTestCase = parseInt(data[0]);
        for (var i = 0; i < numTestCase; i++) {
            data = input.read();
            manager.addData(data);
            manager.endTestCase();
        }
        manager.noMoreData();
    },
    solve: function (data, done) {
        var data = data[0];
        var earthValue = getEarthValue(data[1], data[0]);
        var alianNumber = toAlianNumber(data[2], earthValue);
        done(alianNumber);
    }
};