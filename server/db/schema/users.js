/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-23 15:45:51
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-30 11:49:17
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.ObjectId
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10

// 创建UserSchema
const userSchema = new Schema({
    UserId: ObjectId,
    email: {
        unique: true,
        type: String
    },
    userName: {
        unique: true,
        type: String
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastLoginAt: {
        type: Date,
        default: Date.now()
    }
})

// 加盐处理
userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })

    })
})

// 比较密码
userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise(async (resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

// 发布
mongoose.model('users', userSchema)