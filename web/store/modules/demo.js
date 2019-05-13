export default {
    getters:{
      saveParams: state => {
        return state.sidebar
      },
    },
    state: {
       saveParams:{},
    },
    mutations: {
      setSaveParam(state, params) {
            state.saveParams = params
      },

    },
    actions: {
      decrement(commit,param){
        report.api.report.demo(param).then(res=>{
          commit("setSaveParam",res)
        })

      }

    },
}
 //console.log(this.$store.commit("setSaveParam","aaaa"));
 //console.log(this.$store.state.demo)
//this.$store.dispatch("decrement")
