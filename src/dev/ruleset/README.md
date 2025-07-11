# 规则集

用户可以通过规则集调用和组合一系列的规则来灵活地在不同场景下让 ClassIsland 做出不同的响应。本文将介绍规则集的基本概念、架构和工作方式。

## 架构

``` mermaid
graph LR
    B -->|判断规则| C1 -->|返回结果| B
    B -->|判断规则| C2 -->|返回结果| B
    A1[规则集调用方1] -->|调用| B
    A2[规则集调用方2] -->|调用| B
    
    %% 规则集服务
    subgraph 规则集服务
    B[判断规则集是否成立]
    E["规则状态变化事件(StatusUpdated)"]
    F
    end
    
    %% 规则集服务的返回
    B -->|返回结果| A1
    B -->|返回结果| A2
    
    %% 规则提供方1
    subgraph 规则提供方1
    C1[规则集处理程序]
    D1[规则状态变化]
    end
    
    %% 规则提供方2
    subgraph 规则提供方2
    C2[规则集处理程序]
    D2[规则状态变化]
    end
    
    %% 规则判断和状态变化
    D1 -->|通知| F["NotifyStatusChanged()"] --> E
    D2 -->|通知| F --> E
    E -->|通知| A1
    E -->|通知| A2
```

如图，规则集的 API 主要分为两部分：规则集调用方和规则提供方。顾名思义，规则集调用方接受用户设置的规则集，并调用规则集服务判断规则集是否成立，而规则提供方负责判断某个规则是否成立。

当规则提供方所提供的规则状态发生变化时，比如在规则【前台窗口标题】中，系统焦点窗口发生变化时，会通知规则集服务，此时规则集服务会通过 StatusUpdated 事件通知各个规则集调用方。规则集调用方需要订阅这个事件，并在收到这个事件时重新检查规则集状态。这样就可以比较实时地响应规则变化。

以上二者实现上基本独立，各自只需关心自己的实现。规则集服务负责根据规则集调用各个规则提供方，并判断规则是否成立。

## 目录

本部分包含以下内容：

- []