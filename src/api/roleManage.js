import ajax from '@/utils/ajax'

export const baseUrl='/roles'

export  function baseRole(type,data=null){
    return ajax({
        url:baseUrl,
        method:type,
        data:data
    })
}

export  function userRole(userId){
    return ajax({
        url:baseUrl,
        method:'get',
        params:{userId}
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