var express = require('express');
var fs = require('fs');

class Processor 
{
    constructor(filePath) 
    {
        this.filePath = filePath;
    }

    readCSV() 
    {
        this.data = fs.readFileSync(this.filePath, {encoding:'utf8', flag:'r'}); 
        this.data = this.data.split("\"").join("");
        this.data = this.data.split("\r").join("");
    }

    getAsJSON() 
    {
        var lines = this.data.split("\n");
        var jsonArr = [];
        var headers = lines[0].split(",");
        lines.map(function(line, indexLine)
            {
                if (indexLine < 1)
                {
                    return;
                } 
                var currentEntry = {};
                var currentline = line.split(",");
                headers.map(function(header, indexHeader)
                {
                    currentEntry[header] = currentline[indexHeader];
                })
            jsonArr.push(currentEntry);
            }
        )
        jsonArr.pop(); 
        this.jsonData = jsonArr; 
    }

    filterByState(state) 
    {
        var stateFiltered = [];
        for (var i = 0; i < this.jsonData.length; i++) 
        {
            if (this.jsonData[i]['state'] == state) 
            {
                stateFiltered.push(this.jsonData[i]);
            }
        }
        return stateFiltered;
    }
}

module.exports = Processor;