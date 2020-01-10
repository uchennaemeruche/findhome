import { firebase, usersCollection } from '@/plugins/firebase';
import cookie from 'js-cookie';

// async function context(context){
//     const { store } = context;
//         firebase.auth().onAuthStateChanged( async user =>{
//             if(user){                                          
//                 let token;
//                 user.getIdToken(true).then(idToken =>{
//                     token = idToken;
//                     cookie.set('access_token', idToken)
//                 }).catch(error =>{
//                     cookie.remove('access_token')
//                 });
//                 let savedCookie = cookie.get('access_token')
//                 // console.log("Token Here: ", token)
//                 if(token){
//                     cookie.set('access_token', token)
//                 }
                
//                 let userAdmin;

//                 await user.getIdTokenResult().then(idTokenResult =>{
//                     userAdmin = idTokenResult.claims.admin
//                     user.admin = idTokenResult.claims.admin
//                 })
                
//                 let payload = {
//                     phoneNumber: user.phoneNumber,
//                     displayName: user.displayName,
//                     email: user.email,
//                     uid: user.uid,
//                     admin: user.admin
//                 } 
//                 store.commit('account/setUser', payload)
//                 // resolve()
//             }
//             return;
//             // return resolve()
//         })
//     // })
// }

// export default context;
export default context =>{
    const { store } = context;
    return new Promise((resolve, reject) =>{
        firebase.auth().onAuthStateChanged(async user =>{
            if(user){                                          
                let token;
                user.getIdToken(true).then(idToken =>{
                    token = idToken;
                    cookie.set('access_token', idToken)
                }).catch(error =>{
                    cookie.remove('access_token')
                });
                let savedCookie = cookie.get('access_token')
                // console.log("Token Here: ", token)
                if(token){
                    cookie.set('access_token', token)
                }
                
                let userAdmin;

                await user.getIdTokenResult().then(idTokenResult =>{
                    userAdmin = idTokenResult.claims.admin
                    user.admin = idTokenResult.claims.admin
                })
                
                let payload = {
                    phoneNumber: user.phoneNumber,
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    admin: user.admin
                } 
                store.commit('account/setUser', payload)
                resolve()
            }
            return resolve()
        })
    })
}
