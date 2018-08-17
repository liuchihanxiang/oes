import ajax from '@/utils/ajax'

export  function login(username,password){
    return ajax({
        url:'/login',
        method:'post',
        data:{
            username,
            password
        }
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