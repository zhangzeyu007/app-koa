/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-22 21:07:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-12 18:05:18
 */

const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./db/db.js');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const session = require('koa-session');
const KoaStatic = require('koa-static');

app.use(KoaStatic('./'));

require('koa2-ctx-validator')(app);


// 设置session 配置
const CONFIG = {
    key: 'koa.sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: false,
    rolling: false,
    renew: false,
    secure: false,
};

app.use(session(CONFIG, app));

app.use(bodyParser())
// 跨域设置
app.use(cors({
    credentials: true
}))

let user = require('./controller/user.js')
let home = require('./controller/home.js')
let goods = require('./controller/goods.js')

//装载所有子路由
let router = new Router()

router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

    ; (async () => {
        await connect()
        initSchemas()
    })()

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.use((ctx) => {
    ctx.body = '后台服务启动..............'
})


app.listen(3000)




