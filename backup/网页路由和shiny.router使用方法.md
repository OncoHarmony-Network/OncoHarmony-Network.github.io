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








### shiny.router使用方法

可以使用动态点 （） 以动态方式传递路由。

#### 1、下载

```
 install.packages("shiny.router")
``` 

#### 2、函数

##### （1）、change_page

###### 注释

``` 
向客户端reactive input binding发送一条消息，告诉page.js相应地更新窗口URL，然后告诉客户端shiny的reactive input binding已经更改，router会收到这个变化的通知，get_page()等相似函数也会收到该通知。
在链接中添加 "/#!/" 前缀
``` 

###### 用法

``` 
change_page(page, session = shiny::getDefaultReactiveDomain(), mode = "push")
# mode ("replace" or "push")
# session指shiny的用户参数
``` 

###### 示例

``` 
observeEvent(input$go_to_table, {
      change_page("table")
    })
``` 
##### （2）、disable_bootstrap_on_bookmark

######  注释

``` 
当用户打开指定的书签时，此函数会动态删除引导依赖项。 它应该插入到引导页面的头部。
``` 

###### 用法

``` 
disable_bootstrap_on_bookmark(bookmark)
# 在哪个书签上抑制 Bootstrap 依赖项。

``` 

``` 
disable_bootstrap_on_bookmark("home_page")
``` 

##### （3）、get_page

######  注释

``` 
# 该函数提取的是哈希后面的虚拟路径（virtual path）部分。如果输入没有值，即当前页面信息不可用，函数将返回 FALSE。
``` 

######  用法

``` 
get_page(session = shiny::getDefaultReactiveDomain())
``` 

###### 示例

``` 
get_page(session)
``` 

##### （4）、get_query_param

######  注释

``` 
检索作为请求页面一部分的任何参数的便利函数。返回的参数值来自[http::parse_url()] 
(https://www.php.net/manual/zh/function.parse-url.php)
``` 

###### 用法

``` 
get_query_param(field = NULL, session = shiny::getDefaultReactiveDomain())
# field | If provided, retrieve only a param with this name. (Otherwise, return all params)
# session | The Shiny session

``` 

###### 示例

``` 
page_size <- get_query_param("pageSize")
``` 

##### （5）、is_page

######  注释

``` 
如果我们不在指定的页面上，告诉反应链停止。这会帮助我们确保不会浪费时间为当前未显示的页面重新渲染UI。
``` 

###### 用法

``` 
is_page(page, session = shiny::getDefaultReactiveDomain(), ...)
# page 参数： 检查当前页面是否为该页面
``` 

###### 示例

``` 
is_page("home", session)
``` 


##### （6）、route_link

######  注释

``` 
在链接中添加 "/#!/" 前缀
``` 

######  用法

``` 
route_link(path)
``` 

######  示例

``` 
menu <- tags$ul(
    tags$li(a(class = "item", href = route_link("/"), "Main")),
    tags$li(a(class = "item", href = route_link("another"), "Another page")),
)
``` 

##### （7）、router_ui

######  注释

``` 
创建shiny的ui
``` 

######  用法

``` 
router_ui(default, ..., page_404 = page404(), env = parent.frame())
``` 

######  示例

``` 
 router_ui(
      route("table", table$ui(ns("table"))),
      route("chart", chart$ui(ns("chart"))),
      route("chart", chart$ui(ns("chart")))，
      page_404 = page_404$ui(ns("page_404"))
)
``` 

##### （8）、router_server

``` 
设置shiny的主页面和环境
``` 

######  用法

``` 
router_server(root_page = "/", env = parent.frame())

``` 

######  示例

``` 
 router_server("/")

``` 

##### （9）、route

``` 
创建单独路由
``` 

######  用法

``` 
route(path, ui, server = NA)

``` 

######  示例

``` 
 route("/", intro$ui(ns("intro")))
``` 

##### （10）、parse_url_path

######  注释
``` 
提取有关URL路径和跟在问号（?）符号后面的参数的信息。
``` 

######  用法

``` 
parse_url_path(url_path)
# 查询的出现在#!的参数可能会导致浏览器刷新
# 返回结果是一个列表，其中包含两个元素：path 和 query。
``` 

######  示例

``` 
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


##### （11）、PAGE_404_ROUTE

######  注释

``` 
默认的404页面
``` 

######  用法

``` 
PAGE_404_ROUTE
``` 

######  示例

``` 
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

