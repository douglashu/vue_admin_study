
const tabs = {
  state: {
    historyTabs:[]
  },
  mutations: {
    UPDATED_HISTORY:(state,to)  => {
      // console.log(333,to);
      let key = to.name
      let arr = state.historyTabs;
      for(let i=0;i<arr.length;i++){
        let item = arr[i];
        if(key == item.name){
          return false
        }
      }
      state.historyTabs.push(to)
      // debugger
      // return 
    },
    DELECT_HISTORY: (state, dst) => {
        let key = dst.name;
        let arr = state.historyTabs;
        // debugger
        for(let i=0;i<arr.length;i++){
          let item = arr[i];
          if(key == item.name){
            arr.splice(i,1)
          }
        }
        state.historyTabs = arr
    }
  },
  actions: {
    // 更新tab记录
    UpdatedHistory: ({ commit },to) => {
      if(!to.name){return false};
      commit('UPDATED_HISTORY',to)
    },
    // 删除tab 记录
    DeledctHistory({ commit }, dst ) {
      if(!dst.name){return false};
      commit('DELECT_HISTORY', dst)
    },
    
  }
}

export default tabs
