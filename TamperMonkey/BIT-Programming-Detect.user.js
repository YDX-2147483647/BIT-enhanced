// ==UserScript==
// @name         Detect_BIT_OJ_getchar
// @namespace    Detect_BIT_OJ_getchar
// @version      0.1
// @description  通过提交C语言程序，逐字符确定测试用例。为符合编程人员的习惯，字符默认从第0个开始。文本框中输入Enter键可以直接开始探测。在结束文本框输入非数字时，会持续探测。探测到所有的测试用例都EOF时探测会结束。支持的测试用例字符：ASCII -1, 8-13, 32-126。
// @author       CJJ
// @author       JWJ, python "getchar" version
// @author       YDX, original python version
// @match        https://lexue.bit.edu.cn/mod/programming/*.php?id=*
// @icon         data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABILAAASCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtHBdALRwXwC1bk0ntW5NzbVuTaa1bk1ftW5OJrVvTwa0cFsAtHBdALRwYQC0cGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVvVAC1b1YAtW9YALRwWwC1cGQAtHBcArVuTSe1bk3otW5N/7VuTvi1b1HetW9VrbRvWXC0cF03tHBgEbRydwC0cWsAtHFuALRycQCzcnMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtW9NALVvVQe1b1ghtHBbU7RwXY+0cF86tW5LJLVuTee1bk//tW9S/7VvVf+0b1n/tHBc/7RwYO+0cGPJtHFnkLRxalK0cW0htHJuBbRzeACzc3kAs3N8ALN0fwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1b1UttW9XnbRwWuG0cF39tHBh/7RwY1S1bk0jtW9R57VvVP+1b1f/tHBb/7RwXv+0cGH/tHFk/7RxZ/+0cWr/tHFt+rRycN+zcnOutHN2cLNzeTezc3sQr3SOALJ0hQCydIgAsnSKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVvVgu0b1k+tHBei7RwYtK0cWX3tHFnVLVvUiO1b1bntG9Z/7RwXf+0cGD/tHBj/7RxZv+0cWn/tHFs/7Rybv+zcnH/s3J0/7Nzdv+zc3n/s3N777N0f8iydIKPsnSEUbJ0hyCydIkGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtW9WALRvWQC0cEsAtHFlGLRxaFK0cWsptG9YJLRwW+a0cF7/tHBi/7RxZP+0cWf/tHFq/7Rxbf+0cnD/s3Jy/7Nydf+0c3j/s3N6/7N0ff+zdID/snSC/7J0hP+ydIf6snSK3bJ1jLK1bk0AtW5NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALRwYgC0cWQAtHFnALRxaQC0cFwKtHBfXLRwYqy0cWbltHFp/7RxbP+0cm//s3Jx/7NydP+zc3b/s3N5/7Nze/+zdH7/snSB/7J0g/+ydIb/snSI/7J1i/+ydY3/sXWP/7VuTQC1bk0AtW5NALVuTQC1bk8AtG5TAAAAAAAAAAAAAAAAAAAAAAC0cWwAtHFxALRwXAC0cF0AtHFoBrRxaSq0cWxrtHJvtbNycuuzcnX/tHN4/7Nzev+zdH3/s3SA/7J0gv+ydIX/snSH/7J0iv+ydYz/snWO/7F1kP+xdpP/tW5NlLVuTWa1bk06tW5NGLVuTAW0blkAs25bALNuXgCzbmIAs25lALNvaAAAAAAAAAAAALRvYgC0cWUAtHFoALRxagCzcnMJs3J1M7RzeHyzc3vHs3R+9rJ0gf+ydIP/snSG/7J0iP+ydYv/snWN/7F1j/+xdZL/sXaU/7F2lv+1bk3/tW5N/7VuTfG1bk7WtG5Sr7RuVoCzblpRs25eKbNuYQ67cSIAsm5sALJubQCxbnYAsW51ALBudwAAAAAAtHJvALNycgCzcnUAtHN0ALN0fhKydIFMsnSEo7J0h+qydIr/snWM/7J1jv+xdZD/sXaT/7F2lf+xdpf/sXaa/7VuTf+1bk3/tW5P/7RuU/+0blb/tG5a/7NuXfqzbmHns25lxrNuaJqybmtosm5tGrFudQGybnACsG57AK9ufQCvboAArm6DAK5thQCzc3sAs3R+ALJ0gACydYkFsnSKN7J1jJ+xdY/0sXWS/7F2lP+xdpb/sXaZ/7F3m/+xd53/tW5O/7RuUf+0blX/tG5Y/7NuXP+zbl//s25i/7NuZf+zbmj/sm5r/7Jubv2xbm9SsW52GrBud5ewbnp2sG59RK9ugB2uboEGrW2JAK1tigCsbY0ArG2PALJ1hwCydIkAsXWRB7F2k2GxdpXrsXaX/7F3mv+xd5z/sXee/7B3oP+0blP/tG5W/7RuWv+zbl3/s25h/7NuZP+zbmf/sm5q/7JubP+xbm//sW5y/bFudFOwbnkjsG5667BufP+vbn/2rm6C3K5uhbGtbod6rW2KQ6xtjRusbZAEAAAAAAAAAACxdY8AsXifAbF2mYmxd5v/sXed/7B3n/+wd6L/sHij/7RuWP+zblz/s25f/7NuYv+zbmb/s25o/7Jua/+ybm7/sW5x/7FudP+xbnb8sG54U69ufSOvbn7nr26B/65ug/+uboX/rW2H/61tiv+sbYznrG2OhKxtkBUAAAAAAAAAAAAAAACwd54AsXedW7F3nv6wd6D/sHij/7B4pf+weKf/s25e/7NuYf+zbmT/s25n/7Juav+ybmz/sW5v/7Fucv+xbnX/sG53/7BuevywbntTrm6BI65ugueuboT/rW6G/61tif+tbYv/rG2N2qxtjlGsbY8LrG2QALF3nQCxd58AsHegALB3oAqwd6ChsHei/7B4pP+weKb/sHio/7B4qv+zbmP/s25m/7NuaP+ybmv/sm5u/7Fucf+xbnT/sW52/7Buef+wbnv/r25+/K9uf1OuboUjrm6F561th/+tbYr/rG2N/6xtj/msbZBdrG2NAKxtjwCxd6IAsnebA7F3nhSwd6BAsHehobB4o/iweKX/sHin/7B4qf+weKv/sHmt/7NuZ/+ybmr/sm5s/7Fub/+xbnL/sW51/7BueP+wbnr/sG59/69uf/+uboL8rm6DU61tiCOtbYnnrW2L/6xtjv+sbZD/q22S76ttkzGqbJkAAAAAALF3nCyxd56gsHeg0rB4ovKweKT/sHim/7B4qP+weKr/sHms/7B5rv+vebD/sm5r/7Jubv+xbnH/sW50/7Fudv+wbnn/sG57/69ufv+uboH/rm6D/65uhfytboZTrW2MI6xtjeesbY//rG2R/6ttk/+rbZX8qm2XdaxthwGpbKEAsXedDrB3oGaweKLOsHil/bB4p/+weKn/sHir/7B5rf+wea//r3mx/695s/+xbnD/sW5y/7Fudf+wbnj/sG56/7Buff+vbn//rm6C/65uhP+tbob/rW2J/K1tilOsbZAjrG2Q56ttkv+rbZT/q22W/6psmf+qbJvqqmyeaKlsoAuqbqUArnOgALB4pRiweKdnsHiqwLB4rPWwea//r3mw/695sv+verT/r3q2/7FudP+xbnb/sG55/7Bue/+vbn7/rm6B/65ug/+uboX/rW2H/61tiv+sbY38rG2OU6ttkyOrbZPnq22V/6ptmP+qbJr/qmyc/6psnv+pbKH3qWyjr6hspkuoa6gOqm+rAKtxqgCweawOsHmvSa95sZyvebPer3q1/a96t/+vern/sG54/7Buev+wbn3/r25//65ugv+uboT/rW6G/61tif+tbYv/rG2O/6xtkPysbZFTq22WI6ttl+eqbJn/qmyb/6psnf+pbKD/qWyi/6lspP+obKb/qGuo9adrq8Cna61ypmqvLqVosQircbIAlU24AK96tSKverdkr3q6r696vOOwbnz/r25+/65ugf+uboP/rm6F/61th/+tbYr/rG2N/6xtj/+sbZH/q22T/KttlVOqbJkjqmya56psnP+qbJ7/qWyh/6lso/+obKX/qGyn/6hrqf+na6v/p2ut/6Zqr/+marHppmqzt6Vptnelabg7o2e6EbB9uADAlbgDr3y9I69ugP+uboL/rm6E/61uhv+tbYn/rW2L/6xtjv+sbZD/q22S/6ttlP+rbZf8qm2YU6psnSOqbJ3nqWyg/6lsov+pbKT/qGym/6hrqP+na6r/p2us/6dqrv+marD/pmqy/6VqtP+labb/pWm4/6RpuvGkaLzOo2i+m6JnwGKhZsIzrm6D/65uhf+tbYj/rW2K/6xtjf+sbY//rG2R/6ttk/+rbZb/qm2Y/6psmvyqbJtTqWygI6lsoeepbKP/qGyl/6hsp/+oa6n/p2ur/6drrf+maq//pmqx/6Zqs/+larX/pWm3/6Rpuf+kaLr/pGi8/6Novv+iZ8D/omfC/qJmw++tbof/rW2J/61ti/+sbY7/rG2Q/6ttkv+rbZX/q22X/6psmf+qbJv/qmyd/KpsnlOpbKQjqWyk56hspv+oa6j/p2uq/6drrP+naq7/pmqw/6Zqsv+larT/pWm2/6VpuP+kabn/pGi7/6Novf+iZ7//omfB/6Jmw/+iZsT/oWbG/61tiv+sbY3/rG2P/6xtkf+rbZP/q22W/6ptmP+qbJr/qmyc/6psnv+pbKH8qWyiU6hspyOoa6jrqGup/6drq/+na63/pmqv/6Zqsf+marP/pWq1/6Vpt/+kabn/pGi6/6RovP+jaL7/omfA/6Jnwv+iZsT/ombF/6Fmx/+gZcj/rG2O/6xtkP+rbZL/q22V/6ttl/+qbJn/qmyb/6psnf+pbKD/qWyi/6lspPyobKVRqGupEKdrqpena6zWp2qu9qZqsP+marL/pWq0/6Vptv+labj/pGm6/6Rou/+jaL3/ome//6Jnwf+iZsP/ombE/6Fmxv+hZcj/oGXJ/6Bly/+sbZH/q22T/6ttlv+qbZj/qmya/6psnP+qbJ//qWyh/6lso/+obKX/qGyn/6drqomna60ipmuuBadqrhqmarBHpmqyhKVqtb+labfppGm5/qRou/+kaLz/o2i+/6JnwP+iZ8L/ombE/6Jmxf+hZsf/oGXJ/6Blyv+fZMz/n2TN/6ttlf+rbZf/qmyZ/6psm/+qbJ3/qWyg/6lsov+pbKT/qGym/6hrqPena6rXp2usn6dqrUena64Fp2quAKZqsACnaq8ApWm3C6RpuC6kaLtlo2i9o6Jnv9eiZ8H3ombD/6JmxP+hZsb/oWXI/6Blyf+gZcv/n2TN/59kzv+fY9D/qmyY/6psmv+qbJz/qmyf/6lsof+pbKP+qGyl6qhsp8Coa6iFp2uqSKdrqxqnaq4Dp2utAKdrrgAAAAAAAAAAAKVqtAClabYApGm4AKRpugChZ8IDomfBGqJmw0iiZsWFoWbHwKBlyeqgZcr+n2TM/59kzf+fZM//n2PR/55i0v+qbJz/qmyd/6lsoPWpbKLWqWyjo6hspWWobKcvqGupDKhspwCna6oAp2urAKdrrACnaq0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApGi8AKNovgCiZ8AAomfCAKJnwgCgZckMoGXKL59kzGWfZM6jn2PQ1p5j0vWeYtP/nWLV/6psntapbKCYqWyiU6lsox+obKYDqGylAKhspgCoa6gAqGupAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoWbGAKBlyACgZcoAoGXLAJ9k0gOfY9IfnmLTU51i1ZidYdfW//A////gB//8AAB//AAAD/wAAAD/gAAA//AAAP/8AAAH/4AAAD/wAAAD/AAAAD8AAAADgAAAA8AAAAOAAAAcAAAAGAAAAAgAAAAGAAAAAYAAAAAwAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAD/AAAP//AAf//+A=
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict'
  /* global GM_registerMenuCommand */

  /** 提示“正在探测”的顶部提示栏 */
  const reminder = document.createElement('b')
  /** 弹出窗口的灰色背景 */
  const popup_cover = document.createElement('div')
  /** 弹出窗口 */
  const popup = document.createElement('div')
  /** 鼠标点击到弹窗上边沿时的X位置 */
  let mousestartX
  /** 鼠标点击到弹窗上边沿时的Y位置 */
  let mousestartY
  /** 提交的表单数据，包括页面id、代码内容等 */
  let fm
  /** 弹窗跟随鼠标移动 */
  const movePopup = (e) => {
    popup.style.left = (e.clientX - mousestartX) + 'px'
    popup.style.top = (e.clientY - mousestartY) + 'px'
  }
  /** 停止弹窗随鼠标移动 */
  const stopMove = () => {
    document.removeEventListener('mousemove', movePopup)
    document.removeEventListener('mouseup', stopMove)
  }
  /** 防止在探测时页面刷新 */
  const preventClosing = (e) => {
    e.preventDefault()
  }
  /** 关闭弹窗 */
  function closePopup () {
    document.body.removeChild(popup_cover)
    document.body.removeChild(popup)
  }
  /** 显示消息，然后隐藏顶部提示 */
  async function hideReminder (msg) {
    if (msg) {
      reminder.innerHTML = msg
    }
    await new Promise(resolve => setTimeout(resolve, 2000))
    reminder.style.opacity = '0'
    await new Promise(resolve => setTimeout(resolve, 300))
    document.body.removeChild(reminder)
    window.removeEventListener('beforeunload', preventClosing)
  }
  function downloadTXT (content, filename) {
    const downloadLink = document.createElement('a')
    // 创建txt
    downloadLink.href = URL.createObjectURL(new Blob([content], { type: 'text/plain' }))
    // 命名txt
    downloadLink.download = filename
    downloadLink.click()
  }
  /**
   * 将测试输入打印成人类易读的形式
   * @param arguments_ 记录了所有测试输入的词典，格式为 {<编号>: [<测试输入每一位的ASCII>]}
   */
  function print_arguments (arguments_) {
    let result = ' No.  |测试输入\n'
    for (const key in arguments_) {
      result += ('   ' + key).slice(-4) + '  |' + String.fromCharCode(...arguments_[key])
        .replaceAll('\b', '\\b')
        .replaceAll('\t', '\\t')
        .replaceAll('\n', '\\n')
        .replaceAll('\v', '\\v')
        .replaceAll('\f', '\\f')
        .replaceAll('\r', '\\r') +
        '\n'
    }
    return result
  }
  function show_results (results) {
    popup_cover.style = 'width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;inset:0px;z-index:2000'
    // 双击弹窗灰色背景时关闭它
    popup_cover.setAttribute('ondblclick', 'this.style.display="none";')

    popup.style = 'background-color:white;color:black;box-shadow:rgb(153,153,153) 0px 0px 2px;transform:translate(-50%,-50%);position:fixed;border:3px solid rgba(0,0,0,0.6);font-size:16px;overflow:hidden;z-index:3000;left:50%;top:50%;width:40%;text-align:center;'
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
</style><div id="popup_title">探测结果
<div id="close_popup">×</div>
</div>
<pre style="overflow:auto;text-align:left;max-height:80vh;">${results}</pre></div>`
    popup.querySelector('#popup_title').addEventListener('mousedown', e => {
      // 记录鼠标在弹出窗口的相对位置
      mousestartX = e.clientX - parseInt(window.getComputedStyle(popup).getPropertyValue('left'))
      mousestartY = e.clientY - parseInt(window.getComputedStyle(popup).getPropertyValue('top'))
      // 鼠标移动时移动弹窗
      document.addEventListener('mousemove', movePopup)
      // 鼠标松开时结束移动
      document.addEventListener('mouseup', stopMove)
    })
    // 点击关闭按钮，关闭窗口
    popup.querySelector('#close_popup').onclick = () => closePopup()

    document.body.append(popup_cover)
    document.body.append(popup)
  }
  /**
   * 探测保密测试用例
   * @param start 从第几个字符开始探测。如果不是数字，比如文本框留空，则当成0
   * @param end 探测到第几个字符为止。如果不是数字，比如文本框留空，则不断探测，直到全部都EOF
   */
  async function detect (start, end) {
    start = start || 0 // 当start不是数字时重新赋值为0
    if (start > end || start < 0 || end < 0) { // 当end不是数字时表达式也是false
      alert('输入无效！')
      return
    }
    closePopup()
    window.addEventListener('beforeunload', preventClosing)// 防止探测时页面刷新
    document.body.append(reminder)
    reminder.style.opacity = '1'
    fm = await new Promise((resolve, reject) => { // 等待从submit.php获取表单数据
      const submit_xhr = new XMLHttpRequest()
      submit_xhr.open('GET', document.querySelector("[title='提交']").href, true)
      submit_xhr.onreadystatechange = async function () {
        if (submit_xhr.readyState === 4) { // 请求完成
          if (submit_xhr.status === 200) { // 请求正常，并且还能提交
            try {
              resolve(new FormData(new DOMParser().parseFromString(submit_xhr.responseText, 'text/html').querySelector('form[action="https://lexue.bit.edu.cn/mod/programming/submit.php"]')))
            } catch (error) { // 迟交的程序会找不到表单数据
              hideReminder('时间已到，您不能再提交程序了！')
              reject(Error('FormData Error:' + error.message))
            }
          } else {
            hideReminder('网络错误！')
            reject(Error('Network Error'))
          }
        }
      }
      submit_xhr.send()
    })
    /**
     * ```
     * arguments_ = {
     *   '3': [65, 12],
     *   '4': [5, 7, 534, 1, 543, 3, 2, 4, 6, 12, 3, 45, 3, 2, 13, 22, 1, 33, 56],
     *   '5': [4, 5, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 2, 3, 4, 5, 1, 3, 4]
     * }
     * ```
     * 变量arguments_将会变成类似的格式，冒号前面的代表题号，后面的数组代表每一位字符的ASCII数值。
     */
    const arguments_ = {}
    let not_all_EOF = true
    let i = start
    for (; (isNaN(end) || i <= end) && not_all_EOF; i++) {
      reminder.innerHTML = `正在探测第${i}个字符<button style="float:right;" onclick="this.parentNode.innerHTML='正在停止'">停止</button>`
      // 以下生成C语言代码：
      // delay函数用于拖延时间。程序的正常输入输出耗时误差只出现在运行时间的最后一位，因此最后一位舍弃，只拖延前两位的时间；
      // ASCII -1意味着EOF，返回1/0报“FPE”来读取；
      // ASCII 32-126能够正常显示，统一减去32以显示在耗时的前两位上，对应0-94；
      // ASCII 8-13是特殊符号\b\t\n\v\f\r，保险起见也放进来，对应95-100，其中100一般会报“TLE”；如果无时间限制则会显示“1.001”左右的数字，同样可以读取。
      // 这样，常用的字符能够全部表示在运行结果页面上，类似于加密。
      fm.set('code', '#include<stdio.h>\n#include<time.h>\nvoid delay(int seconds){clock_t start = clock();clock_t lay=(clock_t)seconds*CLOCKS_PER_SEC/1000;while((clock()-start)<lay);}int main(){int x;long long i;for(i=' +
        start + ';i<' +
        i + ';i++)getchar();x=getchar()-32;if(x==-33)return 1/0;else if(x<-18&&x>-25)x+=119;delay(x*10);return 0;}')
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://lexue.bit.edu.cn/mod/programming/submit.php', true)
      xhr.send(fm)
      let result = await new Promise(resolve => {
        // 不断查看运行结果页面，直到“程序处理完毕”
        const int = setInterval(() => {
          const x = new XMLHttpRequest()
          x.open('GET', 'https://lexue.bit.edu.cn/mod/programming/result.php?id=' + fm.get('id'), true)
          x.onreadystatechange = function () {
            if (x.readyState === 4) {
              if (x.status === 200) {
                if (x.responseText.match('当前状态：程序已处理完毕。')) {
                  clearInterval(int)
                  return resolve(x.responseText)
                } else if (!x.responseText.match('当前状态：程序已提交，正等待编译。')) {
                  clearInterval(int)
                  reminder.innerHTML = '编译错误！'
                  return resolve(false)
                }
              } else {
                clearInterval(int)
                reminder.innerHTML = '网络错误！'
                return resolve(false)
              }
            }
          }
          x.send()
        },
        // 500意味着每0.5秒查看一次运行结果页面
        500)
      })
      if (!result) { // 出错
        const partial_content = document.querySelector('title').innerText + ' 保密测试用例(字符：' + start + '~' + (i - 1) + ')\n探测于' + new Date().toLocaleString() + '\n' + print_arguments(arguments_)// 写入txt的探测内容
        downloadTXT(partial_content, document.querySelector('title').innerText + ' 保密测试用例(字符：' + start + '~' + (i - 1) + ').txt')
        hideReminder()
        show_results(partial_content)
        return
      }
      const rows = new DOMParser().parseFromString(result, 'text/html').querySelectorAll('#test-result-detail tbody > tr'); let // 结果表格的所有行
        EOF_count = 0 // EOF的样例个数
      for (let r = 0; r < rows.length; r++) {
        const row_number = rows[r].querySelector("[class~='c0']").innerText; const // 测试用例编号
          error = rows[r].querySelector("[class~='c12']").innerText.split(':')[0]// 错误类型
        if (error === 'FPE') { // 1/0的情况，意味着已经EOF了
          ++EOF_count
          continue
        }
        if (rows[r].querySelector("[class~='c4']").innerText === '保密') {
          if (i === start) { // i是start，说明是第一次循环，需要将json初始化为空数组[]。
            arguments_[row_number] = []
          }
          /* 接下来对结果进行解密 */
          if (error === 'TLE') {
            // 对应的是ASCII 13 的\r
            arguments_[row_number][i] = 13
            continue
          }
          result = Math.floor(parseFloat(rows[r].querySelector("[class~='c8']").innerText) * 100 + 32)
          if (result > 126) {
            // ASCII 8-12
            result -= 119
          }
          arguments_[row_number][i] = result
        }
      }
      if (reminder.innerHTML === '正在停止') {
        break
      }
      if (EOF_count === rows.length) { // 全部都EOF了
        not_all_EOF = false
      }
    }
    hideReminder('已探明全部参数。')
    let content
    if (not_all_EOF) {
      content = document.querySelector('title').innerText + ' 保密测试用例(字符：' + start + '~' + i + ')\n探测于' + new Date().toLocaleString() + '\n' + print_arguments(arguments_)// 写入txt的探测内容
      downloadTXT(content, document.querySelector('title').innerText + ' 保密测试用例(字符：' + start + '~' + i + ').txt')
    } else {
      content = document.querySelector('title').innerText + ' 保密测试用例(字符：' + start + '~end)\n探测于' + new Date().toLocaleString() + '\n' + print_arguments(arguments_)// 写入txt的探测内容
      downloadTXT(content, document.querySelector('title').innerText + ' 保密测试用例(字符：' + start + '~end).txt')
    }
    show_results(content)
  }

  GM_registerMenuCommand('获取保密测试用例', function () { // 脚本菜单
    reminder.style = 'width:100%;color:white;position:fixed;left:0;top:0;text-align:center;opacity:100%;background-color:rgb(255,127,127);font-size:2vh;line-height:150%;opacity:0;line-height:4vh;transition:opacity 0.3s;z-index:4000;'
    reminder.innerHTML = '准备开始探测'
    popup_cover.style = 'width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;inset:0px;z-index:2000'
    popup_cover.setAttribute('ondblclick', 'this.style.display="none";')// 双击弹窗灰色背景时关闭它
    popup.style = 'background-color:white;color:black;box-shadow:rgb(153,153,153) 0px 0px 2px;transform:translate(-50%,-50%);position:fixed;border:3px solid rgba(0,0,0,0.6);font-size:16px;overflow:hidden;z-index:3000;left:50%;top:50%;width:40%;text-align:center;'
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
</style><div id="popup_title">编辑测试用例格式
<div id="close_popup">×</div>
</div>
<div style="line-height:150%;"><br>从第<input type="number" id="char_start" style="width:20%;" value="0" placeholder="0"></input>个字符探测到第<input type="number" id="char_end" style="width:20%;"></input>个字符<br>
</div><button id="start_detect" style="margin:5% 5% 5% 5%;">开始探测</button></div>`
    popup.querySelector('#popup_title').addEventListener('mousedown', e => {
      // 记录鼠标在弹出窗口的相对位置
      mousestartX = e.clientX - parseInt(window.getComputedStyle(popup).getPropertyValue('left'))
      mousestartY = e.clientY - parseInt(window.getComputedStyle(popup).getPropertyValue('top'))
      // 鼠标移动时移动弹窗
      document.addEventListener('mousemove', movePopup)
      // 鼠标松开时结束移动
      document.addEventListener('mouseup', stopMove)
    })
    popup.querySelector('#close_popup').onclick = () => closePopup()// 点击关闭按钮，关闭窗口
    popup.querySelector('#start_detect').onclick = () => detect(parseInt(popup.querySelector('#char_start').value), parseInt(popup.querySelector('#char_end').value))
    document.body.append(popup_cover)
    document.body.append(popup)
    popup.querySelector('#char_end').focus()
    popup.querySelector('#char_start').addEventListener('keydown', function (e) {
      if (e.keyCode === 13) { // 按下Enter键
        detect(parseInt(popup.querySelector('#char_start').value), parseInt(popup.querySelector('#char_end').value))
      }
    })
    popup.querySelector('#char_end').addEventListener('keydown', function (e) {
      if (e.keyCode === 13) { // 按下Enter键
        detect(parseInt(popup.querySelector('#char_start').value), parseInt(popup.querySelector('#char_end').value))
      }
    })
  })
})()