![image](https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/136106051/ef30b713-3bce-499b-88ce-48253720234e)



##### （12）、page404

######  注释

``` 
router_ui里的404页面
``` 

######  用法

``` 
page404(page = NULL, message404 = NULL)
``` 

######  示例

``` 
 
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


##### （13）、make_router

```
[Deprecated] Creates router.
```

####  4、示例

##### 示例一

###### 1、创建初始应用程序

```
install.packages("rhino")
rhino::init("rhino_router")
```

###### 2、安装依赖

```
renv::install(c("dplyr", "echarts4r", "htmlwidgets", "reactable", "tidyr", "shiny.router")) 
``` 

######  3、更改dependencies.R文件，添加新的依赖项

``` 
# dependencies.R

# This file allows packrat (used by rsconnect during deployment) to pick up dependencies.
library(dplyr)
library(echarts4r)
library(htmlwidgets)
library(reactable)
library(rhino)
library(tidyr)
library(shiny.router)
``` 

######  4、更新文件：renv.lock

``` 
renv::snapshot()
``` 
######  5、填充内容

设置图标格式

``` 
# app/logic/chart_utils.R

box::use(
  htmlwidgets[JS],
)

#' @export
label_formatter <- JS("(value, index) => value")
``` 

``` 
# app/logic/data_transformation.R

box::use(
  dplyr[arrange],
  tidyr[pivot_wider],
)

#' @export
transform_data <- function(data) {
  pivot_wider(
    data = data,
    names_from = Species,
    values_from = Population
  ) |>
    arrange(Year)
}
``` 

``` 
# app/view/table.R

box::use(
  reactable,
  shiny[h3, moduleServer, NS, tagList],
)
box::use(
  app/logic/data_transformation[transform_data],
)

#' @export
ui <- function(id) {
  ns <- NS(id)

  tagList(
    h3("Table"),
    reactable$reactableOutput(ns("table"))
  )
}

#' @export
server <- function(id, data) {
  moduleServer(id, function(input, output, session) {
    output$table <- reactable$renderReactable(
      data |>
        transform_data() |>
        reactable$reactable()
    )
  })
}
``` 

两个页面

``` 
# app/view/chart.R

box::use(
  echarts4r,
  shiny[h3, moduleServer, NS, tagList],
)
box::use(
  app/logic/chart_utils[label_formatter],
)

#' @export
ui <- function(id) {
  ns <- NS(id)

  tagList(
    h3("Chart"),
    echarts4r$echarts4rOutput(ns("chart"))
  )
}

#' @export
server <- function(id, data) {
  moduleServer(id, function(input, output, session) {
    output$chart <- echarts4r$renderEcharts4r(
      data |>
        echarts4r$group_by(Species) |>
        echarts4r$e_chart(x = Year) |>
        echarts4r$e_line(Population) |>
        echarts4r$e_x_axis(
          Year,
          axisLabel = list(
            formatter = label_formatter
          )
        ) |>
        echarts4r$e_tooltip()
    )
  })
}
``` 





###### 6、将 UI 模块包装在：router_ui

``` 
# app/main.R

# 导入功能
box::use(
  shiny[bootstrapPage, moduleServer, NS],
  shiny.router[router_ui, router_server, route]
)
# 添加导航栏
box::use(
  app/view/intro,# 简介跳转按钮页面
  app/view/chart,
  app/view/table,
  app/view/page_404
)

#' @export
ui <- function(id) {
  ns <- NS(id)
# 导航栏
bootstrapPage(
    tags$nav(
      class = "navbar",
      tags$ul(
        class = "nav navbar-nav",
         tags$li(
          a("Home", href = route_link("/"))
        ),
        tags$li(
          a("Table", href = route_link("table")) # 创建一个包含链接的HTML列表项
        ),
        tags$li(
          a("Chart", href = route_link("chart"))
        )，
      )
    ),
    router_ui(
      route("table", table$ui(ns("table"))),
      route("chart", chart$ui(ns("chart"))),
      route("chart", chart$ui(ns("chart")))，
      page_404 = page_404$ui(ns("page_404"))
)
  )
}

#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    router_server("table") # router_server("table") 设置默认的路由为 "table"

    # Datasets are the only case when you need to use :: in `box`.
    # This issue should be solved in the next `box` release.
    data <- rhino::rhinos # 加载了 rhino::rhinos 数据集
    intro$server("intro")
    table$server("table", data = data)
    chart$server("chart", data = data) # 调用了 table$server 和 chart$server 分别初始化了表格和图表的服务器逻辑
  })
}
``` 

###### 7、添加按钮跳转导航

``` 
# app/view/intro.R

