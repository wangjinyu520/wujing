<template>
  <!-- 批量导入 -->
  <div v-if="dialogVisible">
    <el-dialog ref="dialog" :title="title" :visible.sync="dialogVisible" width="350px">
      <div>
        <el-form label-width="70px">
          <el-form-item label="模板：" prop="name" v-if="download">
            <a class="download" :href="downloadUrl" target="_blank">点击下载</a>
          </el-form-item>
          <el-form-item label="上传文件：" prop="name">
            <Upload :mode="3" :importUrl="importUrl" @change="change" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm()" :loading="loading">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "导入",
    },
    downloadUrl: "",
    importUrl: "",
    type: "",
    memberGroupType: "",
    merchantId: {
      default: false,
    },
    download: {
      //显示隐藏模板下载
      default: true,
    },
  },
  data() {
    return {
      file: "",
      dialogVisible: false,
      loading: false,
    };
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.file = "";
      }
    },
  },
  methods: {
    change(file) {
      this.file = file;
    },
    confirm() {
      let t = this;
      if (!this.file) {
        this.$message.warning("请添加模板文件");
        return;
      }
      this.loading = true;
      let type = this.type;
      let url = (process.env.BASE_URL || BASEURL) + this.importUrl;
      let formData = new FormData();
      if (type) {
        formData.append("type", type);
      }
      if (this.memberGroupType) {
        formData.append("memberGroupType", this.memberGroupType);
      }
      formData.append("excelFile", this.file);
      if (this.merchantId && this.$store.state.merchantId) {
        formData.append("merchantId", this.$store.state.merchantId || "");
      }

      let xhr = new XMLHttpRequest();
      xhr.open("post", url, true);

      xhr.setRequestHeader("guardId", this.$store.state.userInfo.guardId || "");
      xhr.setRequestHeader("token", this.$store.state.token);
      xhr.addEventListener("readystatechange", function () {
        let result = xhr;
        if (result.status !== 200) {
          // error
          t.loading = false;
          t.$message.warning("导入失败！");
        } else if (result.readyState === 4) {
          // finished
          t.loading = false;
          let res = JSON.parse(result.response);
          if (res.ok) {
            t.close();
            t.$emit("success", type);
          } else {
            t.$message.warning(res.message);
          }
        }
      });
      xhr.send(formData);
    },
    open() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.download {
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid #ebebeb;
  font-size: 12px;
  &:hover {
    color: #3388ff;
    border-color: #5399fa;
  }
}
</style>