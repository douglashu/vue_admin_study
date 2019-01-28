<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-input
        placeholder="请输入内容"
        size="mini"
        v-model="keyWord"
        class="input-with-select"
        style="width:250px"
      >
        <el-select v-model="searchTypeSelect" slot="prepend" placeholder="请选择">
          <el-option label="关键字" value="1"></el-option>
          <el-option label="作者" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-select v-model="value" size="mini" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="danger" size="mini">全部删除</el-button>
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
      <el-table-column label="缩略图" width="110" align="center">
        <template slot-scope="scope">
          <img
            style="width:100%;height:auto"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260405&di=d963897a17e8049b0a1d77f86cfbbb25&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fmiddle%2F53762aebgc52bec6f6fd1%26690"
            alt
          >
        </template>
      </el-table-column>
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
      listLoading: true
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
      console.log(val);
    },
    // 查看操作
    handleClick(val) {
      console.log(val);
    },
    // 点击编辑
    handleEditeClick(val) {}
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
