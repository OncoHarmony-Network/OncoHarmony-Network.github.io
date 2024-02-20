# 什么是路由？

路由描述的是 URL 与 UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）。

## route 和router区别

- route就是一条路由，它将一个URL路径和一个函数进行映射，例如 `/users  ->  getAllUsers()` `/users/count  ->  getUsersCount()`，当访问 `/users` 的时候，会执行 `getAllUsers()` 函数；当访问 `/users/count` 的时候，会执行 `getUsersCount()` 函数。
- router 可以理解为一个容器，或者说一种机制，它管理了一组 route。简单来说，route 只是进行了URL和函数的映射。而在当接收到一个URL之后，去路由映射表中查找相应的函数，这个过程是由 router 来处理的。 

## 服务器端路由

- 对于服务器来说，当接收到客户端发来的HTTP请求，会根据请求的URL，来找到相应的映射函数，然后执行该函数，并将函数的返回值发送给客户端。
- 对于最简单的静态资源服务器，可以认为，所有URL的映射函数就是一个文件读取操作。对于动态资源，映射函数可能是一个数据库读取操作，也可能是进行一些数据的处理。
- `route("/", shiny::tags$div(shiny::tags$span("Hello world")))`和`route("main", shiny::tags$div(h1("Main page"), p("Lorem ipsum.")))`这里定义了两条路由：当访问 `/` 的时候，会返回一个包含 `"Hello world"` 文本，当访问`main`时，返回一个包含一个主标题和一个段落的 `<div>` 元素。

# 实现shiny的路由包shiny.router

## 下载和安装

```r
install.packages("shiny.router")
```

## 常用函数

### （1）change_page

- 说明：向客户端reactive input binding发送一条消息，告诉page.js相应地更新窗口URL，然后告诉客户端shiny的reactive input binding已经更改，router会收到这个变化的通知，`get_page()`等相似函数也会收到该通知。在链接中添加 `"/#!/"` 前缀

- 用法：

```r
change_page(page, session = shiny::getDefaultReactiveDomain(), mode = "push")
# mode ("replace" or "push")
# session指shiny的用户参数
```

- 示例：

```r
observeEvent(input$go_to_table, {
      change_page("table")
    })
```

### （2）disable_bootstrap_on_bookmark

- 说明：当用户打开指定的书签时，此函数会动态删除引导依赖项。 它应该插入到引导页面的头部。
  
- 用法：

```r
disable_bootstrap_on_bookmark(bookmark)
# 在书签上抑制 Bootstrap 依赖项。
```

- 示例：

```r
observe({
disable_bootstrap_on_bookmark("home_page")
})
```

### （3）get_page

- 说明：该函数提取的是哈希后面的虚拟路径（virtual path）部分。如果输入没有值，即当前页面信息不可用，函数将返回 FALSE。

- 用法：

```r
get_page(session = shiny::getDefaultReactiveDomain())
```

- 示例：

```r
 observe({
        get_page(session)
        })
```

### （4）get_query_param

