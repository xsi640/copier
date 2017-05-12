var fs = require('fs');

fs.createReadStream('F:\\books\\DHTML完全手册.chm').pipe(fs.createWriteStream('E:\\abcdefg\\DHTML完全手册.chm'));