<template>
  <div ref="print-content" style="display: none">
    <table style="width: 100%;border-collapse: collapse;color: #222;">
      <thead style="page-break-after: always">
        <th
          style="text-align: center;border: 1px solid #444;"
          :style="{ color, 'font-size': fontSize, padding }"
          v-for="(item, index) in props"
          :key="index"
        >
          {{ item.label }}
        </th>
      </thead>
      <tbody cellpadding="0" cellspacing="0">
        <tr v-for="(item, index) in list" :key="index">
          <td
            style="text-align: center;border: 1px solid #444;word-wrap: break-word;word-break: normal;min-width: 50px;"
            :style="{ color, 'font-size': fontSize, padding, 'max-width': property.width }"
            v-for="(property, i) in props"
            :key="i"
            v-html="getValue(item, property, index)"
          >
            <!-- {{ getValue(item, property, index) }} -->
          </td>
        </tr>
      </tbody>
    </table>
    <iframe ref="iframe" frameborder="0" style="display: none"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    //字体颜色
    color: {
      default: '#333'
    },
    //字体大小
    fontSize: {
      default: '15px'
    },
    //单元格padding
    padding: {
      default: '15px 0px'
    },
    //list 为表格的列表数据
    list: {
      default() {
        return []
      }
    },
    /*
    props 数据结构 （index , label, width）
    
    index为每列的索引字段 ，label为每列的表头中文，width为每列宽度 
    [{
        index: 'index',
        label: '序号',
        width: '70px'
    },
    {
        index: 'name',
        label: '联系人',
        width: '30%'
    }]
    */
    props: {
      default() {
        return []
      }
    }
  },
  methods: {
    getValue(item, property, i) {
      let value = ''
      if(property.index instanceof Array) {
        value = []
        for(let i in property.index) {
          let single = property.index[i]
          value.push(item[single])
        }
      } else {
        value = item[property.index]
      }
      if(property.custom) {
        return property.custom(value, item)
      }
      if (property.index == 'index') {
        value = parseInt(i) + 1
      }
      return value
    },
    print() {
      let content = this.$refs['print-content'].innerHTML
      let iframe = this.$refs['iframe']
      let iframeDocument = iframe.contentWindow
      iframeDocument.document.body.innerHTML = ''
      iframeDocument.document.write(content)
      iframeDocument.focus()
      iframeDocument.print()
    }
  }
}
</script>

<style>
</style>