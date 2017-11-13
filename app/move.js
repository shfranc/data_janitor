var aws = require('aws-sdk')

aws.config.update({
	accessKeyId: 'accessKey1',
	secretAccessKey: 'verySecretKey1'
});

var s3 = new aws.S3({
	endpoint: process.env.ZENKO_ENDPOINT,
	s3ForcePathStyle: true,
});
var s3Stream = require('s3-upload-stream')(s3)

function transfer(src_name, dst_name, key) {
	return new Promise ((resolve, reject) => {
	
	let options = {
		Bucket : src_name,
		Key : key,
	};
	let stream = s3.getObject(options).createReadStream();

	let upload = s3Stream.upload({
		Bucket: dst_name,
		Key: key,
		ACL: 'public-read'
	});

	upload.on('error', function (error) {
  		reject(error);
	});
	upload.on('part', function (details) {
 		console.log(details);
	});
	upload.on('uploaded', function (details) {
 		console.log(details);
		resolve(key)
	});
	
	upload.concurrentParts(5); //threading
	upload.maxPartSize(104857600); //based on azure settings
	stream.pipe(upload);
	})
}

function del(bucket_name, key) {
	let params = {
		Bucket: bucket_name, 
		Key: key
	};
	s3.deleteObject(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
	});
}

function move(src_name, dst_name, key) {
    transfer(src_name, dst_name, key)
    .then(result => {
        del(src_name, key)
    }).catch(error => {
        console.log(error)
    })
    console.log('ouuuui')
}

if (process.argv[2] && process.argv[3] && process.argv[4])
{
	console.log("I like to transfer it transfer it");
	move(process.argv[3], process.argv[4], process.argv[2])
}
else
{
	console.log("Error !");
}

// module.exports = {
//    move: move()
// }