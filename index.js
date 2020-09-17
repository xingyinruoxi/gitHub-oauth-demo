const Koa=require('koa');
const router=require('koa-router')();
const static=require('koa-static');
const app=new Koa();
const axios=require('axios');
const qs=require('querystring');

app.use(static('./index.html'));

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
    console.log('code:',code);
    const {client_id,client_secret}=config;
    const params={
        client_id,client_secret,code
    }
    const {data}=await axios.post('https://github.com/login/oauth/access_token',params);
    // console.log('data',data,qs.parse(data))
    const { access_token}=qs.parse(data);
    const {data:info}=await axios.get(`https://api.github.com/user?access_token=${access_token}`);
    console.log('info',info);
    ctx.body=`
      <h1>Hello,${info.login}</h1>
      <img src='${info.avatar_url}' />
    `;
})
app.use(router.routes());
app.listen(4000);