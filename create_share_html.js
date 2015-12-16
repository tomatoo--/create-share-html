var fs = require('fs');
var mkdirp = require("mkdirp")
var ejs = require('ejs');

var config       = require('./config.json');
var commonConfig = config.common;
var pagesConfig  = config.pages;

var dest = './public/share/';
var template = './src/share_template.ejs'
var count = 1;
var length = pagesConfig.length;


function createHtml() {
  fs.readFile(template, 'utf8', function(err, data){
    inputData = ejs.render(data, {
      commonTitle: commonConfig.title,
      id: count,
      title: pagesConfig[count-1].title,
      description: pagesConfig[count-1].description,
      url: commonConfig.url + 'share/' + count + '.html',
      imgPath: commonConfig.url + 'data/share/' + count + '.jpg'
    });
    var filename = count + '.html';
    fs.writeFile(dest + filename, inputData);
    count++;
    if(count <= length) createHtml();
  });
};

(function build() {
  mkdirp(dest, function(){
    createHtml()
  });
})();