- 说明：检索作为请求页面一部分的任何参数的便利函数。返回的参数值来自[http::parse_url()](https://www.php.net/manual/zh/function.parse-url.php)也正由于这个原因，只有在url变化后，该函数才能查询在url上变化的参数


- 用法：

```r
get_query_param(field = NULL, session = shiny::getDefaultReactiveDomain())
# field | If provided, retrieve only a param with this name. (Otherwise, return all params)
# session | The Shiny session
```

- 示例：

```r
observe({
page_size <- get_query_param("pageSize")
})
```

### （5）is_page

- 说明：如果我们不在指定的页面上，告诉反应链停止。这会帮助我们确保不会浪费时间为当前未显示的页面重新渲染UI。

- 用法：

```r
is_page(page, session = shiny::getDefaultReactiveDomain(), ...)
# page 参数： 检查当前页面是否为该页面
```

- 示例：

```r
observe({
      if(is_page("cohort")){
         age_1 <- get_query_param("Age")
      }

      })
```

### （6）route_link

- 说明：链接中添加 "/#!/" 前缀

- 用法：

```r
route_link(path)
```

- 示例：

```r
menu <- tags$ul(
    tags$li(a(class = "item", href = route_link("/"), "Main")),
    tags$li(a(class = "item", href = route_link("another"), "Another page")),
)
```

### （7）router_ui

- 说明：创建shiny的ui

- 用法：

```r
router_ui(default, ..., page_404 = page404(), env = parent.frame())
```

- 示例：

```r
 router_ui(
      route("table", table$ui(ns("table"))),
      route("chart", chart$ui(ns("chart"))),
      route("chart", chart$ui(ns("chart")))，
      page_404 = page_404$ui(ns("page_404"))
)
```

### （8）router_server

- 说明：设置shiny的主页面的server和环境

- 用法：

```r
router_server(root_page = "/", env = parent.frame())
```

- 示例：

```r
 router_server("Home") # 主页面
    Home$server("Home")
    cohort$server("cohort")
```

### （9）route

- 说明：创建单独路由

- 用法：
```r
route(path, ui, server = NA)
```

- 示例：

```r
 route("Home", Home$ui(ns("Home")))
```

### （10）parse_url_path

- 说明：提取有关URL路径和跟在问号（?）符号后面的参数的信息。

- 用法：

```r
parse_url_path(url_path)
# 查询的出现在#!的参数可能会导致浏览器刷新
# 返回结果是一个列表，其中包含两个元素：path 和 query。
```

- 示例：

```r
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

```r
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

```r
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

```r
parse_url_path("www.foo.bar/#!/other_page")
$path
[1] "other_page"

$query
NULL
```
```R
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

```r
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

```r
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

- 说明：默认的404页面

- 用法：

```r
PAGE_404_ROUTE
```

- 示例：

```r
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

- 说明：router_ui里的404页面

- 用法：

```r
page404(page = NULL, message404 = NULL)
```

- 示例：

```r
router_ui(
      route("table", table$ui(ns("table"))),
      route("chart", chart$ui(ns("chart"))),
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



## 实例

### （1）创建初始应用程序

```R
install.packages("rhino")
rhino::init("show")
```

### （2）安装并添加依赖项

```R
rhino::pkg_install(c("shiny.router","shiny","UCSCXenaTools","shinyjs","data.table")) 
#rhino::pkg_remove()删除包与依赖
```

### （3）填充内容

#### 从UCSCXena下载Lung Cancer (Raponi 2006)的phenotype数据集，处理后转换为RData文件，保存于`app/logic/Lung Cancer.RData`

![屏幕截图 2024-02-19 205523](https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/136106051/3c8aa903-6b4a-4de3-b99b-056e70ef604a)

```R
# app/logic/aml
# 加载数据文件

a2 <- function() {
  name_data <- paste0(getwd(),"/app/logic/Lung Cancer.RData")
  load(name_data)
  loaded_data <- get("public_clinical")  # 请替换为实际的变量名
  return(loaded_data)
}
```

####  创建首页

```R
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

```R
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

```R
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

### （5）将 UI 模块包装

```R
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

```R
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

```R
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

![1 4](https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/136106051/d7c1544f-7707-4017-bf43-61b06ac054d5)

![image](https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/136106051/3ddf5772-c723-495f-aa79-65bf56cb0ae5)

#### 在该页面如何change_page都返回"cohort"

### （8）在url改变参数时改变selectinput

```R
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

![](https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/136106051/4276e760-0896-4e6d-9a35-6159111faaa0)

### （9）减少输出

#### 该情况下，处于home页面时也会执行该函数并输出

![image](https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/136106051/9a2d2124-69f9-4b79-89dc-6a3cc321bdf4)

```R
# app/view/cohort.R

observe({
        age_1 <- get_query_param("Age")
       updateSelectInput(session,"analysis_type1", selected = age_1)
    })
    
```

#### 添加is_page后在cohort页面才执行该函数并输出

```R
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