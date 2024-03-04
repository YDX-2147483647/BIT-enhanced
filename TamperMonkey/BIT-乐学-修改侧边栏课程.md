# BIT-乐学-修改侧边栏课程

北京理工大学的[乐学（Moodle）](https://lexue.bit.edu.cn/)的侧边栏好像是按某种规则挑选出最多 10 个课程。然而它并不能完全猜中，还不时更新，导致每次更新都要改。

这段脚本可以自主定义侧边栏课程。如下图，右侧 InPrivate 窗口是原版，左侧是此脚本修改后的。

![乐学-课程页](https://s2.loli.net/2023/07/14/IfU9DRX8nqO41V5.png)

> 您也可考虑替代方案——在“[个人主页](https://lexue.bit.edu.cn/my/) → 课程概览”可以筛选“进行中”“尚未开始的”或“过去的”课程。

## 配置

您需要自己配置哪些课程要隐藏，哪些要显示。

1. **改为高级配置模式**：前往 TamperMonkey → 设置 → 通用 → 配置模式，选为“高级”。

2. **找到“存储”**：到这个脚本的编辑页，在上边栏切换到“存储”（位置与“编辑器”“设置”并排）。

3. **写入配置**：在“存储”一栏写入 JSON，一般照猫画虎即可。

    例如——

    ```json
    {
        "show": [
            { "name": "信号与系统-实验", "id": "10664", "icon": "signal" },
            { "name": "电磁场与电磁波", "id": "10713", "icon": "globe" }
        ],
        "hide": [
            { "name": "物理实验B-绪论", "id": "7661", "icon": "flask" },
            "更多",
            { "name": "学术用途英语12021-2022-1许子艳", "id": "8751", "comment": "错误课程" },
            "乐学使用简明教程"
        ]
    }
    ```
    - `name`——想显示的课程名。
    - `id`——课程链接最后的id，例如`https://lexue.bit.edu.cn/course/view.php?id=8819`就是`'8819'`。
    - `icon`——FontAwesome v4 的图标名称，默认为`'graduation-cap'`。请参考 [Font Awesome Icons](https://fontawesome.com/v4/icons/) 或 [Font Awesome 中文网](https://fontawesome.com.cn/v4/icons)。

    详情见源代码注释里的`Config`及`CourseDescription`。

## 兼容性

这段脚本与“[BIT-乐学-修改侧边栏课程-GUI](https://greasyfork.org/zh-CN/scripts/488788)”矛盾，同时启用时效果不确定。

- 此脚本能修改图标，GUI版目前还不能；
- GUI版的操作方式远比此脚本直观，直接拖动即可；

欢迎有志之士前往 [YDX-2147483647/BIT-enhanced](https://github.com/YDX-2147483647/BIT-enhanced) 帮忙合并两段脚本。
