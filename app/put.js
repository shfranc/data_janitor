var AWS = require('aws-sdk'),
    fs = require('fs');

AWS.config.update({
    accessKeyId: 'accessKey1',
    secretAccessKey: 'verySecretKey1'
});

var s3 = new AWS.S3({
    endpoint: 'http://localhost:8000',
    s3ForcePathStyle: true,
});

// Read in the file, convert it to base64, store to S3 or azure

function put() {
	fs.readFile(process.argv[2], function (err, data) {
	  if (err) { throw err; }

	  var base64data = new Buffer(data, 'binary');

	  s3.putObject({
		Bucket: process.argv[3],
		Key: process.argv[2],
		Body: base64data,
		ACL: 'public-read'
	  },function (resp) {
		console.log('Successfully uploaded package.');
	  });
	});
}

if (process.argv[2] && process.argv[3])
{
	console.log("Upload");
	put();
}
else
{
	console.log("Error !");
}
