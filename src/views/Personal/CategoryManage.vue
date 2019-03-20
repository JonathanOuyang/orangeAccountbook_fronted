<!--  -->
<template>
  <div id="view-categoryManage">
    <div class="categoryManage-header">
      <van-tabs color="#f6717d"
                v-model="type">
        <van-tab title="支出"></van-tab>
        <van-tab title="收入"></van-tab>
      </van-tabs>
    </div>
    <div class="list-categoryCard">
      <div class="item-categoryCard"
        v-for="item in [outList, inList][type]"
        :key="item._id">
        <category-card
         :data="item">
         <van-button
          size="small"
          @click.prevent="handleEdit(item)">
          编辑
        </van-button>
         <van-button
          size="small"
          :style="{marginLeft: '4px'}"
          @click.prevent="handleUpdateCategory(item._id, {status: 0})">
          禁用
        </van-button>
        </category-card>
      </div>
    </div>
    <div class="list-categoryCard" v-if="[closeOutList, closeInList][type].length">
      <div class="list-categoryCard_title">
        <div class="text">禁用分类</div>
      </div>
      <div class="item-categoryCard"
        v-for="item in [closeOutList, closeInList][type]"
        :key="item._id">
        <category-card
         :data="item">
         <van-button
          size="small"
          @click.prevent="handleEdit(item)">
          编辑
        </van-button>
         <van-button
        size="small"
        :style="{marginLeft: '4px'}"
        @click="handleUpdateCategory(item._id, {status: 1})">
        开启
      </van-button>
        </category-card>
      </div>
    </div>
    <van-dialog
      v-model="isShowEditName"
      show-cancel-button
      :before-close="beforeClose">
      <van-field
        v-model="editCategory.name"
        size="large"
        label="分类名"
        placeholder="请输入分类名"/>
    </van-dialog>
  </div>
</template>

<script>
import { getCategoryList, updateCategory } from "../../api/api.js";
export default {
  name: "category-manage",
  data() {
    return {
      type: 0,
      outList: [],
      closeOutList: [],
      inList: [],
      closeInList: [],
      isShowEditName: false,
      editCategory: {}
    };
  },

  created() {
    this.init();
  },

  computed: {},

  methods: {
    init() {
      this.initCategoryList();
    },
    initCategoryList() {
      getCategoryList().then(res => {
        this.outList = [];
        this.closeOutList = [];
        this.inList = [];
        this.closeInList = [];
        res.data.list.forEach(item => {
          if (item.status == 0) {
            if (item.type == 0) {
              this.closeOutList.push(item);
            } else if (item.type == 1) {
              this.closeInList.push(item);
            }
          } else if (item.status == 1) {
            if (item.type == 0) {
              this.outList.push(item);
            } else if (item.type == 1) {
              this.inList.push(item);
            }
          }
        });
      });
    },
    handleUpdateCategory(id, updateData, fn) {
      const data = {
        categoryId: id,
        ...updateData
      };
      updateCategory(data).then(res => {
        this.initCategoryList();
        fn && fn();
      });
    },
    handleEdit(data) {
      this.isShowEditName = true;
      this.editCategory = data;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        this.handleUpdateCategory(this.editCategory._id, {
          name: this.editCategory.name
        }, done);
      } else {
        done();
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/variable.less";
#view-categoryManage {
}
.categoryManage-header {
  border-bottom: 1px solid @dividerColor;
}
.list-categoryCard {
  margin: 20px 12px;
  .item-categoryCard {
    padding: 4px 0;
  }
  .list-categoryCard_title {
    display: flex;
    align-items: center;
    height: 50px;
    &::before, &::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: #eee;
    }
    .text {
      margin: 0 10px;
      font-size: 14px;
      color: @secondaryTextColor;
    }
  }
}
</style>