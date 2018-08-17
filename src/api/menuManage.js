import ajax from '@/utils/ajax'

export const baseUrl='/permissions'

export  function getMenuList(username,password){
    return ajax({
        url:baseUrl+'/all',
        method:'get'
    })
}
//根据用户角色 获取角色拥有的菜单
export  function getMenuListByRoleId(roleId){
    return ajax({
        url:baseUrl,
        method:'get',
        params:{roleId:roleId}
    })
}

export  function getInfo(){
    return ajax({
        url:'/permissions/current',
        method:'get'
    })
}

export function logOut(){
    return ajax({
        url:'/logout',
        method:'post'
    })
}