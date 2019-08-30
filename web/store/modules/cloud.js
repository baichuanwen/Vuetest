export default {
  state: {
      breads:[],
      curItem:{id:null},
    },
    mutations: {
      setBreads(state,item) {
        if(state.curItem.id==item.parentId){
          state.breads.push({
            name: item.fullName,
            id: item.id
          })
        }else{
          state.breads=[{
            name: item.fullName,
            id: item.id
          }]
        }
          state.curItem=item;
        },
      setCurItem(state, params) {
        state.curItem = params
      },
    },
    actions: {

    },
}
 //console.log(this.$store.commit("setSaveParam","aaaa"));
 //console.log(this.$store.state.demo)
//this.$store.dispatch("decrement")
