主要是利用 nginx 实现方向代理到 shiny-server 的对应端口，另外实现 https 的验证访问。

```sh
$ cat /etc/nginx/sites-available/shiny
# Ref: https://gist.github.com/JasperHG90/e5b72673858886e0d5772ac40da0ee06

server {

        server_name shiny.zhoulab.ac.cn;
        #listen 80 default_server;
	#listen [::]:80 default_server;
	listen 443 ssl default_server;
	listen [::]:443 ssl default_server;
	ssl on;
        ssl_certificate /home/deploy/gitea-docker/gitea/cert_zhou.txt;
        ssl_certificate_key /home/deploy/gitea-docker/gitea/key_zhou.txt;

        location / {
                proxy_pass http://localhost:3838/;
                #proxy_redirect / $scheme://$http_host/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
                #proxy_read_timeout 20d;
                #proxy_buffering off;
        }
}

```

目前主要是让整个架构可以工作，后续可以考虑学习和进行自定义配置。

这里列一下学习文档：

- http://wiki.nginx.org/Pitfalls
- http://wiki.nginx.org/QuickStart
- http://wiki.nginx.org/Configuration

官方文档：

- http://nginx.org/en/docs/

参考配置：

- https://gist.github.com/JasperHG90/e5b72673858886e0d5772ac40da0ee06