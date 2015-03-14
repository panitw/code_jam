var TestCaseManager = require("./lib/TestCaseManager.js");
var InputParser = require("./lib/InputParser.js");

if (process.argv.length < 4) {
    console.log("Usage: node runner <solverPath> <inputFile> [testCaseNumber]");
} else {
    var solverPath = process.argv[2];
    var inputFile = process.argv[3];
    var testCaseNumber = process.argv[4];
    if (testCaseNumber) {
        testCaseNumber = parseInt(testCaseNumber);
    }
        
    var parser = new InputParser(solverPath + "/" + inputFile);
    var solver = require("./" + solverPath + "/solver");
    var caseManager = new TestCaseManager(solver.solve, testCaseNumber);
    
    caseManager.on("done", function (results) {
        for (var i = 0; i < results.length; i++) {
            if (!testCaseNumber || testCaseNumber == (i+1)) {
                process.stdout.write("Case #" + (i + 1) + ": " + results[i]+"\n");
            }
        }
    });
    
    solver.parse(parser, caseManager);
}