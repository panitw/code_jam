var fs = require("fs");

function InputParser(file) {
    this._file = file;
}

InputParser.prototype._file = null;

InputParser.prototype._data = null;

InputParser.prototype.read = function() {
    if (this._data == "") {
        return null;
    }
    if (this._data == null) {
        this._data = fs.readFileSync(this._file, {encoding: "utf8"});
    }
    var returnedData = null;
    var indexOf = this._data.indexOf("\n");
    if (indexOf != -1) {
        returnedData = this._data.substring(0, indexOf);
        if (indexOf < this._data.length - 1) {
            this._data = this._data.substring(indexOf + 1);
        } else {
            this._data = "";
        }
    } else {
        returnedData = this._data;
        this._data = "";
    }
    returnedData = returnedData.trim().split(' ');
    return returnedData;
}

module.exports = InputParser;