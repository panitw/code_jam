var EventEmitter = require('events').EventEmitter;

function TestCaseManager(solver, testCaseToRun) {
    this._solverFunction = solver;
    this._data = [];
    this._results = [];
    this._testCaseToRun = testCaseToRun;
}

TestCaseManager.prototype.__proto__ = EventEmitter.prototype;

TestCaseManager.prototype._caseNumber = 0;
TestCaseManager.prototype._resolvedNumber = 0;
TestCaseManager.prototype._noMoreTestCase = false;
TestCaseManager.prototype._solverFunction = null;
TestCaseManager.prototype._testCaseToRun = null;
TestCaseManager.prototype._data = null;
TestCaseManager.prototype._results = null;

TestCaseManager.prototype.addData = function (data) {
    this._data.push(data);
}

TestCaseManager.prototype.endTestCase = function () {
    var testCaseData = this._data;
    this._data = [];
    this._caseNumber++;
    if (this._testCaseToRun) {
        if (this._testCaseToRun == this._caseNumber) {
            this._solverFunction(testCaseData, function (caseNumber, result) {
                this._results[caseNumber - 1] = result;
                this.checkDone(true);
            }.bind(this, this._caseNumber));
        }
    } else {
        this._solverFunction(testCaseData, function (caseNumber, result) {
            this._resolvedNumber++;
            this._results[caseNumber - 1] = result;
            this.checkDone();
        }.bind(this, this._caseNumber));
    }
}

TestCaseManager.prototype.noMoreData = function () {
    this._noMoreTestCase = true;
    this.checkDone();
}

TestCaseManager.prototype.checkDone = function (forceDone) {
    if (forceDone || (this._noMoreTestCase && this._resolvedNumber == this._caseNumber)) {
        this.emit("done", this._results);
    }
}

module.exports = TestCaseManager;