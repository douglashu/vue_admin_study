<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-select v-model="searchTypeSelect" slot="prepend" placeholder="请选择">
          <el-option label="关键字" value="1"></el-option>
          <el-option label="作者" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <el-button type="danger" size="mini">全部删除</el-button>
       <el-button type="success" size="mini" :loading="downloadLoading" @click="_excelHander">导出excel</el-button>
    </el-card>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      stripe
      size="mini"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="预览量" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="下载量" width="110" align="center">
        <template slot-scope="scope">
          <span>1234</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleEditeClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleEditeClick(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-card class="paginationBox">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      keyWord: "", //..搜索的关键词
      searchTypeSelect: "", //搜索类型
      value: "",
      options: "",
      list: null,
      selectList:null,
      listLoading: true,
      downloadLoading:false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        this.list = response.data.items.splice(0, 10);
        this.listLoading = false;
      });
    },
    // 搜索操作
    search() {
      alert(1);
    },
    // 多选操作
    handleSelectionChange(val) {
      // console.log(val);
      this.selectList = val
    },
    // 查看操作
    handleClick(val) {
      console.log(val);
    },
    // 点击编辑
    handleEditeClick(val) {},
    // 点击导出excel
    _excelHander(){ 
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', '标题', '作者', '下载量', '状态','创建时间']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'status','display_time']
        const list =  this.selectList.length>=0?this.selectList: this.list  //若是选择性打印
        
        const data = this.formatJson(filterVal, list)
        // console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename:'图片列表',
          // autoWidth: this.autoWidth,
          // bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        // console.log(v)
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          //  console.log(v[j])
          return v[j]
        }
        //  return v
      }))
    }
  }
};
</script>

<style lang="scss" scoped>
.paginationBox {
  // text-align: center
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
