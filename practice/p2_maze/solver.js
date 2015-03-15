var blockType = [
    ["1",true ,false  ,false  ,false],
    ["2",false  ,true ,false  ,false],
    ["3",true ,true ,false  ,false],
    ["4",false  ,false  ,true ,false],
    ["5",true ,false  ,true ,false],
    ["6",false  ,true ,true ,false],
    ["7",true ,true ,true ,false],
    ["8",false  ,false  ,false  ,true],
    ["9",true ,false  ,false  ,true],
    ["a",false  ,true ,false  ,true],
    ["b",true ,true ,false  ,true],
    ["c",false  ,false  ,true ,true],
    ["d",true ,false  ,true ,true],
    ["e",false  ,true ,true ,true],
    ["f",true ,true ,true ,true]
];

function getBlockType(b) {
    for (var i=0;i<blockType.length;i++) {
        if (blockType[i][1] == b.n && blockType[i][2] == b.s &&
            blockType[i][3] == b.w && blockType[i][4] == b.e) {
            return blockType[i][0];
        }
    }
}

function MazeWalker() {

    var map = [[{n:true,e:false,w:false,s:false}]];
    var posC = 0;
    var posR = 0;
    var col = 1;
    var row = 1;
    var dir = 'D';

    function createBlock() {
        return {n:false,e:false,w:false,s:false};
    }

    function appendMap(dir) {
        switch (dir) {
            case 'D':
                var newRow = [];
                for (var i=0;i<col;i++) {
                    newRow.push(createBlock());
                }
                map.push(newRow);
                row++;
                break;
            case 'L':
                for (var i=0;i<row;i++) {
                    map[i].unshift(createBlock());
                }
                posC++;
                col++;
                break;
            case 'R':
                for (var i=0;i<row;i++) {
                    map[i].push(createBlock());
                }
                col++;
                break;
        }
    }

    this.walk = function() {
        switch (dir) {
            case 'U':
                map[posR][posC].n = true;
                posR--;
                map[posR][posC].s = true;
                break;
            case 'D':
                map[posR][posC].s = true;
                posR++;
                if (posR >= row) {
                    appendMap('D');
                }
                map[posR][posC].n = true;
                break;
            case 'L':
                map[posR][posC].w = true;
                posC--;
                if (posC < 0) {
                    appendMap('L');
                }
                map[posR][posC].e = true;
                break;
            case 'R':
                map[posR][posC].e = true;
                posC++;
                if (posC >= col) {
                    appendMap('R');
                }
                map[posR][posC].w = true;                
                break;
        }
    }

    this.turnLeft = function() {
        switch (dir) {
            case 'U':
                dir = 'L';
                break;
            case 'D':
                dir = 'R';
                break;
            case 'L':
                dir = 'D';
                break;
            case 'R':
                dir = 'U';
                break;
        }
    }

    this.turnRight = function() {
        switch (dir) {
            case 'U':
                dir = 'R';
                break;
            case 'D':
                dir = 'L';
                break;
            case 'L':
                dir = 'U';
                break;
            case 'R':
                dir = 'D';
                break;
        }
    }

    this.turn180 = function() {
        switch (dir) {
            case 'U':
                dir = 'D';
                break;
            case 'D':
                dir = 'U';
                break;
            case 'L':
                dir = 'R';
                break;
            case 'R':
                dir = 'L';
                break;
        }
    }

    this.exit = function() {
        switch (dir) {
            case 'U':
                map[posR][posC].n = true;
                break;
            case 'D':
                map[posR][posC].s = true;
                break;
            case 'L':
                map[posR][posC].w = true;
                break;
            case 'R':
                map[posR][posC].e = true;
                break;
        }
    }

    this.getMapCode = function() {
        var output = ['\n'];
        for (var i=0;i<row;i++) {
            for (j=0;j<col;j++) {
                var type = getBlockType(map[i][j]);
                output.push(type);
            }
            output.push('\n');
        }
        return output.join('');
    }

    this.printMap = function() {
        for (var i=0;i<row;i++) {
            for (var j=0;j<col;j++) {
                if (map[i][j].n) {
                    process.stdout.write(".   .");
                } else {
                    process.stdout.write(".....");
                }                
            }
            process.stdout.write('\n');
            for (var j=0;j<col;j++) {
                if (map[i][j].w) {
                    process.stdout.write("    ");
                } else {
                    process.stdout.write(".   ");
                }
                if (map[i][j].e) {
                    process.stdout.write(" ");
                } else {
                    process.stdout.write(".");
                }
            }
            process.stdout.write('\n');
            for (var j=0;j<col;j++) {
                if (map[i][j].s) {
                    process.stdout.write(".   .");
                } else {
                    process.stdout.write(".....");                    
                } 
            }
            process.stdout.write('\n');
        }
        process.stdout.write('\n');
    }
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
        var inPath = data[0][0];
        var outPath = data[0][1];
        var mw = new MazeWalker();
        for (var i=1;i<inPath.length-1;i++) {
            var action = inPath[i];
            switch (action) {
                case 'W':
                    mw.walk();
                    break;
                case 'L':
                    mw.turnLeft();
                    break;
                case 'R':
                    mw.turnRight();
                    break;
            }
        }
        mw.exit();
        mw.turn180();
        for (var i=1;i<outPath.length-1;i++) {
            var action = outPath[i];
            switch (action) {
                case 'W':
                    mw.walk();
                    break;
                case 'L':
                    mw.turnLeft();
                    break;
                case 'R':
                    mw.turnRight();
                    break;
            }
        }
        mw.exit();
        //mw.printMap();
        done("\n"+mw.getMapCode().trim());
    }
};