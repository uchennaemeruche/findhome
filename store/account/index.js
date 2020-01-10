import {firebase, usersCollection, functions} from '@/plugins/firebase';
import cookie from 'js-cookie';

export const state = () =>({
    user: {}
});

export const mutations = {
    setUser: (state, payload) =>{
        state.user = payload;
    },
    unsetUser:(state) =>{
        state.user = {};
    },
    setAccountType:(state, payload) =>{
        state.user.accType = payload;
        cookie.set('accType', payload)
    }
}

export const getters = {
    activeUser(state, getters){
        return state.user;
    }
}

export const actions = {
    async signup({ commit }, payload){
        let docData = {
            phone: payload.phone,
            status: 'active',
            accountType: payload.accType,
            displayName: payload.name,
            email: payload.email
        }
        return await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user =>{
            firebase.auth().onAuthStateChanged(user =>{
                if(user){
                    const updateNumber = user.updateProfile({
                        displayName: payload.name,
                        // phoneNumber: payload.phone,
                    })
                    const updateRecord = usersCollection.doc(user.uid).set(docData); 
                    const promises = [updateNumber, updateRecord];  
                    const finalPromise =  Promise.all(promises)   
                    finalPromise.then(results =>{
                        // let payload = {
                        //     phoneNumber: user.phoneNumber,
                        //     displayName: user.displayName,
                        //     email: user.email,
                        //     uid: user.uid
                        // }

                        // const token = user.getIdToken(); 
                        // console.log(" Token: ",token)
                        // cookie.set('access_token', token);

                        // commit('setUser', payload);
                        return results
                    }).catch(error =>{
                        return error;
                    })
                }
            })
            return user;
            
        }).catch(error =>{
            let errorMessage = error.message;
            let errorCode = error.code;
            return error;
        })
    },
    async login({ commit }, payload){
       return await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user =>{
         return user
       }).catch(err =>{
           return err;
       })
    },
    async googleOAuth({ commit }, payload){
        let provider = await new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });
        return await firebase.auth().signInWithPopup(provider).then(res =>{
            return res;
            // firebase.auth().onAuthStateChanged(user =>{
            //     if(user){
            //         return user;   
                    
            //     }
            // })
        }).catch(err =>{
            console.log(err)
        })
        // console.log(provider)
    },
    loginWithFacebook({ commit }, payload){
        var user = firebase.auth().currentUser;
        console.log("Logged In User: ", user)
        
        // let provider = new firebase.auth.FacebookAuthProvider();
        // provider.addScope('user_birthday');
        // firebase.auth().signInWithPopup(provider).then(function(result) {
        // // This gives you a Facebook Access Token.
        // let token = result.credential.accessToken;
        // // The signed-in user info.
        // let user = result.user;
        // console.log("Token: ", token)
        // console.log("User: ", user)
        // });
    },
    async logout({ commit }){        
        return await firebase.auth().signOut().then((res ) => {
            cookie.remove("access_token");
            cookie.remove("accType")
            commit('unsetUser')
        }).catch(function(error) {
            // An error happened.
        });
    },
    async updatePhoneAndAccountType({},payload){
        console.log(payload)
        return await usersCollection.doc(payload.uid).set({
            phone: payload.phone,
            status: 'active',
            accountType: payload.accType,
            displayName: payload.displayName,
            email: payload.email
        }).then(() =>{

        }).catch(() =>{

        })
    },
    setAdminRole({ commit }, payload){
        const addAdminRole = functions.httpsCallable('addAdminRole');
        return addAdminRole({email: payload}).then(result =>{
            return result;
        })
        
    },
    
}
