1、**什么是路由？**

 >   路由描述的是 URL 与 UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）。

2、**实现需要解决的的俩个核心问题？**




| Core |
| --- |
| 如何改变 URL 却不引起页面刷新？ |
| 如何检测 URL 变化了？|

3、**route 和router区别**

-        route就是一条路由，它将一个URL路径和一个函数进行映射，例如
         /users        ->  getAllUsers()
         /users/count  ->  getUsersCount()
         当访问 /users 的时候，会执行 getAllUsers() 函数；当访问 /users/count 的时候，会执行 getUsersCount() 函数。
-       [The router routes you to a route]
        router 可以理解为一个容器，或者说一种机制，它管理了一组 route。简单来说，route 只是进行了URL和函数的映射。
        而在当接收到一个URL之后，去路由映射表中查找相应的函数，这个过程是由 router 来处理的。 

4、**服务器端路由**
-       对于服务器来说，当接收到客户端发来的HTTP请求，会根据请求的URL，来找到相应的映射函数，然后执行该函数，  
        并将函数的返回值发送给客户端。
-       对于最简单的静态资源服务器，可以认为，所有URL的映射函数就是一个文件读取操作。
        对于动态资源，映射函数可能是一个数据库读取操作，也可能是进行一些数据的处理。
-       route("/", shiny::tags$div(shiny::tags$span("Hello world")))
        route("main", shiny::tags$div(h1("Main page"), p("Lorem ipsum.")))
        这里定义了两条路由：当访问 / 的时候，会返回一个包含 "Hello world" 文本，当访问main时，返回一个包含一个主标题
        和一个段落的 <div> 元素。

5、**客户端路由（浏览器）**
-        



动态路由
--  动态路由协议：
**  1、路由器之间需要实时地交换路由信息
**  2、路由器根据路由算法把收集到的路由信息加工成路由表，供路由器在转发IP报文时查阅。

|  | 静态路由 | 动态路由 |
| --- | --- | --- |
| 配置复杂性 | 随着网络规模的增大而越趋复杂 | 通常不受网络规模限制 |
| 管理员所需知识 | 不需要额外的专业知识 | 需要了解动态路由协议和技能 |
| 拓扑结构变化 | 需要管理员参与 | 自动根据拓扑变化进行调整 |
| 可扩展性 | 适合简单的网络拓扑结构 | 简单拓扑结构和复杂拓扑结构都适合 |
| 安全性 | 更安全 | 没有静态路由安全 |
| 资源占用 | 不需要额外的资源 | 占用CPU、内存和链路带宽 |
| 可预测性 | 总是通过同一路径到达目的地 | 根据当前网络拓扑结构确定路径 | 








<a id="1下载"></a>

## 1、下载

```
 install.packages("shiny.router").  
```

<a id="2函数"></a>

## 2、函数

<a id="1change_page"></a>

### （1）、change_page
注释
```
向客户端reactive input binding发送一条消息，告诉page.js相应地更新窗口URL，然后告诉客户端shiny的reactive input binding已经更改，router会收到这个变化的通知，get_page()等相似函数也会收到该通知。
在链接中添加 "/#!/" 前缀
```
用法
```
change_page(page, session = shiny::getDefaultReactiveDomain(), mode = "push")
# mode ("replace" or "push")
# session指shiny的用户参数
```
示例
```
observeEvent(input$go_to_table, {
      change_page("table")
    })
```
<a id="2disable_bootstrap_on_bookmark"></a>

### （2）、disable_bootstrap_on_bookmark
```
注释
当用户打开指定的书签时，此函数会动态删除引导依赖项。 它应该插入到引导页面的头部。
```
```
用法
disable_bootstrap_on_bookmark(bookmark)
# 在哪个书签上抑制 Bootstrap 依赖项。
```
```
示例
disable_bootstrap_on_bookmark("home_page")
```
<a id="3get_page"></a>

### （3）、get_page
```
注释
# 该函数提取的是哈希后面的虚拟路径（virtual path）部分。如果输入没有值，即当前页面信息不可用，函数将返回 FALSE。
```
```
用法
get_page(session = shiny::getDefaultReactiveDomain())
```
```
示例
get_page(session)
```
<a id="4get_query_param"></a>

