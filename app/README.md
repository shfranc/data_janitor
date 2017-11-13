Build image

```bash
# from app folder
$ docker build -t transfer_app_img . 
```

Run container
```bash
$ docker run -d --rm -p 3000:3000 ---name transfer_container -e ZENKO_ENDPOINT='http://localhost:8000' transfer_app_img 
```

Follow logs
```bash
$ docker logs -f transfer_container
```
-----
> **Note:**
> -  If you add any node package to package.json ,you should re-build your image.
> -  If you change the code and want to relaunch the app, you can just re-run the container
> -  Personalize the user interface with you own buckets in index.ejs


