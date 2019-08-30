<template>
  <div>
    <blog-header ref="blogHeader"></blog-header>
    <br/>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="f_ac_name">
          form.f_ac_name
        </el-form-item>
        <el-form-item label="活动人数" prop="f_ac_usernum">
          <el-input v-model="form.f_ac_usernum"></el-input>
        </el-form-item>
        <!--<el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="开始时间" prop="date1">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="date2">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.date2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="报名截止" prop="date3">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.date3" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

       <!-- <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item label="活动详情">
          <el-input type="textarea" v-model="form.f_ac_desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="onBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <br/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
  import blogHeader from '@/components/common/BlogHeader.vue'
  import blogFooter from '@/components/common/BlogFooter.vue'
  export default {
    name: 'AcView',
    // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
    components: { blogHeader, blogFooter },
    data() {
      return {
        form: {
          f_ac_name: '',
          f_ac_usernum: '',
          date1: '',
          date2: '',
          date3: '',
          f_ac_desc: ''
        },
        rules: {
          f_ac_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          f_ac_usernum: [
            { required: true, message: '请输入人数', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          date3: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '提交中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$axios
              .post('/acAdd', this.form)
              .then(successResponse => {
              this.responseResult = successResponse;//JSON.stringify(successResponse.data.list)
            console.log(successResponse);
            loading.close();
            if (successResponse.status === 200 && this.responseResult.data.code===200) {
              this.$message({
                message: '新增成功!',
                type: 'success'
              });
            }else{
              this.$message.error('新增失败!'+successResponse.message);
            }
            }).catch(failResponse => {
                this.$message.error('新增失败!');
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      onBack() {
        this.$router.replace({path: '/index'});
      }
    },
    mounted(){
      //获取传入的参数
      var param = this.$route.query;
      this.$refs.blogHeader.initPage(param.key);
    }
  }
</script>
