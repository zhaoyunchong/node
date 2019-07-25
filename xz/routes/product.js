const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.商品列表
router.get('/list',function(req,res){
  //1.1获取数据
  var obj=req.query;
  console.log(obj);
  //1.2验证是否为空
  var pno=obj.pno;
  var size=obj.size;
  //页码为空，默认第1页
  if(!pno) pno=1;
  //大小为空，默认显示9条数据
  if(!size) size=9;
  console.log(pno,size);
  //1.3转为整型
  pno=parseInt(pno);
  size=parseInt(size);
  //1.4计算查询的开始
  var start=(pno-1)*size;
  //1.5执行SQL语句
  pool.query('SELECT lid,price,title FROM xz_laptop LIMIT ?,?',[start,size],function(err,result){
    if(err) throw err;
	res.send(result);
  });
});
//2.商品详情
//3.商品添加
//4.删除商品
//5.修改商品


//导出路由器对象
module.exports=router;