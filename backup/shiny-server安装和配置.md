参考博文[在Ubuntu服务器上配置Shiny应用](https://www.jieandze1314.com/post/cnposts/256/)进行基本的安装和配置。注意 zhoulab 服务器没有将 shiny 加入 sudo 用户，而是直接使用 root 进行相关的 sudo 操作。

shiny server 配置文件内容：

```
# Instruct Shiny Server to run applications as the user "shiny"
run_as shiny;
preserve_logs true;
app_idle_timeout 0;
# Define a server that listens on port 3838
server {
  listen 3838;

  # Define a location at the base URL
  location / {

    # Host the directory of Shiny Apps stored in this directory
    site_dir /srv/shiny-server;

    # Log all Shiny output to files in this directory
    log_dir /var/log/shiny-server;

    # When a user visits the base URL rather than a particular application,
    # an index of the applications available in this directory will be shown.
    directory_index on;
  }
}
``` 

主要是增加了第3行和第4行，其他的没动过。

nginx 的配置参考文章[shiny应用的nginx配置](https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/issues/8)。