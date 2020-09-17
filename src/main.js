const Koa=require('koa');
const router=require('koa-router')();
const static=require('koa-static');
const app=new Koa();
const axios=require('axios');
const qs=require('querystring');
const aa=static(__dirname+'/');
console.log('aa',aa)
app.use(static(__dirname+'/src'));
const config={
    client_id:'ad18f3363d1bd7d5a019',
    client_secret:'9d25b07327d712aa860d406ae28a24ec4425a4cf'
};

router.get('/github/login',async ctx=>{
    console.log(']]]]]]]]]]]]]]]')
    // 重定向到微信服务器
    let path=`https://github.com/login/oauth/authorize`;
    path+=`?client_id=${config.client_id}`;
    ctx.redirect(path);

});
router.get('/oauth/redirect',async ctx=>{
    console.log('callback .....');
    const {code}=ctx.query;
    console.log('code:',code)
})
app.use(router.routes());
app.listen(4000);