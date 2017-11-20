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
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  <!-- @click="addOrderList(goods)" 因为这个模版里没有goods，所以用模版作用域来用scope.row-->
                  <el-button type="text" size="small" @click="delsingleGoods(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">
              <span>数量：<i>{{totalCount}}</i></span>
              <span>金额：<i>{{totalMoney}}</i>元</span>
            </div>
            <div class="divBtn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delallGoods">删除</el-button>
              <el-button type="success" @click="checkOut()">结账</el-button>
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
                 <li v-for="(goods,index) in type0Goods" :key="index" @click="addOrderList(goods)">
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
                 <li v-for="(goods,index) in type1Goods" :key="index" @click="addOrderList(goods)">
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
                 <li v-for="(goods,index) in type2Goods" :key="index" @click="addOrderList(goods)">
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
                 <li v-for="(goods,index) in type3Goods" :key="index" @click="addOrderList(goods)">
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
      type3Goods:[],
      totalMoney:0,
      totalCount:0
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
      //初始化总金额和数量
      this.totalMoney=0;
      this.totalCount=0;

      //判断商品是否已经存在于订单列表tableData中，首先会初始化为false
      var isHave=false;
      for(var i=0;i<this.tableData.length;i++){
        if(this.tableData[i].goodsId == goods.goodsId){ //如果tableData中的id与点击的商品id相同，就进入true
          isHave=true;
        }
      }

      //根据判断的值编写业务逻辑
      if(isHave){
        //如果存在，就改变商品的数量
        let tb =[]      //当tableData中存在商品是，新建一个数组
        for( let i=0;i<this.tableData.length;i++){  //遍历这个tableData
          tb.push(this.tableData[i].goodsId);   //往数组里面添加点击的goodsId
        }
        let indexId = tb.indexOf(goods.goodsId)
        //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        //获取当前所点击的goodsId，然后在数组中找到这条数据
        this.tableData[indexId].count++
        //将获取的这个数据的id的count加一
      }else{
        let newGoods={
          goodsId:goods.goodsId,
          goodsName:goods.goodsName,
          price:goods.price,
          count:1
        }
        this.tableData.push(newGoods);
      };
      this.getAllGoods();
      //汇总金额和数量
        // this.tableData.forEach((element)=>{
        //   this.totalCount+=element.count;
        //   this.totalMoney=this.totalMoney+(element.price*element.count);
        // });
    },
    //删除单个商品
    delsingleGoods(goods){
      this.tableData=this.tableData.filter(o=>o.goodsId != goods.goodsId);
      this.getAllGoods();
    },
    //删除全部商品
    delallGoods(){
      this.tableData = [];
      this.totalMoney = 0;
      this.totalCount = 0;
    },
    //重计算总金额和总数量
    getAllGoods(){
      this.totalMoney = 0;
      this.totalCount = 0;
      if(this.tableData){
        this.tableData.forEach((element)=>{
        this.totalCount+=element.count;
        this.totalMoney=this.totalMoney+(element.price*element.count);
        });
      }
    },
    //模拟结账功能
    checkOut(){
      if(this.totalCount !=0 ){
        this.tableData = [];
        this.totalMoney = 0;
        this.totalCount = 0;
        this.$message({
          message: '结账成功！Oh-Yeah！',
          type:'success'
        })
      }else{
        this.$message.error('未点单任何商品，不能结账！')
      }
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
    width: 16%;
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
  .totalDiv{
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #e5e9f2;
  }
  .totalDiv span{
    margin: 0 10px
  }
  .totalDiv i{
    margin: 0 6px;
    color: #58b7ff
  }
</style>
