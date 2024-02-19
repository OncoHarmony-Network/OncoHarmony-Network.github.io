- [什么是路由？](#什么是路由)
  - [实现需要解决的的俩个核心问题？](#实现需要解决的的俩个核心问题)
  - [route 和router区别](#route-和router区别)
  - [服务器端路由](#服务器端路由)
  - [客户端路由（浏览器）](#客户端路由浏览器)
    - [动态路由协议：](#动态路由协议)
    - [（1）路由器之间需要实时地交换路由信息](#1路由器之间需要实时地交换路由信息)
    - [（2）路由器根据路由算法把收集到的路由信息加工成路由表，供路由器在转发IP报文时查阅。](#2路由器根据路由算法把收集到的路由信息加工成路由表供路由器在转发ip报文时查阅)
  - [动态路由与静态路由区别](#动态路由与静态路由区别)
- [shiny中的路由包shiny.router](#shiny中的路由包shinyrouter)
  - [下载](#下载)
  - [函数](#函数)
    - [（1）change\_page](#1change_page)
    - [（2）disable\_bootstrap\_on\_bookmark](#2disable_bootstrap_on_bookmark)
    - [（3）get\_page](#3get_page)
    - [（4）get\_query\_param](#4get_query_param)
    - [（5）is\_page](#5is_page)
    - [（6）route\_link](#6route_link)
    - [（7）router\_ui](#7router_ui)
    - [（8）router\_server](#8router_server)
    - [（9）route](#9route)
    - [（10）parse\_url\_path](#10parse_url_path)
    - [（11）PAGE\_404\_ROUTE](#11page_404_route)
    - [（12）page404](#12page404)
    - [（13）make\_router](#13make_router)
  - [示例](#示例)
    - [（1）创建初始应用程序](#1创建初始应用程序)
    - [（2）安装并添加依赖项，同时更新dependencies.R文件](#2安装并添加依赖项同时更新dependenciesr文件)
    - [（3）填充内容](#3填充内容)
      - [从UCSCXena下载Lung Cancer (Raponi 2006)的phenotype数据集，处理后转换为RData文件，保存于app/logic/Lung Cancer.RData](#从ucscxena下载lung-cancer-raponi-2006的phenotype数据集处理后转换为rdata文件保存于applogiclung-cancerrdata)
      - [创建首页](#创建首页)
      - [cohort页面，使用a2函数读取数据](#cohort页面使用a2函数读取数据)
    - [（4）添加404页](#4添加404页)
    - [（5）将 UI 模块包装在：router\_ui](#5将-ui-模块包装在router_ui)
    - [（6）添加按钮跳转导航](#6添加按钮跳转导航)
    - [（7）读取并显示参数](#7读取并显示参数)
      - [在该页面如何change\_page都返回"cohort"](#在该页面如何change_page都返回cohort)
    - [（8）在url改变参数时改变selectinput](#8在url改变参数时改变selectinput)
    - [（9）减少输出](#9减少输出)
      - [该情况下，处于home页面时也会执行该函数并输出](#该情况下处于home页面时也会执行该函数并输出)
      - [添加is\_page后在cohort页面才执行该函数并输出](#添加is_page后在cohort页面才执行该函数并输出)

# 什么是路由？

 >   路由描述的是 URL 与 UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）。

## 实现需要解决的的俩个核心问题？
| Core |
| --- |
| 如何改变 URL 却不引起页面刷新？ |
| 如何检测 URL 变化了？|

## route 和router区别
-        route就是一条路由，它将一个URL路径和一个函数进行映射，例如
         /users        ->  getAllUsers()
         /users/count  ->  getUsersCount()
         当访问 /users 的时候，会执行 getAllUsers() 函数；当访问 /users/count 的时候，会执行 getUsersCount() 函数。
-       [The router routes you to a route]
        router 可以理解为一个容器，或者说一种机制，它管理了一组 route。简单来说，route 只是进行了URL和函数的映射。
        而在当接收到一个URL之后，去路由映射表中查找相应的函数，这个过程是由 router 来处理的。 

## 服务器端路由
-       对于服务器来说，当接收到客户端发来的HTTP请求，会根据请求的URL，来找到相应的映射函数，然后执行该函数，  
        并将函数的返回值发送给客户端。
-       对于最简单的静态资源服务器，可以认为，所有URL的映射函数就是一个文件读取操作。
        对于动态资源，映射函数可能是一个数据库读取操作，也可能是进行一些数据的处理。
-       route("/", shiny::tags$div(shiny::tags$span("Hello world")))
        route("main", shiny::tags$div(h1("Main page"), p("Lorem ipsum.")))
        这里定义了两条路由：当访问 / 的时候，会返回一个包含 "Hello world" 文本，当访问main时，返回一个包含一个主标题
        和一个段落的 <div> 元素。

## 客户端路由（浏览器）

###  动态路由协议：

###  （1）路由器之间需要实时地交换路由信息



###  （2）路由器根据路由算法把收集到的路由信息加工成路由表，供路由器在转发IP报文时查阅。



## 动态路由与静态路由区别
|  | 静态路由 | 动态路由 |
| --- | --- | --- |
| 配置复杂性 | 随着网络规模的增大而越趋复杂 | 通常不受网络规模限制 |
| 管理员所需知识 | 不需要额外的专业知识 | 需要了解动态路由协议和技能 |
| 拓扑结构变化 | 需要管理员参与 | 自动根据拓扑变化进行调整 |
| 可扩展性 | 适合简单的网络拓扑结构 | 简单拓扑结构和复杂拓扑结构都适合 |
| 安全性 | 更安全 | 没有静态路由安全 |
| 资源占用 | 不需要额外的资源 | 占用CPU、内存和链路带宽 |
| 可预测性 | 总是通过同一路径到达目的地 | 根据当前网络拓扑结构确定路径 | 


# shiny中的路由包shiny.router
## 下载

```
 install.packages("shiny.router").  
```



## 函数



### （1）change_page
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


### （2）disable_bootstrap_on_bookmark
```
注释
当用户打开指定的书签时，此函数会动态删除引导依赖项。 它应该插入到引导页面的头部。
```
```
用法
disable_bootstrap_on_bookmark(bookmark)
# 在书签上抑制 Bootstrap 依赖项。
```
```
示例
disable_bootstrap_on_bookmark("home_page")
```


### （3）get_page
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


### （4）get_query_param
```
注释
检索作为请求页面一部分的任何参数的便利函数。返回的参数值来自[http::parse_url()] 
(https://www.php.net/manual/zh/function.parse-url.php)
也正由于这个原因，只有在url变化后，该函数才能查询在url上变化的参数
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




### （5）is_page
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


### （6）route_link
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


### （7）router_ui
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


### （8）router_server
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


### （9）route
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


### （10）parse_url_path
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



### （11）PAGE_404_ROUTE
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



### （12）page404
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


### （13）make_router
```
[Deprecated] Creates router.
```



## 示例

 

### （1）创建初始应用程序
```
install.packages("rhino")
rhino::init("show")
```


### （2）安装并添加依赖项，同时更新dependencies.R文件
```
rhino::pkg_install(c("shiny.router","shiny","UCSCXenaTools","shinyjs","data.table")) 
#rhino::pkg_remove()删除包与依赖
```


### （3）填充内容

#### 从UCSCXena下载Lung Cancer (Raponi 2006)的phenotype数据集，处理后转换为RData文件，保存于app/logic/Lung Cancer.RData
```
app/logic/aml
# 加载数据文件

a2 <- function() {
  name_data <- paste0(getwd(),"/app/logic/Lung Cancer.RData")
  load(name_data)
  loaded_data <- get("public_clinical")  # 请替换为实际的变量名
  return(loaded_data)
}
```

####  创建首页
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
                          style = "font-size: 1.2em;"), align = "left"))))),            
}
#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
  })}

```

#### cohort页面，使用a2函数读取数据
```
# app/view/cohort.R

# app/view/cohort.R
box::use(
  shiny[moduleServer, NS, fluidRow,column, tags, observeEvent,actionButton, observe,tagList,h3, wellPanel, br, selectInput, h5, p, reactive],
  shiny.router[route_link, get_query_param, parse_url_path,change_page,router_server,get_page,is_page],
)
box::use(
  app/logic/aml1[a2]
)

#' @export
ui <- function(id) {
  ns <- NS(id)
  public_clinical <- a2()
  fluidRow(
    column(3,
           wellPanel(
             h5("Analysis Controls"),
             br(),
             p("Select dataset:"),
             p("Analysis Type"),
             selectInput(
               ns("analysis_type1"),
               selected = "IIb",
               label = NULL,
               choices = public_clinical$Age
             ),
             selectInput(
               ns("analysis_type2"),
               label = NULL,
               choices = public_clinical$OS.time
             ),

             actionButton(inputId = ns("caretdown7"), label = "Change query path"),


           )
    ))

}

#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
      })}
```



### （4）添加404页
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



### （5）将 UI 模块包装在：router_ui
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



### （6）添加按钮跳转导航
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



### （7）读取并显示参数
```
# app/view/cohort.R
box::use(
  shiny[moduleServer, NS, fluidRow, textOutput,column, renderText,tags, observeEvent,actionButton, observe,tagList,h3, wellPanel, br, selectInput, h5, p, reactive, updateSelectInput],
  shiny.router[route_link, get_query_param, parse_url_path,change_page,router_server,get_page,is_page],
)
box::use(
  app/logic/aml1[a2]
)


#' @export
ui <- function(id) {
  ns <- NS(id)
  public_clinical <- a2()
  fluidRow(
    column(3,
           wellPanel(
             h5("Analysis Controls"),
             br(),
             p("Select dataset:"),
             p("Analysis Type"),
             selectInput(
               ns("analysis_type1"),
               selected = "IIb",
               label = NULL,
               choices = public_clinical$Age
             ),
             selectInput(
               ns("analysis_type2"),
               label = NULL,
               choices = public_clinical$OS.time
             ),

             actionButton(inputId = ns("caretdown7"), label = "Change query path"),
           )
    ))

}

#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    router_server()

    observeEvent(input$caretdown7, {

      url_name <- paste0("#!/cohort?","Age=",input$analysis_type1,"&OS.time=",input$analysis_type2)
      change_page(page = url_name)
      
      print(parse_url_path(url_name))
      print(get_page())
      output$text2 <- renderText({ parse_url_path(url_name)$query$Age })
      #parse_url_path必须有一个"url_path"
      output$text3 <- renderText({ get_query_param("Age")})

      output$text4 <- renderText({ get_query_param()[[1]]})


    })
  }
    )}
```
#### 在该页面如何change_page都返回"cohort"



### （8）在url改变参数时改变selectinput
```
# app/view/cohort.R

box::use(
  shiny[moduleServer, NS, fluidRow, textOutput,column, renderText,tags, observeEvent,actionButton, observe,tagList,h3, wellPanel, br, selectInput, h5, p, reactive, updateSelectInput],
  shiny.router[route_link, get_query_param, parse_url_path,change_page,router_server,get_page,is_page],
)
box::use(
  app/logic/aml1[a2]
)
#' @export
ui <- function(id) {
  ns <- NS(id)
  public_clinical <- a2()
  fluidRow(
    column(3,
           wellPanel(
             h5("Analysis Controls"),
             br(),
             p("Select dataset:"),
             p("Analysis Type"),
             selectInput(
               ns("analysis_type1"),
               selected = "IIb",
               label = NULL,
               choices = public_clinical$Age
             ),
             selectInput(
               ns("analysis_type2"),
               label = NULL,
               choices = public_clinical$OS.time
             ),

             actionButton(inputId = ns("caretdown7"), label = "Change query path"),


           )




    ))

}

#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    router_server()

    observeEvent(input$caretdown7, {
      age_data <- input$analysis_type1
      OS.time_data <- input$analysis_type2
      url_name <- paste0("#!/cohort?","Age=",age_data,"&OS.time=",OS.time_data)
      change_page(page = url_name)
       print(parse_url_path(url_name))
       print(get_page())
      output$text2 <- renderText({ parse_url_path(url_name)$query$Age })
      #parse_url_path必须有一个"url_path"
      output$text3 <- renderText({ get_query_param("Age")})

      output$text4 <- renderText({ get_query_param()[[1]]})

    })

    observe({
      age_1 <- get_query_param("Age")
      print(age_1)
      updateSelectInput(session, "analysis_type1", selected = age_1)
    })





  }
    )}

```



### （9）减少输出
#### 该情况下，处于home页面时也会执行该函数并输出
```
# app/view/cohort.R

observe({
        age_1 <- get_query_param("Age")
       updateSelectInput(session,"analysis_type1", selected = age_1)
    })
    
```
#### 添加is_page后在cohort页面才执行该函数并输出
```
# app/view/cohort.R

#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    router_server()

    observeEvent(input$caretdown7, {
      age_data <- input$analysis_type1
      OS.time_data <- input$analysis_type2
      url_name <- paste0("#!/cohort?","Age=",age_data,"&OS.time=",OS.time_data)

      change_page(page = url_name)

      print(parse_url_path(url_name))
      print(get_page())
      output$text2 <- renderText({ parse_url_path(url_name)$query$Age })
      #parse_url_path必须有一个"url_path"
      output$text3 <- renderText({ get_query_param("Age")})

      output$text4 <- renderText({ get_query_param()[[1]]})



    })
    observe({
      if(is_page("cohort")){
        age_1 <- get_query_param("Age")
        print(age_1)
        updateSelectInput(session, "analysis_type1", selected = age_1)}

    })

  }
    )}
```





