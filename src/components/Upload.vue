<template>
  <div class="upload">
    <!-- 单图片上传 -->
    <template v-if="mode == 1">
      <el-upload
        :disabled="disabled"
        style="width: 150px;padding-top: 5px;"
        class="avatar-uploader mode_1"
        :action="action"
        :show-file-list="false"
        :before-upload="handleBefore"
        :on-error="handleSuccess"
        :on-success="handleSuccess"
        v-loading="loading"
        :headers="headers"
        accept=".jpg, .jpeg, .png, .jpg, .jpeg"
      >
        <img
          v-if="mode_1.imageUrl"
          :src="mode_1.imageUrl"
          class="avatar"
          @click="showImage(mode_1.imageUrl)"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">{{ tip }}</div>
        <div slot="tip" class="el-upload__tip" v-if="tip">图片大小不得超过2MB</div>
      </el-upload>
    </template>
    <!-- 单文件上传 -->
    <template v-if="mode == 2">
      <el-upload
        class="upload-demo"
        :action="action"
        :on-preview="handlePreview"
        :on-change="handleChange1"
        :before-upload="handleBefore"
        :on-error="handleSuccess"
        :on-success="handleSuccess"
        v-loading="loading"
        :show-file-list="false"
        :limit="mode_2.limit"
        :file-list="mode_2.fileList"
        :headers="headers"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </template>
    <!-- 单文件导入 -->
    <template v-if="mode == 3">
      <el-upload
        class="upload-demo"
        :action="action"
        :auto-upload="false"
        :on-change="handleChange"
        :before-upload="handleBefore"
        :on-error="handleSuccess"
        :on-success="handleSuccess"
        v-loading="loading"
        :headers="headers"
        :limit="1"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </template>
    <!-- 多文件上传 -->
    <template v-if="mode == 4">
      <el-upload
        class="upload-demo"
        :action="action"
        :on-preview="handlePreview"
        :before-upload="handleBefore"
        :on-remove="handleRemove"
        :on-error="handleSuccess"
        :on-success="handleSuccess"
        multiple
        v-loading="loading"
        :headers="headers"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </template>

    <!-- 多图片上传 -->
    <template v-if="mode == 5">
      <div class="list-img">
        <el-upload
          :disabled="disabled"
          style="padding-top: 5px;"
          class="avatar-uploader mode_5"
          :action="action"
          :limit="mode_5.limit"
          :show-file-list="true"
          :before-upload="handleBefore"
          :on-remove="handleRemove"
          :on-error="handleSuccess"
          :on-success="handleSuccess"
          :file-list="mode_5.fileList"
          list-type="picture-card"
          v-loading="loading"
          :headers="headers"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="el-upload__tip" style="line-height: 16px;">{{ tip }}</div>
      </div>
    </template>

    <el-dialog title="预览" :visible.sync="imageVisible" width="600px">
      <div style="text-align:center;">
        <img style="max-width: 100%;" :src="showImageUrl" alt />
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="imageVisible = false">关闭</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: (process.env.BASE_URL || BASEURL) + "/common/oss/single",
      mode_1: {
        imageUrl: ""
      },
      loading: false,
      imageVisible: false,

      mode_2: {
        fileList: [],
        limit: 5
      },
      mode_5: {
        fileList: [],
        limit: 5
      },
      //多文件上传
      mode_4: {
        fileList: []
      },
      //一次上传的文件个数
      uploadNumber: 0,
      //已上传完成文件个数
      alreadyNumber: 0,
      showImageUrl: "",
       headers: {
        token: this.$store.state.token,
      },
    };
  },
  props: {
    mode: {
      default: 1
    },
    defaultImage: {
      default: "",
      type: String
    },
    tip: {
      default: "",
      type: String
    },
    defaultFile: {
      default: "",
      type: String
    },
    importUrl: {
      default: "/common/oss/single",
      type: String
    },
    disabled: {
      default: false
    },
    value: {
      default: true
    },
    size: {
      default: 0,
      type: Number
    }
  },
  watch: {
    defaultImage: {
      immediate: true,
      handler(val) {
        this.mode_1.imageUrl = val;
        if (this.mode == 5) {
          this.mode_5.fileList = val;
        }
      }
    },
    defaultFile: {
      immediate: true,
      handler(val) {
        if (val) {
          this.mode_2.fileList = [
            {
              name: val,
              uid: "",
              url: val
            }
          ];
        } else {
          this.mode_2.fileList = [];
        }
      }
    }
  },
  created() {
    if (this.mode == 3) {
      this.action = (process.env.BASE_URL || BASEURL) + this.importUrl;
    }
  },
  methods: {
    handlePreview(file) {
      window.open(file.url, "_blank");
      console.log(file);
    },
    handleBefore(file, files) {
      if (this.size > 0) {
        let fileSize = file.size / 1024 / 1024 < this.size;
        if (!fileSize) {
          this.$message.error("文件大小不能超过" + this.size + "MB");
          return false;
        }
      }
      if (
        this.mode === 1 &&
        ["image/jpeg", "image/gif", "image/png", "image/bmp"].indexOf(
          file.type
        ) == -1
      ) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式");
        return false;
      }
      this.uploadNumber++;
      this.loading = true;
    },
    handleSuccess(res, file) {
      this.loading = false;
      if (res && res.code === 0) {
        this.handleMode(res.result, file);
      } else {
        this.$message.error(res.message);
      }
      // this.mode_1.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove(file, files) {
      console.log(file, files);
      if (this.mode == 4) {
        this.mode_4.fileList = this.mode_4.fileList.filter(item => {
          return item.uid != file.uid;
        });
      } else if (this.mode == 5) {
        this.$emit("update:defaultImage", files);
      }
    },
    handleChange(file, fileList) {
      if (this.mode == 3 || this.mode == 2) {
        //导入
        this.$emit("change", file.raw);
      }
    },
    handleChange1(file, fileList) {
      if (fileList.length > 0) {
        this.mode_2.fileList = [fileList[fileList.length - 1]];
      }
    },
    handleMode(res, file) {
      if (this.mode == 1) {
        this.mode_1.imageUrl = res;
        this.$emit("update:defaultImage", res);
        // this.$emit('uploadSuccess', res)
      } else if (this.mode == 2) {
        this.Notify("上传成功");
        this.$emit("update:defaultImage", res);
      } else if (this.mode == 3) {
        this.Notify("上传成功");
        this.$emit("update:defaultImage", res);
      } else if (this.mode == 4) {
        file.url = res;
        this.mode_4.fileList.push(file);
        this.alreadyNumber++;
        this.$emit("uploadSuccess", {
          uploadNumber: this.uploadNumber,
          alreadyNumber: this.alreadyNumber
        });
        if (this.alreadyNumber == this.uploadNumber) {
          this.uploadNumber = 0;
          this.alreadyNumber = 0;
        }
        return;
      } else if (this.mode == 5) {
        this.mode_5.fileList.push({
          name: file.name,
          url: res,
          uid: file.uid
        });
        this.$emit("update:defaultImage", this.mode_5.fileList);
      }
    },
    showImage(url) {
      if (this.disabled) {
        this.imageVisible = true;
        this.showImageUrl = url;
      }
    }
  }
};
</script>

<style lang="scss">
.avatar-uploader.mode_1 {
  line-height: 12px;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>