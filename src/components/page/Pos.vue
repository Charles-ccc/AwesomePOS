<template>
  <div class="pos">
    <el-row>
      <el-col :span='8' class="pos-order" id="orderList">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width:100%" >
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量"  width="60"></el-table-column>
              <el-table-column prop="price" label="金额" width="80"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small">增加</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="divBtn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger">删除</el-button>
              <el-button type="success">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">
            guadan
          </el-tab-pane>
          <el-tab-pane label="外卖">
            waimai
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span='16'>
        <div class="often-goods">
          <div class="goods-title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="(goods,index) in oftenGoods" :key="index" @click="addOrderList(goods)">
                <span>{{ goods.goodsName }}</span>
                <span class="goods-price">￥{{ goods.price }}元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
             <div>
               <ul class="cookList">
                 <li v-for="(goods,index) in type0Goods" :key="index">
                   <span class="foodImg">
                     <img :src="goods.goodsImg" width="100%" alt="" />
                   </span>
                   <span class="foodName">{{ goods.goodsName }}</span>
                   <span class="foodPrice">￥{{ goods.price }}元</span>
                 </li>
               </ul>
             </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class="cookList">
                 <li v-for="(goods,index) in type1Goods" :key="index">
                   <span class="foodImg">
                     <img :src="goods.goodsImg" width="100%" alt="" />
                   </span>
                   <span class="foodName">{{ goods.goodsName }}</span>
                   <span class="foodPrice">￥{{ goods.price }}元</span>
                 </li>
               </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <ul class="cookList">
                 <li v-for="(goods,index) in type2Goods" :key="index">
                   <span class="foodImg">
                     <img :src="goods.goodsImg" width="100%" alt="" />
                   </span>
                   <span class="foodName">{{ goods.goodsName }}</span>
                   <span class="foodPrice">￥{{ goods.price }}元</span>
                 </li>
               </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
            <ul class="cookList">
                 <li v-for="(goods,index) in type3Goods" :key="index">
                   <span class="foodImg">
                     <img :src="goods.goodsImg" width="100%" alt="" />
                   </span>
                   <span class="foodName">{{ goods.goodsName }}</span>
                   <span class="foodPrice">￥{{ goods.price }}元</span>
                 </li>
               </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'pos',
  data(){
    return{
      tableData: [],
      oftenGoods:[],
      type0Goods:[],
      type1Goods:[],
      type2Goods:[],
      type3Goods:[]
    }
  },
  created:function(){
    axios.get('/api/DemoApi/oftenGoods.php')
    .then(response=>{
      // console.log(response);
      this.oftenGoods = response.data;
    })
    .catch(error=>{
      //console.log(error);
      alert('网络错误，不能访问');
    })

    axios.get('/api/DemoApi/typeGoods.php')
    .then(response=>{
      console.log(response);
      this.type0Goods = response.data[0];
      this.type1Goods = response.data[1];
      this.type2Goods = response.data[2];
      this.type3Goods = response.data[3];
    })
    .catch(error=>{
      //console.log(error);
      alert('网络错误，不能访问');
    })
  },
  mounted: function(){
    let orderHeight=document.body.clientHeight;
    document.getElementById("orderList").style.height=orderHeight+'px';
  },
  methods:{
    addOrderList(goods){
      //商品是否已经存在于订单列表中
      var isHave=false;
      for(var i=0;i<this.tableData.length;i++){
        if(this.tableData[i].goodsId=goods.goodsId){
          isHave=true;
        }
      }


      //根据判断的值编写业务逻辑
      if(isHave){
        //如果存在，就改变商品的数量
        console.log(this.tableData)
        var arr = this.tableData.filter(o =>o.goodsId == goods.goodsId);
        arr[0].count++;
      }else{
        var newGoods={
          goodsId:goods.goodsId,
          goodsName:goods.goodsName,
          price:goods.price,
          count:1
        }
        this.tableData.push(newGoods);
        console.log(this.tableData)
      }
      console.log(this.tableData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 局部变量-->
<style scoped>
  *{
    padding: none;
    margin: none;
    list-style:none;
  }
  .pos-order{
    background-color: #f9fafc;
    border-right: 1px solid #c0ccda;
  }
  .divBtn{
    margin-top:15px;
  }
  .goods-title{
    height: 20px;
    border-bottom:1px solid #d3dce6;
    background-color:#f9fafc;
    padding: 10px;
    text-align: left;
  }
  .often-goods-list ul li{
    cursor: pointer;
    float: left;
    border: 1px  solid #e5e9f2;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
  .goods-price{
    color:#58b7ff;
  }
  .goods-type{
    clear: both;
  }
  .cookList li{
    cursor: pointer;
    width: 23%;
    border:1px solid #e5e9f2;
    height: auto;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin:2px;
  }
  .cookList li span{
    display: block;
    float: left;
  }
  .foodImg{
    width:40%;
  }
  .foodName{
    font-size: 16px;
    padding-left:10px;
    color:browm;
  }
  .foodPrice{
    font-size:16px;
    padding-left:10px;
    padding-top: 10px;
  }
</style>
