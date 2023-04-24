<template>
  <div>
    <ComGroup title="兑换价颜色">
      <el-color-picker v-model="configData.exchangePriceColor" size="small" />
      <el-button type="text" class="mr-15" @click="configData.exchangePriceColor = initTxtColor">
        重置
      </el-button>
    </ComGroup>
    <!-- <ComGroup title="兑换按钮颜色">
      <el-color-picker v-model="configData.exchangeButtonColor" size="small" />
      <el-button
        type="text"
        class="mr-15"
        @click="configData.exchangeButtonColor = initTxtColor"
      >
        重置
      </el-button>
    </ComGroup> -->
    <ComGroup title="添加商品" />
    <ComGroup :content-block="true">
      <div class="up-pic-img-box">
        <draggable v-model="configData.productList" :options="{
          animation: 300,
          handle: '.up-pic-img',
          forceFallback: true,
          fallbackTolerance: 1
        }">
          <div v-for="(item, index) in configData.productList" :key="index" class="up-pic-img">
            <!-- <img :src="item.img" /> -->
            <div class="productname">
              {{ item.jvName }}
            </div>
            <i class="up-pic-item-delete el-icon-error" title="删除该项" @click="deleteProduct(index)" />
          </div>
        </draggable>
        <UpLoadBox add-place-holder="" :upload-file="false" @editImg="dialogProductVisible = true" />
      </div>
    </ComGroup>
    <!-- <ComGroup title="排序方式">
      <el-radio v-model="configData.sortType" label="customsort"
        >自定义排序</el-radio
      >
      <el-radio v-model="configData.sortType" label="stylesort"
        >系统排序</el-radio
      >
    </ComGroup>
    <ComGroup
      title="拖拽选择的商品即可调整其顺序"
      v-if="configData.sortType == 'customsort'"
    ></ComGroup>
    <div v-if="configData.sortType == 'stylesort'">
      <p class="priceSortType">
        <el-radio v-model="configData.priceSortType" label="order"
          >按兑换积分价顺序排序</el-radio
        >
      </p>
      <p class="priceSortType">
        <el-radio v-model="configData.priceSortType" label="reverse"
          >按兑换积分价倒序排序</el-radio
        >
      </p>
    </div> -->
    <ComGroup title="列表样式" :content-block="true" :select-value="selectStyle.name">
      <ComRadioGroup v-model="configData.listStyle" :radio-list="styleList" :content-block="true" />
    </ComGroup>
    <ComGroup title="是否显示划线价">
      <el-radio v-model="configData.markingPrice" :label="0">
        否
      </el-radio>
      <el-radio v-model="configData.markingPrice" :label="1">
        是
      </el-radio>
    </ComGroup>
    <ComGroup title="是否显示购买图标">
      <el-radio v-model="configData.purchase" :label="0">
        否
      </el-radio>
      <el-radio v-model="configData.purchase" :label="1">
        是
      </el-radio>
    </ComGroup>
    <!-- <ComGroup title="显示样式" :content-block="true">
      <el-radio v-model="configData.styleType" label="styleType1"
        >样式1</el-radio
      >
      <el-radio v-model="configData.styleType" label="styleType2"
        >样式2</el-radio
      >
      <el-radio v-model="configData.styleType" label="styleType3"
        >样式3</el-radio
      >
      <el-radio v-model="configData.styleType" label="styleType4"
        >极简</el-radio
      >
    </ComGroup>
    <ComGroup title="显示内容">
      <el-checkbox
        v-model="configData.showProduceName"
        :true-label="1"
        :false-label="0"
        >商品名称</el-checkbox
      >
    </ComGroup>
    <div v-if="configData.showProduceName == 1" class="onetwoline">
      <el-radio v-model="configData.lineShowType" label="onelineshow"
        >显示一行</el-radio
      >
      <el-radio v-model="configData.lineShowType" label="twolineshow"
        >显示两行</el-radio
      >
    </div>
    <p class="onetwoline">
      <el-checkbox
        v-model="configData.cornerMarker"
        :true-label="1"
        :false-label="0"
        >商品角标</el-checkbox
      >
    </p>
    <p class="onetwoline">
      <el-checkbox
        v-model="configData.originalPrice"
        :true-label="1"
        :false-label="0"
        >商品原价</el-checkbox
      >
    </p>
    <p class="onetwoline">
      <el-checkbox
        v-model="configData.purchaseButton"
        :true-label="1"
        :false-label="0"
        >购买按钮</el-checkbox
      >
    </p>
    <p class="onetwoline" v-if="configData.purchaseButton == 1">
      <el-radio v-model="configData.purchaseButtonType" label="buttontype1"
        >样式1</el-radio
      >
      <el-radio v-model="configData.purchaseButtonType" label="buttontype2"
        >样式2</el-radio
      >
    </p>
    <p class="onetwoline">
      <el-checkbox v-model="configData.newTag" :true-label="1" :false-label="0"
        >NEW标签(仅新创建商品有)</el-checkbox
      >
    </p>
    <ComGroup title="商品缺货控制">
      <el-radio v-model="configData.outOfStock" label="show">显示</el-radio>
      <el-radio v-model="configData.outOfStock" label="showBottom"
        >沉底显示</el-radio
      >
      <el-radio v-model="configData.outOfStock" label="hidden">隐藏</el-radio>
    </ComGroup>
    <ComGroup title="更多设置">
      <el-checkbox
        v-model="configData.beOverdue"
        :true-label="1"
        :false-label="0"
        >非兑换日期内商品隐藏</el-checkbox
      >
    </ComGroup> -->
    <DialogProduct :dialog-visible.sync="dialogProductVisible" select-type="multi" @selectSure="selectProduct" />
  </div>
</template>
<script>
import draggable from 'vuedraggable' // 拖拽元素
import ComGroup from '@/components/BasicUi/ComGroup'
import DialogProduct from '@/components/BasicDialog/DialogProduct'
import UpLoadBox from '@/components/BasicUi/UpLoadBox'
import ComRadioGroup from '@/components/BasicUi/ComRadioGroup'
export default {
  name: 'Product',
  components: { draggable, ComGroup, DialogProduct, UpLoadBox, ComRadioGroup },
  props: ['parmes'],
  data () {
    return {
      configData: JSON.parse(JSON.stringify(this.parmes)),
      initTxtColor: '#F5514B',
      dialogProductVisible: false,
      styleList: [
        {
          name: '一行一个',
          id: 'oneLineOne',
          icon: 'cuberow'
        },
        {
          name: '一行两个',
          id: 'oneLineTwo',
          icon: 'cuberow'
        },
        {
          name: '详细列表',
          id: 'listDetail',
          icon: 'cubeto',
          equalScale: true
        }
      ]
    }
  },
  // mounted() {},
  computed: {
    selectStyle () {
      return this.styleList.find(
        (item) => item.id === this.configData.listStyle
      )
    }
  },
  watch: {
    configData: {
      handler: function (newVal, oldVal) {
        // 更新组件配置数据
        this.$emit('editComponent', newVal)
      },
      deep: true
    }
  },
  methods: {
    selectProduct (list) {
      this.configData.productList.push(...list)
    },
    deleteProduct (index) {
      this.configData.productList.splice(index, 1)
    }
  }
}
</script>
<style lang="less" scoped>
.priceSortType {
  padding: 10px 15px;
}

.onetwoline {
  padding: 10px 15px;
  text-align: right;
}

.productname {
  padding: 5px;
  margin: 0 0 10px 0;
  cursor: move;
}

.up-pic-img {
  position: relative;
}

.up-pic-item-delete {
  visibility: visible;
}
</style>
