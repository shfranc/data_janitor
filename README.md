# data_janitor

File locationConfig.json -> regions config for local, azur and aws buckets (sample in scality/s3server repository).
Configure it with your indormation and copy it at the root of the repository

## Run Docker 

```bash
docker pull shfranc/data-janitor:multicloud2
sh run_docker.sh` at the root of the repository
```

## Use app

```bash
npm install
node app.js
```

## Use put.js
`node put.js [local_file] [bucket_name]`

## Use get.js
Download the file [file_name] in your bucket [bucket_name] in your current repository :
```bash
node get.js [bucket_name] [file_name]
```
Warning : if a file [file_name] exists in your repository, it will be overrided.
