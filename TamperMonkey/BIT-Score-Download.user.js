// ==UserScript==
// @name         BIT-Score-Download
// @namespace    CJJ
// @version      0.1
// @description  Download your score
// @author       You
// @match        https://jwms.bit.edu.cn/jsxsd/kscj/cjcx_list
// @icon         none
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    GM_registerMenuCommand('成绩导出',async function(){
        const downloadLink = document.createElement("a");
        downloadLink.download = `成绩导出-${new Date().getTime()}.csv`;//命名txt
        const thead = "序号,开课学期,课程编号,课程名称,成绩,成绩标识,学分,总学时,考试性质,考核方式,课程属性,课程性质,课程归属,课程种类,是否第一次考试,平均分,最高分,该课程所有教学班成绩录入完毕,班级人数,班级百分比,班级排名,专业人数,专业百分比,专业排名,学习人数,学习百分比,学习排名";
        const rows = Array.from(document.querySelectorAll("#dataList>tbody>tr"))
        rows.shift();
        const tbody = await Promise.all(
            rows.map(
                async function(row){
                    let row_data = Array.from(row.querySelectorAll("td")).map(e => e.innerText);
                    row_data.pop();
                    console.log("Processing ", row_data[3]);
                    const url = row.querySelector("a[href][onclick]")?.onclick?.toString()?.match(/(?<=JsMod\(').*?(?=')/)[0];
                    if(url){
                        const text = await fetch(url).then(res=>res.text());
                        row_data.push(text.match(/(?<=平均分[^\w]*?)[\w]+/)?.join());//平均分
                        row_data.push(text.match(/(?<=最高分[^\w]*?)[\w]+/)?.join());//最高分
                        row_data.push(text.match(/(?<=该课程所有教学班成绩录入完毕[^是否]*?)[是否]+/)?.join());//该课程所有教学班成绩录入完毕
                        row_data.push(text.match(/(?<=班级人数[^\w]*?)[\w]+(?=[^\w]*?人)/)?.join());//班级人数
                        row_data.push(text.match(/(?<=本人成绩在班级中占[^\w]*?)[\w]+%/)?.join());//班级百分比
                        row_data.push(Math.round(parseFloat(row_data[row_data.length-1])*parseFloat(row_data[row_data.length-2])/100));//班级排名
                        row_data.push(text.match(/(?<=专业人数[^\w]*?)[\w]+(?=[^\w]*?人)/)?.join());//专业人数
                        row_data.push(text.match(/(?<=本人成绩在专业中占[^\w]*?)[\w]+%/)?.join());//专业百分比
                        row_data.push(Math.round(parseFloat(row_data[row_data.length-1])*parseFloat(row_data[row_data.length-2])/100));//专业排名
                        row_data.push(text.match(/(?<=学习人数[^\w]*?)[\w]+(?=[^\w]*?人)/)?.join());//学习人数
                        row_data.push(text.match(/(?<=本人成绩在所有学生中占[^\w]*?)[\w]+%/)?.join());//学习百分比
                        row_data.push(Math.round(parseFloat(row_data[row_data.length-1])*parseFloat(row_data[row_data.length-2])/100));//学习排名
                    }else{
                        row_data.push("","","","","","","","","","","","")
                    }
                    return row_data.join();
                })
        );
        const content = `${thead}\n${tbody.join("\n")}`;
        downloadLink.href = URL.createObjectURL(new Blob([content],{type:"text/plain"}));//创建txt
        downloadLink.click();
        document.write(csv2table(content));
    });
    function csv2table(csvString) {
        // 将 CSV 字符串分割成行
        const rows = csvString.trim().split('\n');
        let table = ['<table border="1">'];
        rows.forEach(row => {
            // 将行分割成单元格
            const cells = row.split(',');
            table.push('<tr>');

            // 遍历每个单元格
            cells.forEach(cell => {
                // 添加单元格到行
                table.push(`<td>${cell}</td>`);
            });

            // 结束一行
            table.push('</tr>');
        });

        // 结束表格
        table.push('</table>');
        return table.join("");
    }
})();