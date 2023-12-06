> 这篇文章记录的是怎么将单页面的主页同步上传到展示网站的 FTP 服务器上。由于目前将本博客网站作为主页部署，直接桥联了 GitHub Pages 和对应域名，这篇文章已经过时了。

该部署发生在德国 yunfa server 的 root 账号下。

采用了一个叫做 [upload-ftp](https://marketplace.visualstudio.com/items?itemName=wupengcheng.upload-ftp) 的 vscode 插件帮助存储 ftp 配置以及快速上传文件。

配置文件在 `/root/.vscode/upload.json`。

```
{
    "server": {
        "host": "xxx",
        "port": 21,
        "user": "xxx",
        "password": "xxx"
    },
    "files": [
        {
            "localfile": "/root/index.html",
            "remotefile": "/index.html"
        }
    ],
    "dirs":[
    ]
}
```

完成配置后右键 `.vscode` 文件夹然后点击上传按钮即可。

<img width="838" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/99ef9cf1-6173-4b3a-90d3-df9a7459bd36">