box::use(
  shiny[actionButton, column, div, fluidRow, h2, moduleServer, NS, observeEvent],
  shiny.router[change_page],
)

#' @export
ui <- function(id) {
  ns <- NS(id)
  fluidRow(
    column(
      width = 6,
      div(
        class = "jumbotron",
        h2("Click this button to check out the table:"),
        actionButton(
          inputId = ns("go_to_table"),
          label = "Table",
          class = "btn-primary btn-lg"
        )
      )
    ),
    column(
      width = 6,
      div(
        class = "jumbotron",
        h2("Click this button to check out the chart:"),
        actionButton(
          inputId = ns("go_to_chart"),
          label = "Chart",
          class = "btn-primary btn-lg"
        )
      )
    )
  )
}

#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    observeEvent(input$go_to_table, {
      change_page("table")
    })

    observeEvent(input$go_to_chart, {
      change_page("chart")
    })
  })
}
``` 

###### 8、更改页面大小将修改显示的查询参数
``` 
# app/view/table.R

box::use(
  reactable,
  shiny[h3, moduleServer, NS, observeEvent, reactive, req, tagList],
  shiny.router[change_page, get_query_param],
)

box::use(
  app/logic/data_transformation[transform_data],
)

#' @export
ui <- function(id) {
  ns <- NS(id)

  tagList(
    h3("Table"),
    reactable$reactableOutput(ns("table"))
  )
}

#' @export
server <- function(id, data) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
# get_query_param从 URL 读取查询参数
    page_size <- reactive({
      page_size <- get_query_param("pageSize")

      if (is.null(page_size)) {
        page_size <- 10
      }

      as.numeric(page_size)
    })

    output$table <- reactable$renderReactable({
      data |>
        transform_data() |>
        reactable$reactable(
          # 读取参数，然后将该值传递到表中以设置行数
          defaultPageSize = page_size(),
          # 使用表格下拉列表更改页面大小
          showPageSizeOptions = TRUE,
          pageSizeOptions = c(5, 10, 15, 20, page_size()) |>
            unique() |>
            sort()
        )
    })
# 监视 reactable 表格的分页大小变化，如果发生变化，将修改显示的查询参数使用表格下拉列表更改页面大小，url更新查询参数
    observeEvent(reactable$getReactableState("table", "pageSize"), {
      table_page_size <- reactable$getReactableState("table", "pageSize")

      if (table_page_size != page_size()) {
        change_page(paste0("table?pageSize=", table_page_size))
      }
    })
  })
}
``` 
###### 9、添加404页

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








##### 示例二

###### 创建子页面 home 和 another

``` 
home_page <- div(
  titlePanel("Home page"),
  p("This is the home page!"),
  uiOutput("power_of_input")
)

another_page <- div(
  titlePanel("Another page"),
  p("This is the another page!"),
)
``` 

######  创建菜单
>  [!TIP]
>  ``` 
>  menu <- tags$ul(
>    tags$li(a(class = "item", href = route_link("/"), "Main")),
>    tags$li(a(class = "item", href = route_link("another"), "Another page")),
>  )
>  ``` 


``` 
ui <- fluidPage(
  menu,
  tags$hr(),
  router_ui(
    route("/", home_page),
    route("another", another_page)
  ),
  sliderInput("int", "Choose integer:", -10, 10, 1, 1),
)

server <- function(input, output, session) {
 router_server()
 ``` 

>  [!TIP] 
>    ``` 
>   # 可以使用add 参数来动态地改变页面上某些内容或功能
>    component <- reactive({
>      if (is.null(get_query_param()$add)) {
>        return(0)
 >     }
 >     as.numeric(get_query_param()$add)
>    })
>  
>    output$power_of_input <- renderUI({
>      HTML(paste(
>        "I display input increased by <code>add</code> GET parameter from app url and pass result to >  >  
>     <code>output$power_of_input</code>: ",
>        as.numeric(input$int) + component()))
>    })
>  }
>  ``` 

###### 运行

``` 
shinyApp(ui, server)
``` 

![image](https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/136106051/64e9ff12-2d57-4905-8371-0a94450f396f)

![image](https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io/assets/136106051/3fad4b9a-ff72-4244-adab-358638b33a06)

# 示例三

``` 
library(shiny)
library(shiny.router)

