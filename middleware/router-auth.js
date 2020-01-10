export default function({store, route, redirect}){
    const user = store.state.account.user;
    const authRoute = /\/dashboard\/*/g;
    if(isEmpty(user) && route.path.match(authRoute)){
        redirect('/account/login')
    }
    else if(!isEmpty(user) && route.name == 'account-login' ){
        redirect('/dashboard')
    }
}

// export default function ({ store, redirect, route }) {
//     const user = store.state.account.user
//     // isEmpty(user) == false && route.name == 'account-login' ? redirect('/dashboard') : ''
//     // isEmpty(user) == false && isAuthRoute(route) ? redirect('/dashboard') : ''
//     // isEmpty(user) == true && isAuthRoute(route) ? redirect('/account/login') : ''
//     // isEmpty(user) == true && route.name == 'account-login' ? redirect('/account/login') : ''
// }
  
function isAuthRoute(route) {
    if (route.matched.some(record => record.path == '/dashboard')) {
        return true
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  