### （4）、get_query_param
```
注释
检索作为请求页面一部分的任何参数的便利函数。返回的参数值来自[http::parse_url()] 
(https://www.php.net/manual/zh/function.parse-url.php)
```
```
用法
get_query_param(field = NULL, session = shiny::getDefaultReactiveDomain())
# field | If provided, retrieve only a param with this name. (Otherwise, return all params)
# session | The Shiny session
```
```
示例
page_size <- get_query_param("pageSize")
```

<a id="5route_link"></a>


###（5）、is_page
```
注释
如果我们不在指定的页面上，告诉反应链停止。这会帮助我们确保不会浪费时间为当前未显示的页面重新渲染UI。
```
```
用法
is_page(page, session = shiny::getDefaultReactiveDomain(), ...)
# page 参数： 检查当前页面是否为该页面
```
```
示例
is_page("home", session)
```
<a id="6route_link"></a>

### （6）、route_link
```
注释
在链接中添加 "/#!/" 前缀
```
```
用法
route_link(path)
```
```
示例
menu <- tags$ul(
    tags$li(a(class = "item", href = route_link("/"), "Main")),
    tags$li(a(class = "item", href = route_link("another"), "Another page")),
)
```
<a id="7router_ui"></a>

### （7）、router_ui
```
注释
创建shiny的ui
```
```
用法
router_ui(default, ..., page_404 = page404(), env = parent.frame())
```
```
示例
 router_ui(
      route("table", table$ui(ns("table"))),
      route("chart", chart$ui(ns("chart"))),
      route("chart", chart$ui(ns("chart")))，
      page_404 = page_404$ui(ns("page_404"))
)
```
<a id="8outer_server"></a>

### （8）、router_server
```
注释
设置shiny的主页面和环境
```
```
用法
router_server(root_page = "/", env = parent.frame())
```
```
示例
 router_server("/")
```
<a id="9route"></a>

### （9）、route
```
注释
创建单独路由
```
```
用法
route(path, ui, server = NA)
```
```
示例
 route("/", intro$ui(ns("intro")))
```

<a id="10parse_url_path"></ap>

### （10）、parse_url_path
```
注释
提取有关URL路径和跟在问号（?）符号后面的参数的信息。
```
```
用法
parse_url_path(url_path)
# 查询的出现在#!的参数可能会导致浏览器刷新
# 返回结果是一个列表，其中包含两个元素：path 和 query。
```
```
示例
parse_url_path("?a=1&b=foo")
# $path：这里是一个空字符串，因为在输入的 URL 中没有指定路径部分
$path
[1] ""
# $query：是一个包含参数的列表。在这个例子中，有两个参数：a 和 b。
$query
$query$a
[1] "1"
$query$b
[1] "foo"
```
```
parse_url_path("?a=1&b[1]=foo&b[2]=bar/#!/")
$path
[1] ""

$query
$query$a
[1] "1"

$query$b
$query$b$`1`
[1] "foo"

$query$b$`2`
[1] "bar"
```
```
parse_url_path("?a=1&b[1]=foo&b[2]=bar/#!/other_page")
$path
[1] "other_page"

$query
$query$a
[1] "1"

$query$b
$query$b$`1`
[1] "foo"

$query$b$`2`
[1] "bar"
```
```
parse_url_path("www.foo.bar/#!/other_page")
$path
[1] "other_page"

$query
NULL
```
```
parse_url_path("www.foo.bar?a=1&b[1]=foo&b[2]=bar/#!/other")
$path
[1] "other"

$query
$query$a
[1] "1"

$query$b
$query$b$`1`
[1] "foo"

$query$b$`2`
[1] "bar"
```
```
parse_url_path("#!/?a=1&b[1]=foo&b[2]=bar")
$path
[1] ""

$query
$query$a
[1] "1"

$query$b
$query$b$`1`
[1] "foo"

$query$b$`2`
[1] "bar"
```
```
parse_url_path("#!/other_page?a=1&b[1]=foo&b[2]=bar")
$path
[1] "other_page"

$query
$query$a
[1] "1"

$query$b
$query$b$`1`
[1] "foo"

$query$b$`2`
[1] "bar"
```
```
parse_url_path("www.foo.bar/#!/other?a=1&b[1]=foo&b[2]=bar")
$path
[1] "other"

$query
$query$a
[1] "1"

$query$b
$query$b$`1`
[1] "foo"

$query$b$`2`
[1] "bar"
```

