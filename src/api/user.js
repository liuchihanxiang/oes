import ajax from '@/utils/ajax'

export  function getuserList(queryParams){
    return ajax({
        url:'/user/list',
        method:'get',
        params:queryParams
    })
}
