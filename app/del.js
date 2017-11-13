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

// Delete an object

function del() {
	var params = {
		Bucket: process.argv[3], 
		Key: process.argv[2]
	};
	s3.deleteObject(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
//		else     console.log(data);           // successful response
	});
}

if (process.argv[2] && process.argv[3])
{
	console.log("Delete");
	del();
}
else
{
	console.log("Error !");
}