<a id="11PAGE_404_ROUTE"></a> 

### （11）、PAGE_404_ROUTE
```
注释
默认的404页面
```
```
用法
PAGE_404_ROUTE
```
```
示例
# app/main.R
box::use(
  shiny[a, fluidPage, moduleServer, tags, NS],
  shiny.router[router_ui, router_server, route, route_link, PAGE_404_ROUTE ],
)

router_ui(
      route("/", intro$ui(ns("intro"))),
      route("table", table$ui(ns("table"))),
      route("chart", chart$ui(ns("chart"))),
      page_404 = PAGE_404_ROUTE
    )
```

<a id="12page404"></a> 

### （12）、page404
```
注释
router_ui里的404页面
```
```
用法
page404(page = NULL, message404 = NULL)
```
```
示例
 
router_ui(
      route("table", table$ui(ns("table"))),
      route("chart", chart$ui(ns("chart"))),
      route("chart", chart$ui(ns("chart")))，
      page_404 = page_404$ui(ns("page_404"))
)

# app/view/page_404.R

box::use(
  shiny[a, div, h1, moduleServer, NS],
  shiny.router[route_link],
)

#' @export
ui <- function(id) {
  ns <- NS(id)

  div(
    h1("Whoops! Something went wrong!"),
    a("Back to home page", href = route_link("/"), class = "btn btn-primary btn-lg")
  )
}
```
<a id="13make_router"></a>  

### （13）、make_router
```
[Deprecated] Creates router.
```

<a id="3示例"></a>  

## 3、示例

<a id="示例一"></a>  

### 示例一

<a id="1创建初始应用程序"></a>  

#### 1、创建初始应用程序
```
install.packages("rhino")
rhino::init("show")
```

<a id="2安装依赖"></a>  

#### 2、安装依赖
```
renv::install("shiny.router","shiny","UCSCXenaTools","shinyjs","data.table") 
```
<a id="3更改dependencies.R文件，添加新的依赖项"></a>  

#### 3、更改dependencies.R文件，添加新的依赖项
```
# dependencies.R

library(shiny)
library(rhino)
library(shiny.router)
library(UCSCXenaTools)
library(shinyjs)
library(data.table)
library(shiny.blueprint)
```
<a id="4更新文件：renv.lock"></a> 

#### 4、更新文件：renv.lock
```
renv::snapshot()
```
<a id="5填充内容"></a> 

#### 5、填充内容

<a id="1从UCSCXena下载了TARGET-AML的数据，下载并处理后位于"></a> 

##### 1、从UCSCXena下载了TARGET-AML的数据，下载并处理后位于

(C:\Users\PC\AppData\Roaming\Typora\typora-user-images\image-20240105223543065.png)

```
app/logic/aml
# 加载数据文件

a2 <- function() {
  load("C:/Users/PC/Desktop/123456/show/app/logic/aml.RData")
  loaded_data <- get("a1")  # 请替换为实际的变量名
  return(loaded_data)
}
```
<a id="2创建首页"></a> 

#####  2、创建首页

```
# app/view/home.R

box::use(
  shiny[moduleServer, NS,tags,icon,tabPanel,br,column,div, tagList,wellPanel,fluidRow,h2,strong,h5],
  shiny.router[route_link,change_page],
)


#' @export
ui <- function(id) {
   ns <- NS(id)
   tabPanel("Home1", icon = icon("house"),
           column(2),
           column(8, tags$h2(
             strong("Welcome to the Show!", style = "font-size: 1.5em;")
           )),
           column(2),
           br(),
           fluidRow(
             br(),
             br(),
             br(),
             column(2),
             column(6, tagList(
                    wellPanel(h5("Guide",
                                    style = "font-size: 1.2em;"),
                                    align = "left"),
                    wellPanel(h5("RECENT CONTENTS",
                                 style = "font-size: 1.2em;"),
                                 align = "left"),
                    wellPanel(h5("Citation",
                          style = "font-size: 1.2em;"), align = "left")))),

             




}
#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
  })}

```
<a id="3cohort页面，使用a2函数读取数据"></a> 

