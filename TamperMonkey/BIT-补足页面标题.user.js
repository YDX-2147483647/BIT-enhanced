// ==UserScript==
// @name         BIT-补足页面标题
// @namespace    http://tampermonkey.net/
// @version      1.2.11
// @description  修改页面标题
// @license      GPL-3.0-or-later
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://*.bit.edu.cn/*
// @match        http://*.bit.edu.cn/*
// @match        https://www.yanhekt.cn/*
// @exclude      https://lexue.bit.edu.cn/*
// @exclude      https://www.bit.edu.cn/xww/*
// @exclude      https://webvpn.bit.edu.cn/*
// @exclude      http://jxzxehallapp.bit.edu.cn/*
// @exclude      https://jxzxehallapp.bit.edu.cn/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /**
   * @typedef {Object} Site
   * @property {String} host 例：“jwb”“jwb.bit.edu.cn”
   * @property {String[]} title_selectors 优先使用在前面的 selector
   * @property {String?} name 默认从`<title>`获取
   */

  /* spell-checker: disable */

  /** @type {Site[]} */
  const sites = [
    { // 教学中心
      host: 'jxzx',
      title_selectors: [
        '.pageArticle > .articleTitle > h2',
        '.pagelistTitle > h2'
      ]
    },
    { // Information Technology Center
      host: 'itc',
      title_selectors: [
        '.pageArticle > .pageArticleTitle > h3#shareTitle',
        'body > div > div.subPage > div.sub_right > h2',
        'body > div > div.subPage > div > h2'
      ]
    },
    { // 教务处
      host: 'jwc',
      title_selectors: [
        '.pageArticle > .aca_article > h2',
        '.pageArticle > .articleTitle > h2'
      ]
    },
    { // 教务部
      name: '教务部',
      host: 'jwb',
      title_selectors: [
        'h3#shareTitle',
        '.gp-bread + h2.gpColumnTitle'
      ]
    },
    { // World Wide Web
      host: 'www',
      title_selectors: [
        '.subPage > .container > .subRight  > .newsTitle > h1',
        '.subPage > .container > .listTitle02 > h2',
        '.bread > .container > a:nth-last-child(1)'
      ]
    },
    { // I
      host: 'i',
      title_selectors: [
        // 从首页进去，怎么单击都是页面内跳转，URL不变。想检测的话要一直运行这个脚本，干脆算了吧……
        '.special-detail-banner > div > .special-detail-title > h2',
        '.service-name',
        'table.mini-tabs-header > tbody > tr > td.mini-tab-active > span.mini-tab-text'
      ]
    },
    { // 学生事务中心
      host: 'student',
      title_selectors: [
        '#home .page_box .txt > h2',
        '#home .page_box .top > h2'
      ]
    },
    { // 世纪（学生工作部、武装部、心理健康教育与咨询中心）
      host: 'century',
      title_selectors: [
        'h2'
      ]
    },
    { // 徐特立
      host: 'xuteli',
      title_selectors: [
        '.articleTitle h2'
      ]
    },
    { // 延河课堂
      host: 'www.yanhekt.cn',
      title_selectors: [
        '.header-menu .ant-menu-item-selected',
        '#root div[class^=secHeading] > span[class^=title]',
        '[class^=liveHeader], [class^=mobileLiveHeader]',
        '.title-bar > :last-child',
        '.course-intro-title'
      ]
    },
    { // 信息公开
      host: 'xxgk',
      title_selectors: [
        '.pageArticleTitle h3',
        '.gp-subRight .articleTitle02'
      ]
    },
    { // 明德
      host: 'mingde',
      title_selectors: [
        '.pageArticleTitle > h3',
        '.gp-subRight .articleTitle02',
        '.subPage h2'
      ]
    },
    { // 校医院
      host: 'xyy',
      title_selectors: [
        '.rt_tit > h1',
        '.lt_tit > h2'
      ]
    },
    { // School of Information and Electronics
      host: 'sie',
      title_selectors: [
        '.pageArticle > .pageArticleTitle > h3#shareTitle',
        'h2.listTitle',
        '.gp-bread > .gp-container > a:last-child'
      ]
    }
  ]
  /* spell-checker: enable */

  function match_site () {
    const site = sites.find(s => [
            `${s.host}.bit.edu.cn`,
            s.host
    ].includes(window.location.host))

    if (site === undefined) {
      return null
    } else {
      if (!site.name) {
        site.name = document.title
          .match(/(北京)?(理工)?(大学)?(?<name>.+)/)
          .groups.name.trim()
          .replace(/网$/, '')
      }
      return site
    }
  }

  /**
     * @param {Site} site
     * @returns success
     */
  function change_title_for (site) {
    const selector = site.title_selectors.find(s => document.querySelector(s))
    if (!selector) {
      return false
    }

    const title = document.querySelector(selector).textContent
      .replace(/^[>-]/, '').trim()
    if (!title) {
      return false
    }

    document.title = `${title} - ${site.name}${site.name ? ' |' : ''} 北京理工大学`
    return true
  }

  const site = match_site()
  if (site) {
    const success = change_title_for(site)
    if (!success) {
      // 适应 I、延河课堂
      setTimeout(() => change_title_for(site), 1500)
    }
  }
})()
