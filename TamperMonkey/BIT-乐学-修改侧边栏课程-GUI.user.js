// ==UserScript==
// @name         乐学侧边栏课程修改
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  修改侧边栏显示的课程
// @author       CJJ
// @match        *://lexue.bit.edu.cn/*
// @icon         data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABILAAASCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtHBdALRwXwC1bk0ntW5NzbVuTaa1bk1ftW5OJrVvTwa0cFsAtHBdALRwYQC0cGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVvVAC1b1YAtW9YALRwWwC1cGQAtHBcArVuTSe1bk3otW5N/7VuTvi1b1HetW9VrbRvWXC0cF03tHBgEbRydwC0cWsAtHFuALRycQCzcnMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtW9NALVvVQe1b1ghtHBbU7RwXY+0cF86tW5LJLVuTee1bk//tW9S/7VvVf+0b1n/tHBc/7RwYO+0cGPJtHFnkLRxalK0cW0htHJuBbRzeACzc3kAs3N8ALN0fwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1b1UttW9XnbRwWuG0cF39tHBh/7RwY1S1bk0jtW9R57VvVP+1b1f/tHBb/7RwXv+0cGH/tHFk/7RxZ/+0cWr/tHFt+rRycN+zcnOutHN2cLNzeTezc3sQr3SOALJ0hQCydIgAsnSKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVvVgu0b1k+tHBei7RwYtK0cWX3tHFnVLVvUiO1b1bntG9Z/7RwXf+0cGD/tHBj/7RxZv+0cWn/tHFs/7Rybv+zcnH/s3J0/7Nzdv+zc3n/s3N777N0f8iydIKPsnSEUbJ0hyCydIkGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtW9WALRvWQC0cEsAtHFlGLRxaFK0cWsptG9YJLRwW+a0cF7/tHBi/7RxZP+0cWf/tHFq/7Rxbf+0cnD/s3Jy/7Nydf+0c3j/s3N6/7N0ff+zdID/snSC/7J0hP+ydIf6snSK3bJ1jLK1bk0AtW5NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALRwYgC0cWQAtHFnALRxaQC0cFwKtHBfXLRwYqy0cWbltHFp/7RxbP+0cm//s3Jx/7NydP+zc3b/s3N5/7Nze/+zdH7/snSB/7J0g/+ydIb/snSI/7J1i/+ydY3/sXWP/7VuTQC1bk0AtW5NALVuTQC1bk8AtG5TAAAAAAAAAAAAAAAAAAAAAAC0cWwAtHFxALRwXAC0cF0AtHFoBrRxaSq0cWxrtHJvtbNycuuzcnX/tHN4/7Nzev+zdH3/s3SA/7J0gv+ydIX/snSH/7J0iv+ydYz/snWO/7F1kP+xdpP/tW5NlLVuTWa1bk06tW5NGLVuTAW0blkAs25bALNuXgCzbmIAs25lALNvaAAAAAAAAAAAALRvYgC0cWUAtHFoALRxagCzcnMJs3J1M7RzeHyzc3vHs3R+9rJ0gf+ydIP/snSG/7J0iP+ydYv/snWN/7F1j/+xdZL/sXaU/7F2lv+1bk3/tW5N/7VuTfG1bk7WtG5Sr7RuVoCzblpRs25eKbNuYQ67cSIAsm5sALJubQCxbnYAsW51ALBudwAAAAAAtHJvALNycgCzcnUAtHN0ALN0fhKydIFMsnSEo7J0h+qydIr/snWM/7J1jv+xdZD/sXaT/7F2lf+xdpf/sXaa/7VuTf+1bk3/tW5P/7RuU/+0blb/tG5a/7NuXfqzbmHns25lxrNuaJqybmtosm5tGrFudQGybnACsG57AK9ufQCvboAArm6DAK5thQCzc3sAs3R+ALJ0gACydYkFsnSKN7J1jJ+xdY/0sXWS/7F2lP+xdpb/sXaZ/7F3m/+xd53/tW5O/7RuUf+0blX/tG5Y/7NuXP+zbl//s25i/7NuZf+zbmj/sm5r/7Jubv2xbm9SsW52GrBud5ewbnp2sG59RK9ugB2uboEGrW2JAK1tigCsbY0ArG2PALJ1hwCydIkAsXWRB7F2k2GxdpXrsXaX/7F3mv+xd5z/sXee/7B3oP+0blP/tG5W/7RuWv+zbl3/s25h/7NuZP+zbmf/sm5q/7JubP+xbm//sW5y/bFudFOwbnkjsG5667BufP+vbn/2rm6C3K5uhbGtbod6rW2KQ6xtjRusbZAEAAAAAAAAAACxdY8AsXifAbF2mYmxd5v/sXed/7B3n/+wd6L/sHij/7RuWP+zblz/s25f/7NuYv+zbmb/s25o/7Jua/+ybm7/sW5x/7FudP+xbnb8sG54U69ufSOvbn7nr26B/65ug/+uboX/rW2H/61tiv+sbYznrG2OhKxtkBUAAAAAAAAAAAAAAACwd54AsXedW7F3nv6wd6D/sHij/7B4pf+weKf/s25e/7NuYf+zbmT/s25n/7Juav+ybmz/sW5v/7Fucv+xbnX/sG53/7BuevywbntTrm6BI65ugueuboT/rW6G/61tif+tbYv/rG2N2qxtjlGsbY8LrG2QALF3nQCxd58AsHegALB3oAqwd6ChsHei/7B4pP+weKb/sHio/7B4qv+zbmP/s25m/7NuaP+ybmv/sm5u/7Fucf+xbnT/sW52/7Buef+wbnv/r25+/K9uf1OuboUjrm6F561th/+tbYr/rG2N/6xtj/msbZBdrG2NAKxtjwCxd6IAsnebA7F3nhSwd6BAsHehobB4o/iweKX/sHin/7B4qf+weKv/sHmt/7NuZ/+ybmr/sm5s/7Fub/+xbnL/sW51/7BueP+wbnr/sG59/69uf/+uboL8rm6DU61tiCOtbYnnrW2L/6xtjv+sbZD/q22S76ttkzGqbJkAAAAAALF3nCyxd56gsHeg0rB4ovKweKT/sHim/7B4qP+weKr/sHms/7B5rv+vebD/sm5r/7Jubv+xbnH/sW50/7Fudv+wbnn/sG57/69ufv+uboH/rm6D/65uhfytboZTrW2MI6xtjeesbY//rG2R/6ttk/+rbZX8qm2XdaxthwGpbKEAsXedDrB3oGaweKLOsHil/bB4p/+weKn/sHir/7B5rf+wea//r3mx/695s/+xbnD/sW5y/7Fudf+wbnj/sG56/7Buff+vbn//rm6C/65uhP+tbob/rW2J/K1tilOsbZAjrG2Q56ttkv+rbZT/q22W/6psmf+qbJvqqmyeaKlsoAuqbqUArnOgALB4pRiweKdnsHiqwLB4rPWwea//r3mw/695sv+verT/r3q2/7FudP+xbnb/sG55/7Bue/+vbn7/rm6B/65ug/+uboX/rW2H/61tiv+sbY38rG2OU6ttkyOrbZPnq22V/6ptmP+qbJr/qmyc/6psnv+pbKH3qWyjr6hspkuoa6gOqm+rAKtxqgCweawOsHmvSa95sZyvebPer3q1/a96t/+vern/sG54/7Buev+wbn3/r25//65ugv+uboT/rW6G/61tif+tbYv/rG2O/6xtkPysbZFTq22WI6ttl+eqbJn/qmyb/6psnf+pbKD/qWyi/6lspP+obKb/qGuo9adrq8Cna61ypmqvLqVosQircbIAlU24AK96tSKverdkr3q6r696vOOwbnz/r25+/65ugf+uboP/rm6F/61th/+tbYr/rG2N/6xtj/+sbZH/q22T/KttlVOqbJkjqmya56psnP+qbJ7/qWyh/6lso/+obKX/qGyn/6hrqf+na6v/p2ut/6Zqr/+marHppmqzt6Vptnelabg7o2e6EbB9uADAlbgDr3y9I69ugP+uboL/rm6E/61uhv+tbYn/rW2L/6xtjv+sbZD/q22S/6ttlP+rbZf8qm2YU6psnSOqbJ3nqWyg/6lsov+pbKT/qGym/6hrqP+na6r/p2us/6dqrv+marD/pmqy/6VqtP+labb/pWm4/6RpuvGkaLzOo2i+m6JnwGKhZsIzrm6D/65uhf+tbYj/rW2K/6xtjf+sbY//rG2R/6ttk/+rbZb/qm2Y/6psmvyqbJtTqWygI6lsoeepbKP/qGyl/6hsp/+oa6n/p2ur/6drrf+maq//pmqx/6Zqs/+larX/pWm3/6Rpuf+kaLr/pGi8/6Novv+iZ8D/omfC/qJmw++tbof/rW2J/61ti/+sbY7/rG2Q/6ttkv+rbZX/q22X/6psmf+qbJv/qmyd/KpsnlOpbKQjqWyk56hspv+oa6j/p2uq/6drrP+naq7/pmqw/6Zqsv+larT/pWm2/6VpuP+kabn/pGi7/6Novf+iZ7//omfB/6Jmw/+iZsT/oWbG/61tiv+sbY3/rG2P/6xtkf+rbZP/q22W/6ptmP+qbJr/qmyc/6psnv+pbKH8qWyiU6hspyOoa6jrqGup/6drq/+na63/pmqv/6Zqsf+marP/pWq1/6Vpt/+kabn/pGi6/6RovP+jaL7/omfA/6Jnwv+iZsT/ombF/6Fmx/+gZcj/rG2O/6xtkP+rbZL/q22V/6ttl/+qbJn/qmyb/6psnf+pbKD/qWyi/6lspPyobKVRqGupEKdrqpena6zWp2qu9qZqsP+marL/pWq0/6Vptv+labj/pGm6/6Rou/+jaL3/ome//6Jnwf+iZsP/ombE/6Fmxv+hZcj/oGXJ/6Bly/+sbZH/q22T/6ttlv+qbZj/qmya/6psnP+qbJ//qWyh/6lso/+obKX/qGyn/6drqomna60ipmuuBadqrhqmarBHpmqyhKVqtb+labfppGm5/qRou/+kaLz/o2i+/6JnwP+iZ8L/ombE/6Jmxf+hZsf/oGXJ/6Blyv+fZMz/n2TN/6ttlf+rbZf/qmyZ/6psm/+qbJ3/qWyg/6lsov+pbKT/qGym/6hrqPena6rXp2usn6dqrUena64Fp2quAKZqsACnaq8ApWm3C6RpuC6kaLtlo2i9o6Jnv9eiZ8H3ombD/6JmxP+hZsb/oWXI/6Blyf+gZcv/n2TN/59kzv+fY9D/qmyY/6psmv+qbJz/qmyf/6lsof+pbKP+qGyl6qhsp8Coa6iFp2uqSKdrqxqnaq4Dp2utAKdrrgAAAAAAAAAAAKVqtAClabYApGm4AKRpugChZ8IDomfBGqJmw0iiZsWFoWbHwKBlyeqgZcr+n2TM/59kzf+fZM//n2PR/55i0v+qbJz/qmyd/6lsoPWpbKLWqWyjo6hspWWobKcvqGupDKhspwCna6oAp2urAKdrrACnaq0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApGi8AKNovgCiZ8AAomfCAKJnwgCgZckMoGXKL59kzGWfZM6jn2PQ1p5j0vWeYtP/nWLV/6psntapbKCYqWyiU6lsox+obKYDqGylAKhspgCoa6gAqGupAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoWbGAKBlyACgZcoAoGXLAJ9k0gOfY9IfnmLTU51i1ZidYdfW//A////gB//8AAB//AAAD/wAAAD/gAAA//AAAP/8AAAH/4AAAD/wAAAD/AAAAD8AAAADgAAAA8AAAAOAAAAcAAAAGAAAAAgAAAAGAAAAAYAAAAAwAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAD/AAAP//AAf//+A=
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(async function () {
  'use strict'
  /* global GM_getValue */
  /* global GM_setValue */
  /* global GM_registerMenuCommand */

  let dragsrc = null
  let shown_courses = await GM_getValue('lexue_shown_courses')
  let hidden_courses = await GM_getValue('lexue_hidden_courses')
  const popup_cover = document.createElement('div')
  const popup = document.createElement('div')
  popup_cover.style = 'width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;inset:0px;z-index:2000'

  function rewrite_sidebar (shown_courses) {
    const current_id = (location.href.match(/(?<=id=)\w+/) || [])[0]
    const mycourses = document.querySelector('li:has([data-key="mycourses"])')
    const sidebar_course_list = mycourses.parentNode

    let node = mycourses.nextSibling
    while (node) {
      node.parentNode.removeChild(node)
      node = mycourses.nextSibling
    }

    for (let i = 0; i < shown_courses.length; i++) {
      const classList = (current_id === shown_courses[i][0] ? ['list-group-item-action active active_tree_node ', 'font-weight-bold '] : ['', ''])
      sidebar_course_list.innerHTML += `<li>
                        <a class="list-group-item list-group-item-action  ${classList[0]}" href="https://lexue.bit.edu.cn/course/view.php?id=${shown_courses[i][0]}" data-key="${shown_courses[i][0]}" data-isexpandable="1" data-indent="1" data-showdivider="0" data-type="20" data-nodetype="1" data-collapse="0" data-forceopen="0" data-isactive="0" data-hidden="0" data-preceedwithhr="0" data-parent-key="">
                            <div class="ml-1">
                                <div class="media">
                                        <span class="media-left">
                                            <i class="icon fa fa-graduation-cap fa-fw " aria-hidden="true"></i>
                                        </span>
                                    <span class="media-body ${classList[1]}">${shown_courses[i][1]}</span>
                                </div>
                            </div>
                        </a>
                    </li>`
    }
  }

  function openPopup () {
    popup.style = 'background-color:white;color:black;box-shadow:rgb(153,153,153) 0px 0px 2px;transform:translate(-50%,-50%);position:fixed;border:3px solid rgba(0,0,0,0.6);font-size:16px;overflow:hidden;z-index:3000;left:50%;top:50%;width:70%;text-align:center;'
    popup.innerHTML = `<style>
#popup_title{
    width:100%;
    height:40px;
    line-height:40px;
    box-sizing:border-box;
    background-color:rgb(255,77,64);
    color:rgb(255,255,255);
    font-weight:700;
    font-size:20px;
    cursor:move;
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
#close_popup{
    text-decoration:none;
    color:rgb(255,255,255);
    position:absolute;
    right:10px;
    top:0px;
    font-size:25px;
    display:inline-block;
    cursor:pointer;
}
ul#shown_courses,ul#hidden_courses{
    width:45%;
    height:60vh;
    display:inline;
    position:relative;
    background-color: #dddddd;
    border: 1px solid #000;
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    overflow-y:scroll;
    overflow-x:hidden;
    scrollbar-width: none;/* 兼容火狐 */
    -ms-overflow-style: none;/* 兼容IE10+ */
    text-align:center;
    word-break:break-all;
    list-style: none;
    padding-left: 0;
}
ul#shown_courses::-webkit-scrollbar,ul#hidden_courses::-webkit-scrollbar{
    width: 0px;/* 兼容火狐 */
}
ul#shown_courses>li,ul#hidden_courses>li,div.table-title{
    cursor:grab;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid #000;
    width: 100%;
    text-align: center;
}
</style><div id="popup_title">编辑侧边栏课程
<div id="close_popup">×</div>
</div>
通过拖动来归类和排序
<div style="display:flex;justify-content:center;">
<div style="width:45%;font-size:16px;">显示的课程</div>
<div style="width:45%;font-size:16px;">隐藏的课程</div>
</div>
<div style="display:flex;justify-content:center;">
<ul id="shown_courses"></ul>
<ul id="hidden_courses"></ul>
</div>
<button id="rewrite_sidebar" style="margin:1% 1% 1% 1%;">完成</button></div>`
    popup.querySelector('#close_popup').onclick = () => closePopup()
    popup.querySelector('#rewrite_sidebar').onclick = () => {
      closePopup()
      shown_courses = []
      hidden_courses = []
      const shown_lis = popup.querySelectorAll('#shown_courses>li')
      const hidden_lis = popup.querySelectorAll('#hidden_courses>li')
      for (let i = 0; i < shown_lis.length; i++) {
        shown_courses.push([shown_lis[i].dataset.id, shown_lis[i].innerText])
      }
      for (let j = 0; j < hidden_lis.length; j++) {
        hidden_courses.push([hidden_lis[j].dataset.id, hidden_lis[j].innerText])
      }
      GM_setValue('lexue_shown_courses', shown_courses)
      GM_setValue('lexue_hidden_courses', hidden_courses)
      rewrite_sidebar(shown_courses)
    }
    popup.querySelector('#shown_courses').addEventListener('dragover', function (e) {
      e.preventDefault()
    })
    popup.querySelector('#shown_courses').addEventListener('drop', function (e) {
      e.preventDefault()
      this.append(dragsrc)
    })
    popup.querySelector('#hidden_courses').addEventListener('dragover', function (e) {
      e.preventDefault()
    })
    popup.querySelector('#hidden_courses').addEventListener('drop', function (e) {
      e.preventDefault()
      this.append(dragsrc)
    })
    for (let i = 0; i < shown_courses.length; i++) {
      const shown_li = document.createElement('li')
      shown_li.setAttribute('data-id', shown_courses[i][0])
      shown_li.draggable = 'true'
      shown_li.addEventListener('dragstart', function (e) {
        dragsrc = this
      })
      shown_li.addEventListener('dragover', function (e) {
        e.preventDefault()
      })
      shown_li.addEventListener('drop', function (e) {
        e.stopPropagation()
        if (this !== dragsrc) {
          if (this.parentNode === dragsrc.parentNode && this.offsetTop > dragsrc.offsetTop) {
            this.parentNode.insertBefore(dragsrc, this.nextSibling)// if this.nextSibling===null insert as the last child.
          } else {
            this.parentNode.insertBefore(dragsrc, this)
          }
        }
      })
      shown_li.innerHTML = `<a class="list-group-item list-group-item-action"><div class="ml-1"><div class="media"><span class="media-body">${shown_courses[i][1]}</span></div></div></a>`
      popup.querySelector('#shown_courses').append(shown_li)
    }
    for (let j = 0; j < hidden_courses.length; j++) {
      const hidden_li = document.createElement('li')
      hidden_li.setAttribute('data-id', hidden_courses[j][0])
      hidden_li.draggable = 'true'
      hidden_li.addEventListener('dragstart', function (e) {
        dragsrc = this
      })
      hidden_li.addEventListener('dragover', function (e) {
        e.preventDefault()
      })
      hidden_li.addEventListener('drop', function (e) {
        e.stopPropagation()
        if (this !== dragsrc) {
          if (this.parentNode === dragsrc.parentNode && this.offsetTop > dragsrc.offsetTop) {
            this.parentNode.insertBefore(dragsrc, this.nextSibling)// if this.nextSibling===null insert as the last child.
          } else {
            this.parentNode.insertBefore(dragsrc, this)
          }
        }
      })
      hidden_li.innerHTML = `<a class="list-group-item list-group-item-action"><div class="ml-1"><div class="media"><span class="media-body">${hidden_courses[j][1]}</span></div></div></a>`
      popup.querySelector('#hidden_courses').append(hidden_li)
    }
    document.body.append(popup_cover)
    document.body.append(popup)
  }

  function closePopup () {
    document.body.removeChild(popup_cover)
    document.body.removeChild(popup)
  }

  function reload_courses () {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        shown_courses = []
        hidden_courses = []
        const a = new DOMParser().parseFromString(xhr.responseText, 'text/html').querySelectorAll("a[href*='lexue.bit.edu.cn/user/view.php']")
        for (let i = 0; i < a.length; i++) {
          shown_courses.push([a[i].href.match(/(?<=course=)\w+/)[0], a[i].innerText])
        }
        openPopup()
      }
    }
    xhr.open('GET', document.querySelector("[href*='lexue.bit.edu.cn/user/profile.php?id=']").href + '&showallcourses=1', true)
    xhr.send()
  }

  if (shown_courses || hidden_courses) {
    rewrite_sidebar(shown_courses)
  } else {
    reload_courses()
  }

  GM_registerMenuCommand('更新课程并修改侧边栏', function () {
    if (!popup.parentNode) {
      reload_courses()
    }
  })
  GM_registerMenuCommand('仅修改侧边栏', function () {
    if (!popup.parentNode) {
      openPopup()
    }
  })
})()
