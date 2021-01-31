/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-18 22:06:50
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-19 07:37:01
 */
/**
 * 适配移动端
 * 物理像素，比较好理解，一个物理像素是显示器(手机屏幕)上最小的物理显示单元，
 * 在操作系统的调度下，每一个设备像素都有自己的颜色值和亮度值。
 * */
// document.documentElement.style.fontSize = document.documentElement.clientWidth || document.body.clientWidth / 7.5 + 'px';
document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.clientWidth || document.body.clientWidth / 7.5 + 'px';

window.addEventListener('resize', function () {
    document.documentElement.style.fontSize =
        document.documentElement.clientWidth || document.body.clientWidth / 7.5 + 'px'
})