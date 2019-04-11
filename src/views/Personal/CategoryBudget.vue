<template>
  <div id="view-categoryBudget">
    <div class="main">
      <div class="item-categoryCard"
        v-for="(item, index) in categoryList"
        :key="item._id">
        <category-card
         :data="item">
          <span class="value">预算: {{item.budgetValue | currency}}</span>
          <van-button
            size="small"
            :style="{marginLeft: '4px'}"
            @click="handleEdit(index)">
            修改
          </van-button>
        </category-card>
      </div>
    </div>
    <money-dialog 
      v-model="isShowEdit" 
      :value="editingValue"
      @confirm="handleUpdateCategory"/>
	</div>
</template>

<script>
import { updateCategory, getCategoryList } from "../../api/api.js";
export default {
  name: "personal-categoryBudgetEdit",
  data() {
    return {
      categoryList: [],
      editingIndex: 0,
      editingValue: 0,
      isShowEdit: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.initCategoryList();
    },
    initCategoryList() {
      getCategoryList({ type: 0, status: 1 }).then(res => {
        this.categoryList = res.data.list;
      });
    },
    handleUpdateCategory(budgetValue) {
      const data = {
        categoryId: this.categoryList[this.editingIndex]._id,
        budgetValue
      };
      updateCategory(data).then(res => {
        this.initCategoryList();
      });
    },
    handleEdit(index) {
      this.isShowEdit = true;
      this.editingIndex = index;
      this.editingValue = this.categoryList[index].budgetValue;
    },
    confirmBudget(value) {
      console.log('value: ', value);

    }
  }
};
</script>

<style lang="less">
@import "../../assets/variable.less";
#view-categoryBudget {
  .form-view();
  .van-cell-group {
    background-color: @grey;
    margin-top: 10px;
  }
  .item-categoryCard {
    margin: 6px 10px;
    .card-category_info {
      display: flex;
      align-items: center;
      margin-right: 8px;
    }
    .value {
      margin-right: 6px;
      color: @secondaryTextColor;
      font-size: 13px;
    }
  }
}
</style>