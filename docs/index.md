## BIT-enhanced

一些方便大家使用 BIT 相关网站的用户脚本和用户样式表。

### 用户脚本（`TamperMonkey/`）

<ul>
{% for script in site.data.user_scripts.files %}
  <li>
    <p markdown='1'>{{ script.name }}（[安装🡇]({{ site.data.user_scripts.install_url_base }}/{{ script.name }}.user.js)）</p>

    {% if script.brief %}
      <p markdown='1'>{{ script.brief }}</p>
    {% endif %}

    {% if script.description %}
      <details markdown="1">{{ script.description }}</details>
    {% endif %}
  </li>
{% endfor %}
</ul>

### 用户样式（`Stylus/`）

这部分尚无文档，单击链接会跳转至仓库中的源代码。

{% for style in site.data.user_styles.files %}
- [{{ style }}]({{ site.data.user_styles.install_url_base }}/{{ style }})
{% endfor %}