# This generates menu in user interface with links.
menu <- tags$ul(
  tags$li(a(class = "item", href = route_link("/"), "Page")),
  tags$li(a(class = "item", href = route_link("other"), "Other page")),
  tags$li(a(class = "item", href = route_link("third"), "A third page"))
)
``` 

>  [!TIP]
>  ```
>  # This creates UI for each page.
>   page <- function(title, content, table_id) {
>     div(
>       menu,
>       titlePanel(title),
>       p(content),
>       dataTableOutput(table_id)
>     )
>   }
>  ``` 

``` 
# Both sample pages.
root_page <- page("Home page", "Welcome on sample routing page!", "table_one")
other_page <- page("Some other page", "Lorem ipsum dolor sit amet.", "table_two")
third_page <- div(menu, titlePanel("Third Page"))

# Make output for our router in main UI of Shiny app.
ui <- fluidPage(
  router_ui(
    route("/", root_page),
    route("other", other_page),
    route("third", third_page)
  )
)

# Plug router into Shiny server.
server <- shinyServer(function(input, output, session) {
  router_server()

  output$table_one <- renderDataTable({
    data.frame(x = c(1, 2), y = c(3, 4))
  })

  output$table_two <- renderDataTable({
    data.frame(A = c("a", "a"), B = c("b", "b"))
  })
})

# Run server in a standard way.
shinyApp(ui, server)
``` 

# 示例四

``` 
library(shiny)
library(shiny.router)
library(rlang)

# This generates menu in user interface with links.
menu <- tags$ul(
  tags$li(a(class = "item", href = route_link("/"), "Page")),
  tags$li(a(class = "item", href = route_link("other"), "Other page")),
  tags$li(a(class = "item", href = route_link("third"), "A third page"))
)

# This creates UI for each page.
page <- function(title, content, table_id) {
  div(
    menu,
    titlePanel(title),
    p(content),
    dataTableOutput(table_id)
  )
}

# Both sample pages.
root_page <- page("Home page", "Welcome on sample routing page!", "table_one")
other_page <- page("Some other page", "Lorem ipsum dolor sit amet.", "table_two")
third_page <- div(menu, titlePanel("Third Page"))

# create the list of routes
routes <- list(
  route("other", other_page),
  route("third", third_page)
)
``` 
Make output for our router in main UI of Shiny app.
using dynamic dots
>  [!TIP]
>  ```
> ui <- fluidPage(
>   router_ui(
>     route("/", root_page),
>     !!!routes
>   )
> )
```

# Plug router into Shiny server.
server <- shinyServer(function(input, output, session) {
  router_server()

  output$table_one <- renderDataTable({
    data.frame(x = c(1, 2), y = c(3, 4))
  })

  output$table_two <- renderDataTable({
    data.frame(A = c("a", "a"), B = c("b", "b"))
  })
})

# Run server in a standard way.
shinyApp(ui, server)
``` 

# 示例五

``` 
library(shiny)
library(shiny.router)

# This generates menu in user interface with links.
menu <- tags$ul(
  tags$li(a(class = "item", href = route_link("/"), "Page")),
  tags$li(a(class = "item", href = route_link("second"), "Second page")),
  tags$li(a(class = "item", href = route_link("third"), "A third page"))
)

# This creates UI for each page.
page <- function(title, content, id) {
  ns <- NS(id)
  div(
    titlePanel(title),
    p(content),
    textOutput(ns("click_me"))
  )
}

# Both sample pages.
root_page <- page("Home page", "Converted number of clicks", "root")
second_page <- page("Second page", "Converted number of clicks", "second")
third_page <- page("Third page", "Converted number of clicks", "third")

server_module <- function(id, clicks, power = 1) {
  moduleServer(id, function(input, output, session) {
    output$click_me <- renderText({
      as.numeric(clicks())^power
    })
  })
}

# Create output for our router in main UI of Shiny app.
ui <- fluidPage(
  menu,
  actionButton("clicks", "Click me!"),
  router_ui(
    route("/", root_page),
    route("second", second_page),
    route("third", third_page)
  )
)

# Plug router into Shiny server.
server <- function(input, output, session) {
  router_server()

  clicks <- reactive({
    input$clicks
  })
``` 
>  [!TIP]
>  ``` 
>   server_module("root", clicks = clicks)
>    server_module("second", clicks = clicks, power = 2)
>    server_module("third", clicks = clicks, power = 3)
>  }
>  ``` 

``` 
# Run server in a standard way.
shinyApp(ui, server)
```


            