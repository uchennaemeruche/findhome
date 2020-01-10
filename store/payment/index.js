import {firebase, db} from '@/plugins/firebase';

export const state = () =>({
    // user: {},
    // locations: [],
    // types:[],
    payments:[],
    allPayments:[],
    // propertyListings: [],
    // isFetching:true,
});

export const mutations = {
    setPayments: (state, payload) =>{
        state.payments = payload;
    },
    setAllPayments: (state, payload) =>{
        state.allPayments = payload;
    },
    
}

export const actions = {
    async addPaymentHistory({ commit }, payload){
        console.log("Action Called: ", payload)
        return await db.collection('payment-history').doc(payload.uid).collection('payments').add(payload.data).then(docRef =>{
            let response = {
                status:200,
                msg: `Payment History Updated with ID:, ${docRef.id}`
            }
            return response
        }).catch(err =>{
            let response = {
                status:400,
                msg: err.message
            }
            return response;
        })
    },
    async fetchPaymentsByUser({ commit }, payload){
        return new Promise((resolve, reject) =>{
            console.log("Subscription payload: ", payload)
            return db.collection('payment-history').doc(payload.id).collection('payments').onSnapshot(snapshot =>{
                let payments = []
                snapshot.forEach(doc =>{
                    payments.push({
                        id:doc.id, 
                        data: doc.data()
                    })
                })
                
                commit('setPayments', payments)
                resolve()
            })
        })
            
    },
    async fetchPayments({ commit }, payload){
        return new Promise(async (resolve, reject) =>{
            // Get reference to all of the documents
            console.log("Retrieving list of documents in collection");
            let collectionRef = db.collection('payment-history')
            let documents = await collectionRef.get();
            documents.forEach(async doc => {
                let payer
                return await db.collection('users').doc(doc.id).get().then(user =>{
                   payer = user.data()
                }).then(async () =>{
                return await collectionRef.doc(doc.id).collection("payments").get().then(subcollection =>{
                    let payments = []
                    subcollection.forEach(subCollectionDoc =>{
                        payments.push({
                            parentID:doc.id,
                            id:subCollectionDoc.id,
                            data: subCollectionDoc.data(),
                            payer: payer
                        })
                    })
                    commit('setAllPayments', payments)
                    console.log("All Payments: ", payments)
                    resolve()
                })
            })
            });
           
        })
    }
}