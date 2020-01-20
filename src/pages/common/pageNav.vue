<template>
    <div class="elePage">
        <div class="eleInner">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPageNum"
                    :page-size="pageSize"
                    layout="slot,prev"
                    :total="total"
                    small=true
            >
                <el-button :disabled="firstPageBtnDisabled" class="first-pager" @click="toFirstPage">首页</el-button>
            </el-pagination>
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPageNum"
                    :page-size="pageSize"
                    layout="pager,next,slot"
                    :total="total"
                    small=true
            >
                <el-button :disabled="lastPageBtnDisabled" class="last-pager" @click="toLastPage">末页</el-button>
            </el-pagination>
            <div style="clear:both"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "pages",
        components: {},
        data() {
            return {
                currentPageNum: this.currentPage,
                firstPageBtnDisabled: true,
                lastPageBtnDisabled: false,
                lastPageNum: Math.ceil(this.total / this.pageSize)
            };
        },
        props: {
            currentPage: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            },
            total: {
                type: Number,
                default: 0
            }
        },
        watch: {
            total(newVal) {
                this.total = newVal;
                this.lastPageNum = Math.ceil(newVal / this.pageSize);
            }
        },
        created() {},
        methods: {
            handleCurrentChange(val) {
                this.firstPageBtnDisabled = val === 1 ? true : false;
                this.lastPageBtnDisabled = val === this.lastPageNum ? true : false;
                this.currentPageNum = val;
                this.$emit("handleCurrentChangeSub", val);
            },
            toFirstPage() {
                this.handleCurrentChange();
            },
            toLastPage() {
                this.currentPageNum = this.lastPageNum;
                this.handleCurrentChange(this.lastPageNum);
            }
        },
        mounted() {},
        destroyed() {}
    };
</script>
<style scoped lang="scss">
    .el-pagination {
        float: left;
    }
    .elePage{
        position: absolute;
        bottom: 60px;
        left: 0px;
        right: 0px;
        margin: auto;
        width: 534px;
        .el-pagination{
          font-weight: 400;
            .el-pager{
                li{
                    color: #666666;
                }
            }
        }
    }
</style>
<style lang="scss">
.elePage{
  .eleInner{
    display: inline-block;
  }
  .el-pagination{
      button{
        height: 32px;
        span{
            font-size: 14px;
        }
      }
    .btn-prev{
      .el-icon{
          font-size: 14px;
          width: 32px;
          height: 32px;
          line-height: 32px;
      }
    }
    .btn-next{
      .el-icon{
          font-size: 14px;
          width: 32px;
          height: 32px;
          line-height: 32px;
        }
      }
    .el-pager{
      li{
          color: #666666;
          font-size: 14px;
          width: 32px;
          height: 32px;
          line-height: 32px;
      }
    }
  }
}
</style>
