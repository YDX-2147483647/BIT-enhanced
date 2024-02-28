# BIT-物理实验中心-实验选修

[北京理工大学物理实验选课系统](http://10.133.22.200:7100)不太人性化。如下图，这段脚本可以给满员、冲突的课程上色，方便选课。

![BIT-物理实验中心-实验选修](https://s2.loli.net/2024/02/28/48RTW6QtbCgJs5d.png)

（虽然已经1.1了，但还只能计算并显示，不能自动更新，而需手动**单击对话框标题“实验选修”**来上色。欢迎有志之士前往 [YDX-2147483647/BIT-enhanced](https://github.com/YDX-2147483647/BIT-enhanced) 帮忙实现。）

## 使用方法

一般选课是在“物理实验中心 →（侧边栏）教学选排课 → 我的课程 → 课程选修 → 已选课程列表”左键单击“实验选修”，这时对话框尺寸会很难受。

![BIT-物理实验中心-实验选修-原版](https://s2.loli.net/2024/02/28/iM65pvw97DYjbfa.png)

为此，请**右键**单击“实验选修”，选择“在新标签页中打开链接”（或直接<kbd>Ctrl</kbd>+左键单击）。这样舒服一些，本脚本也只支持如此。

弹出对话框后，请手动**单击对话框标题“实验选修”**来上色。

## 显示颜色

|                          颜色                          | 意义  |
| :----------------------------------------------------: | :---: |
|  <span style='background-color: #FF000040;'>红</span>  | 满员  |
|   <span style='background-color: yellow;'>黄</span>    | 冲突  |
| <span style='background-color: greenyellow;'>绿</span> | 可选  |

另外，<span style='background: linear-gradient(to left, yellow, 20%, #FF000040);'>红黄渐变</span>表示既满员又冲突。

## 配置

您需要自己配置如何判定课程冲突。（若不配置，此脚本也可正常使用。）

1. 安装脚本后，找到这个脚本的编辑页。

2. 修改函数`my_conflict_referee()`中的变量`bans`，或者完全重构`my_conflict_referee()`。

    例如下面这样表示周一第二大节、第四大节，周二第二大节有其它事，冲突。

    ```javascript
    /**
     * 不能上的时间
     * @type {number[][]} [[星期几（1-7）, 第几大节（1-5）]]
     */
    const bans = [
      [1, 2], [1, 4],
      [2, 2],
    ]

    return bans.find(([day, section]) =>
      day === course.class_time.day && section === course.class_time.section)
    ```

    而下面这样表示第8–11周周三第五大节冲突。

    ```javascript
    if (course.class_time.week >= 8 && course.class_time.week <= 11 &&
      course.class_time.day === 3 && course.class_time.section === 5) {
      return true
    } else {
      return false
    }
    ```

    您也可利用`course.class_time`的其它字段，下面是它的例子。

    ```javascript
    {
      week: 11, // 第11周
      day: 7, // 周日
      section: 5, // 第五大节
      date: new Date(), // 某年某月某日
      start: [18, 30], // 18:30开始
      end: [20, 55], // 20:55结束
    }
    ```

    关于如何使用`Date`对象，可参考 [Date - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#examples)。
