**进行该任务需要基本掌握 Linux 操作**。 @JianGuoZhou3 

> 问题反馈和交流请联系诗翔 @ShixiangWang 。
>
> 后续跟进实际问题进行补充 QA 和视频交流。

## 1. 准备

1. 获取对应服务器的 CircRNA 账号：目前建国有 2 台服务器已经安装和配置过 circrna-pipeline 流程，使用者根据对应数据存储的服务器，获取相应的账号并利用 SSH 登陆，切换到 `~/circrna-pipeline` 目录。推荐使用 VS Code，利用 Remote SSH 直接连接到对应的文件目录，后续操作会更简单。成功后会看到左侧展示出 circrna-pipeline 的文件目录。

<img width="2560" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/a9c4bede-f274-4742-a765-eeb06a4e4cea">

2. 拉取下最新的代码，先确保代码目录已经是最新的版本，以避免以后的代码冲突问题。

<img width="553" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/ec658d26-65c7-45f3-b1ec-41964fed7610">

3. 先确定原始数据 fastq 文件所在的目录，检查并记录路径，例如：`/home/zhou/t12a/HRA000524/raw`

```sh
$ ls /home/zhou/t12a/HRA000524/raw/*.gz
/home/zhou/t12a/HRA000524/raw/HRR179719_f1.fastq.gz  /home/zhou/t12a/HRA000524/raw/HRR179734_f1.fastq.gz  /home/zhou/t12a/HRA000524/raw/HRR179749_f1.fastq.gz  /home/zhou/t12a/HRA000524/raw/HRR179764_f1.fastq.gz
/home/zhou/t12a/HRA000524/raw/HRR179719_r2.fastq.gz  /home/zhou/t12a/HRA000524/raw/HRR179734_r2.fastq.gz  /home/zhou/t12a/HRA000524/raw/HRR179749_r2.fastq.gz  /home/zhou/t12a/HRA000524/raw/HRR179764_r2.fastq.gz
```

4. 为要处理的队列创建一个新的目录。强烈推荐在`/home/circrna/circrna-pipeline/run_batch_from_qc`下创建一个与队列 ID 一致的目录名，例如 `/home/circrna/circrna-pipeline/run_batch_from_qc/HRA000524`。这里无论用鼠标或者 `mkdir` 都是一样的。

<img width="396" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/aed003db-3996-4459-a718-459da7e2e056">


## 2. 执行计算

执行计算需要分为 3 个独立的步骤，需要按顺序进行，分别对应一个 Shell 脚本。初次接触的人可以大致看下左侧栏已经处理过的队列的结构逻辑和代码。

基本都是下面这个样子，3 个 Shell 脚本以及 3 个对应的日志文件（运行 Shell 脚本会自动生成），以及一个 txt 文件，它是 QC 脚本运行后会产生的队列样本 ID 列表。

<img width="221" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/dddb527d-26a7-420b-aeec-c2b2d236288e">

### 2.1. 创建脚本文件

创建上面提到的 3 个脚本文件，如果在 zhou 服务器上做计算，以 `HRA000524` 队列目录作为参考；如果是在 zhou2 服务器上做计算，以 `EGA_OAK` 队列目录作参考。

> 不同参考的原因是不同服务器的运算和结果存储路径不同，尽量减少错误的路径设置。

1. 简单一点，就是先复制粘贴（ctrl c + ctrl v）参考目录：

<img width="293" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/9a5bad2d-43da-4b9f-93b6-00eb302fbb60">

2. 然后修改为新的队列名，将目录下的 log 文件和 txt 文件删除，并根据队列名修改脚本名。完成后目录如下，这里我用 ABC 作为新的要处理的队列作演示。

<img width="322" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/8bb1219e-e83e-455e-9765-5a36bb6c95a8">

### 2.2. QC

1. 打开 `ABC_qc.sh` 文件进行编辑，修改 `indir` 路径。

<img width="1400" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/f073f500-aa8b-4873-a046-f924eb945016">

2. 替换参考队列名为处理队列名。

<img width="2012" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/d984b10d-20f2-48f1-8457-b733ea9d7803">

替换后涉及的地方都会改变。

<img width="1078" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/136bb8a5-963b-45bd-8f50-8ce9983892de">

3. 在脚本所在目录运行该脚本。

可以以右键或 cd 的方式进入脚本目录。

<img width="1139" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/42b81fc9-ffe1-4076-b581-737c20271686">

运行脚本

<img width="569" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/1212de2e-566d-44c8-862a-38d0832d16d4">

脚本会放到后台运行（可以关闭终端），日志文件也会生成。可以点击或者通过命令查看（命令会更新更快一些）。

<img width="468" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/616b37be-f61d-44e9-8063-f13228a710e5">

4. 提交和推送（同步）代码/日志到远程仓库。（这个步骤可以根据自己的情况进行操作，不需要每次日志更新都操作一遍）

<img width="398" alt="image" src="https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/25057508/e25209c7-c1fa-4e41-bec7-d04b8f59c0ec">

> QC 一开始进行就会生成上述的样本 ID txt 文件，这个也可以检查下，如果 ID 有问题，那么后续肯定会出问题。

### 2.3 检测

针对 `ABC_call.sh` 脚本重复上面 2.2 的 2-4 步骤。

### 2.4 聚合结果

针对 `ABC_aggr.sh` 脚本重复上面 2.2 的 2-4 步骤。

### 2.5 检查结果

最后的结果会在 `/home/zhou/raid/IO_RNA/circRNA/ABC` 目录下面。联系诗翔或有经验的人导出以及载入 TCCIA 数据库。


