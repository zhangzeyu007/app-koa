/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-25 21:30:56
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-25 21:59:53
 */

const fs = require('fs')


fs.readFile('./json/goods.json', 'utf8', (err, data) => {
    let newData = JSON.parse(data)
    let i = 0;
    let pushData = []
    newData.RECORDS.map((value, index) => {
        if (value.IMAGE1 != null) {
            i++
            console.log(value.NAME)
            pushData.push(value)
        }
    })
    // console.log(i)
    // console.log(pushData)

    fs.writeFile('./json/newGoods.json', JSON.stringify(pushData), function (err) {
        if (err) console.log('写文件操作失败');
        else console.log('写文件操作成功');
    });
})
