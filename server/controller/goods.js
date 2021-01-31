/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-25 22:24:02
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 18:39:35
 */
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const mongoose = require('mongoose')
const fs = require('fs')
const jwt = require('../middleware/jwt.js')(app)

/**
 * 导入goods数据.
*/
router.get('/insetAllGoodsInfo', async (ctx) => {
    fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
        // console.log(data);
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('goods')
        data.map((value, index) => {
            let newGoods = new Goods(value)
            newGoods.save().then(() => {
                saveCount++
                console.log("成功" + saveCount);
            }).catch(error => {
                console.log("失败" + error);
            })
        })
    })
    ctx.body = "开始导入goods数据....."
})

/**
 * 导入category数据
*/
router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('category')
        data.RECORDS.map((value, index) => {
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('插入成功' + saveCount);
            }).catch((error) => {
                console.log("插入失败" + error);
            })
        })
    })
    ctx.body = "开始导入category数据....."
})

/**
 * 导入categorySub数据
*/
router.get('/insertAllCategorySub', async (ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('categorySub')
        data.RECORDS.map((value, index) => {
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('插入成功' + saveCount);
            }).catch((error) => {
                console.log("插入失败" + error);
            })
        })
    })
    ctx.body = '开始导入categorySub数据.....'
})

/**
 * 商品详情接口
 * 
*/
router.post('/getDetailGoodsInfo', jwt, async (ctx) => {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('goods')
    await Goods.findOne({ ID: goodsId }).exec().then(async (result) => {
        let code,
            message
        if (result) {
            code = 200
            message = 'ok'
        } else {
            code = 500
            message = "请求数据失败"
        }
        ctx.body = {
            code: code,
            message: message,
            data: {
                detail: result,
            }
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error,
            data: {
            }
        }
    })
})


/**
 *  分类大类接口
 * */

router.get('/category', jwt, async (ctx) => {
    try {
        const Category = mongoose.model('category')
        let result = await Category.find().exec()
        ctx.body = {
            code: 200,
            data: result
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
})

/**
 *  分类小类接口
 * */

router.post('/categorysub', jwt, async (ctx) => {
    try {
        let categoryId = ctx.request.body.categoryId
        const CategorySub = mongoose.model('categorySub')
        let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
        ctx.body = {
            code: 200,
            data: result
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
})
/**
 * 根据类别获取商品列表
 * 
*/
router.post('/getSubGoodsList', jwt, async (ctx) => {
    try {
        let categorySubId = ctx.request.body.categorySubId
        let page = ctx.request.body.page // 当前页数
        let num = 10 // 每页显示数量
        let start = (page - 1) * num // 开始位置
        const Goods = mongoose.model('goods')
        let result = await Goods.find({ SUB_ID: categorySubId }).skip(start).limit(num).exec()
        ctx.body = {
            code: 200,
            data: result
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
})

module.exports = router