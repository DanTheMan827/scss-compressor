#!/usr/bin/env node
// test

var userArgs     =	process.argv.slice(2),
	cwd          =	process.cwd(),
	outputPath   =	(function(file){
						var split = file.split('.')
						split.pop()
						return split.join('.')
					})(userArgs[0]),
	fs           =	require('fs'),
	sass         =	require('node-sass'),
	autoprefixer =	require('autoprefixer')
	postcss      =	require('postcss'),
	cleancss     =	require('clean-css');
	
	console.log(userArgs[0]);
	sass.render({
		file: userArgs[0],
		config_file: cwd + '\config.rb'
	}, function(err, result){
		postcss([ autoprefixer({ browsers: ['> 0%']}) ]).process(result.css).then(function (result) {
			fs.writeFile(outputPath + '.css', result.css)
			new cleancss({
				keepSpecialComments: 0
			}).minify(result.css, function (errors, minified) {
				fs.writeFile(outputPath + '.min.css', minified.styles)
				
			});
		});
	});