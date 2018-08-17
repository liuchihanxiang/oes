import ajax from '@/utils/ajax'
export const baseUrl='/users'
//保存用户信息
export  function saveUser(type,data){
    return ajax({
        url:baseUrl,
        method:type,
        data:data
    })
}
//保存用户角色
export  function saveUserRoles(data){
    return ajax({
        url:baseUrl+'/grantRoles',
        method:'post',
        data:data
    })
}
//获取单个用户信息
export  function getSingleUser(id,data){
    return ajax({
        url:baseUrl+'/'+id,
        method:'get',
        params:data
    })
}