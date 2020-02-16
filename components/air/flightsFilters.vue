<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col  :span="3"  class="choose-button" >
            <el-button
            type="warning"
            size="mini"
            @click="handleChoose(data.id, item.seat_xid)">
            选定
            </el-button>
            </el-col>
            <el-col :span="8">
                单程： 
               {{data.info.departCity}} - {{data.info.destCity}}
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item,index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to} :00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in sizeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            sizeOptions:[
                {name:"大",size:"L"},
                {name:"中",size:"M"},
                {name:"小",size:"S"},
            ],
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
        }
    },
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            const arr = this.data.flights.filter(v =>
         v.org_airport_name === value);
            this.$emit("setDataList",arr)
            console.log(this.data);
            
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            const [from, to] = value.split(",");  //[6,12]
            const arr = this.data.flights.filter(v => {
                //出发事件小时
                const start = +v.dep_time.split(":")[0];
                return staet >= from && start < to;
            });
            this.$emit("setDataList",arr);
        },

         // 选择航空公司时候触发
        handleCompany(value){
            const arr = this.data.flights.filter(v =>
            v.airline_name === value );
            this.$emit("setDataList",arr);
        },

         // 选择机型时候触发
        handleAirSize(value){
           const arr = this.data.flights.filter(v =>
           v.plane_size === value);
           this.$emit("setDataList",arr)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport = "";
            this.flightTimes = "";
            this.company = "";
            this.airSize = "";

            this.$emit("setDataList", this.data.flifhts);
        },
        //选定按钮触发跳转
        handleChoose(id,seatId) {
            this. $router.push({
                path:'/air/order',
                query:{
                    id,
                    seat_xid:seatId
                }
            })           
        }
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>