<template>
    <ul class="myUi1">
        <li v-for="(item,index) in data" :key="index">
            <a :href="item.downUrl" v-if="res"><div class="down"></div></a>
            <div v-if="!res" class="lit"></div>
            <img class="iwimg" v-if="res" src="../../../assets/icon_word.png"/>
                {{item.title}}
            <div class="nd"><span class="name">{{item.name}}</span><span class="date">{{item.date}}</span>
                <img class="idownimg" v-if="res" src="../../../assets/downlod.png"/>
                <span v-if="count" class="count">50</span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    props:{
        res:{
            type:Boolean,
            default:false
        },
        data:{
            type:Array,
            default: function () { return [] }
        },
        count:{
            type:Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped lang="scss">
ul{
        margin-top: 18px;
    li {
        position: relative;
        font-size: 14px;
        font-weight: 400;
        color: rgba(68, 68, 68, 1);
        list-style: none;
        text-align: left;
        .down{
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .iwimg{
            vertical-align: middle;
            margin-right: 4px;
        }
        .lit {
            display: inline-block;
            width: 4px;
            height: 4px;
            background: rgba(0, 140, 250, 1);
            margin-right: 7px;
        }

        .nd {
            display: inline-block;
            float: right;

            .name {
                font-size: 14px;
                color: rgba(0, 140, 250, 1);
                margin-right: 70px;
            }

            .date {
                color: #AAAAAA;
            }
            .idownimg{
                margin-left: 50px;
            }
        }
    }
}
</style>