##### 3、cohort页面，使用a2函数读取数据

```
# app/view/cohort.R

box::use(
  shiny[moduleServer, NS, fluidRow, column, tags, observeEvent, observe,tableOutput,renderTable,tagList,h3, wellPanel, br, selectInput, h5, p, reactive, updateSelectInput],
  shiny.router[route_link, get_query_param, change_page],
  reactable,
)

box::use(
  app/logic/aml1[a2]
)
#' @export
ui <- function(id) {
  a3 <- a2()
  fluidRow(
    column(3,
           wellPanel(
             h5("Analysis Controls"),
             br(),
             p("Select dataset:"),
             p("Analysis Type"),
             selectInput(
               "analysis_type1",
               label = NULL,
               choices = a3$Ensembl_ID
             ),
           )
    ))
}

#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
      })}
```
<a id="6添加添加404页"></a> 

#### 6、添加添加404页

```
# app/view/page_404.R

box::use(
  shiny[a, div, h1, moduleServer, NS],
  shiny.router[route_link],
)

#' @export
ui <- function(id) {
  ns <- NS(id)
  
  div(
    h1("Whoops! Something went wrong!"),
    a("Back to home page", href = route_link("/"), class = "btn btn-primary btn-lg")
  )
}

```

<a id="7将 UI 模块包装在：router_ui"></a> 

#### 7、将 UI 模块包装在：router_ui

```
# app/main.R

box::use(
  shiny[moduleServer, tagList, sidebarLayout, NS, tabPanel,bootstrapPage,tags,HTML,icon,mainPanel, sidebarPanel,fluidPage],
  shiny.router[route_link, router_ui,route,router_server]
)

box::use(
  app/view/Home,
  app/view/page_404,
  app/view/cohort
)

#' @export
ui <- function(id) {
  ns <- NS(id)
  fluidPage(
    sidebarLayout(
      sidebarPanel(
        tags$nav(
          class = "navbar",
    tags$ul(
      class = "nav navbar-nav",
    tags$a(href = route_link("/"), HTML(paste0(icon("home"), "Home"))),
    tags$a(href = route_link("cohort"), HTML(paste0(icon("people-group"), "cohort")))
    )),
    ),
    mainPanel(
      width = 7.5,
      router_ui(
        route("Home", Home$ui(ns("Home"))),
        route("cohort", cohort$ui(ns("cohort")))
      ),
      )
    ))
}

#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    router_server("Home") # 主页面
    Home$server("Home")
    cohort$server("cohort")
  })
}
```
<a id="8添加按钮跳转导航"></a> 

#### 8、添加按钮跳转导航
```
# app/view/Home.R

box::use(
  shiny[moduleServer, NS,tags,icon,tabPanel,br,column,div,tagList,observeEvent,actionButton,wellPanel,fluidRow,h2,strong,h5,selectInput],
  shiny.router[route_link,change_page],
)


#' @export
ui <- function(id) {
   ns <- NS(id)
   tabPanel("Home1", icon = icon("house"),
           column(2),
           column(8, tags$h2(
             strong("Welcome to the Show!", style = "font-size: 1.5em;")
           )),
           column(2),
           br(),
           fluidRow(
             br(),
             br(),
             br(),
             column(2),
             column(6, tagList(
                    wellPanel(h5("Guide",
                                    style = "font-size: 1.2em;"),
                                    align = "left"),
                    wellPanel(h5("RECENT CONTENTS",
                                 style = "font-size: 1.2em;"),
                                 align = "left"),
                    wellPanel(h5("Citation",
                          style = "font-size: 1.2em;"), align = "left")))),

             fluidRow(
             div(
                 class = "jumbotron",
                 h2("Click this button to check out the table:"),
                 actionButton(
                   inputId = ns("go_to_table"),
                   label = "cohort",
                   class = "btn-primary btn-lg"
               )
               )
               ))
}
#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
    observeEvent(input$go_to_table, {
      change_page("cohort")
    })
  })}

```
