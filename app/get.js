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

function get() {
	var options = {
        Bucket : process.argv[2],
        Key : process.argv[3],
    };

	var file = fs.createWriteStream(process.argv[3]);
	s3.getObject(options).createReadStream().pipe(file);

    //var fileStream = s3.getObject(options).createReadStream();
    //var fileStream = s3.getObject(options);
	//console.log(fileStream);
}

if (process.argv[2] && process.argv[3])
{
	console.log("Download");
	get();
}
else
{
	console.log("Error !");
}
