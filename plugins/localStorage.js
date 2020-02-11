import createpersistedState from  "vuex-persistedstate"
export   default ({store})  => {
    window.onNuxtReady(()=>{
        createpersistedState({
            key:"store",    //读取本地存储的数据到store
        }) (store)
    })
}