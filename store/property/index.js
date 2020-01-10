import {firebase, db} from '@/plugins/firebase';
function uploadFileAsPromise(imageFile) {   
    console.log("Function called: ", imageFile)
    // the return value will be a Promise
    var storageRef = firebase.storage().ref();
    return storageRef
        .child("images/props/" + imageFile.name)
        .put(imageFile)
        .then(async snapshot =>{
            console.log("Uploaded File: " + imageFile.name);
            return snapshot.ref.getDownloadURL().then(async downloadUrl =>{
                console.log("File Available at: ", downloadUrl)
                return await downloadUrl
            })
        }).catch(error =>{
            console.log("Upload failed:", imageFile.name, error.message);
        })
}
export const state = () =>({
    user: {},
    locations: [],
    types:[],
    categories:[],
    propertyListings: [],
    userPropertyListings:[],
    isFetching:true,
});

export const mutations = {
    setCategory: (state, payload) =>{
        state.categories = payload;
    },
    setType: (state, payload) =>{
        state.types = payload;
    },
    setLocation: (state, payload) =>{
        state.locations = payload;
    },
    setPropertyListing: (state, payload) =>{
        state.propertyListings = payload;
    },
    setStatus:(state, payload) =>{
        state.isFetching = payload.isFetching;
    },
}

export const getters = {
    categories(state, getters){
        return state.categories;
    },
    types(state, getters){
        return state.types;
    },
    locations(state, getters){
        return state.locations;
    },
}
export const actions = {
    async createItems({ commit }, payload){
        let collectionName;
        if(payload.collection == "category"){
            collectionName = "categories"
        }else if(payload.collection == "types"){
            collectionName = "property-types"
        }else if(payload.collection == "locations"){
            collectionName = "property-locations"
        }
        return await db.collection(collectionName).add({
            name: payload.name
        }).then(docRef =>{
            let response = {
                status:200,
                msg: `New Item created with ID:, ${docRef.id}`
            }
            return response
        }).catch(err =>{
            let response = {
                status:400,
                msg: err.message
            }
            return response;
        })
        // if(payload.collection == "category"){
        //     db.collection('categories').add({
        //         name: payload.name
        //     }).then(docRef =>{
        //         console.log("New Property Category created with ID:", docRef.id)
        //     }).catch(err =>{
        //         console.log("Propety Category Error: ",err)
        //     })
        // }else if(payload.collection == "types"){
        //     db.collection('property-types').add({
        //         name: payload.name
        //     }).then(docRef =>{
        //         console.log("New Property Type created with ID:", docRef.id)
        //     }).catch(err =>{
        //         console.log("Property Type Error: ", err)
        //     })
        // } else if(payload.collection == "locations"){
        //     db.collection('property-locations').add({
        //         name: payload.name
        //     }).then(docRef =>{
        //         console.log("New Propety Location added with ID: ", docRef.id)
        //     }).catch(err =>{
        //         console.log("Property Location Error: ", err)
        //     })
        // }
    },
    async updateItem({ commit }, payload){
        let collectionName;
        if(payload.collection == "category"){
            collectionName = "categories"
        }else if(payload.collection == "types"){
            collectionName = "property-types"
        }else if(payload.collection == "locations"){
            collectionName = "property-locations"
        }
        return await db.collection(collectionName).doc(payload.id).update({name:payload.name}).then(docRef =>{
            let response = {
                status:200,
                msg: `Item updated successfully!!`
            }
            return response;
        }).catch(err =>{
            let response = {
                status:400,
                msg: err.message
            }
            return response;
        })
    },
    async deleteItem({ commit }, payload){
        let collectionName;
        if(payload.collection == "category"){
            collectionName = "categories"
        }else if(payload.collection == "types"){
            collectionName = "property-types"
        }else if(payload.collection == "locations"){
            collectionName = "property-locations"
        }else if(payload.collection == "property-listing"){
            collectionName = "property-listing"
        }
        return await db.collection(collectionName).doc(payload.id).delete().then(() => {
            let response = {
                status:200,
                msg: `Item deleted successfully!!`
            }
            return response;
        }).catch(err => {
            let response = {
                status:400,
                msg: err.message
            }
            return response;
        });
    },
    loadItems({ commit }){
        var landmarks = Promise.all([
            db.collection('categories').onSnapshot(snapshot =>{
                var categories = [];
                snapshot.forEach(doc =>{                    
                    categories.push({
                        id:doc.id, 
                        value:doc.id,
                        text:doc.data().name,
                        name: doc.data().name
                    })
                })
                commit('setCategory', categories)
                // console.log("Categories: ", categories)
            }),
            db.collection('property-types').onSnapshot(snapshot =>{
                var types = [];
                snapshot.forEach(doc =>{
                    types.push({
                        id: doc.id, 
                        name: doc.data().name,
                        value:doc.id,
                        text:doc.data().name
                    })
                })
                commit('setType', types)
                // console.log("Types: ", types)
            }),
            db.collection('property-locations').onSnapshot(snapshot =>{
                var locations = [];
                snapshot.forEach(doc =>{
                    locations.push({
                        id: doc.id, 
                        name: doc.data().name,
                        value:doc.id,
                        text:doc.data().name
                    })
                })
                commit('setLocation', locations)
                // console.log("Locations: ", locations)
            })
            
        ])
        return landmarks;
    },
    
    async uploadImages({commit}, payload){
        let otherViews = payload.images.others
        console.log(otherViews)
        // let storageRef = firebase.storage().ref();
        
        let imageUrls = [];
        let uploadMultiple = otherViews.map(async item => {
            console.log("Item to upload: ", item)
            var storageRef = firebase.storage().ref();
            return await storageRef.child("images/props/" + item.name).put(item).then(async snapshot =>{
                    console.log("Uploaded File: " + item.name);
                    return snapshot.ref.getDownloadURL().then(async downloadUrl =>{
                        console.log("File Available at: ", downloadUrl)
                        imageUrls.push(downloadUrl)
                    })
                }).catch(error =>{
                    console.log("Upload failed:", item.name, error.message);
                })
            // uploadFileAsPromise(item).then(async url =>{
            //     await imageUrls.push(item)
            // })
        })
        Promise.all(uploadMultiple).then(url => {
            console.log(`All success: ${url}`);
            console.log("Type of Other Views URL: ", typeof imageUrls)
            db.collection('images').add({
                title: "Image Upload Title",
                images: imageUrls
            }).then(docRef =>{
                console.log("New Image added with ref: ", docRef)
            })

            })
            .catch(error => {
              console.log(`Some failed: `, error.message);

              //Handle Failure some/all image upload failed             
            });

    },

    async addNewProperty({ commit }, payload){
        let frontView = payload.images.frontView
        let otherViews = payload.images.otherViews
        let frontViewUrl;
        let otherViewsUrl = [];
                    
        let storageRef = firebase.storage().ref();
        let frontViewFileName = frontView.name + '_' + new Date();

        let uploadFrontViewTask = await storageRef.child('properties/' + frontViewFileName).put(frontView)
            .then(function(res){
                return res.ref.getDownloadURL().then(function(url){
                    frontViewUrl = url;
                })
            })
        
        let uploadOtherViewsTask = otherViews.map(async item => {
            let storageRef = firebase.storage().ref();
            console.log("Item to upload: ", item)
            return await storageRef.child("properties/" + item.name).put(item).then(function(snapshot){
                    console.log("Uploaded File: " + item.name);
                    return snapshot.ref.getDownloadURL().then(function(downloadUrl){
                        // console.log("File Available at: ", downloadUrl)
                        otherViewsUrl.push(downloadUrl)
                    })
                }).catch(error =>{
                    console.log("Upload failed:", item.name, error.message);
                })
        })  
        Promise.all(uploadOtherViewsTask, uploadFrontViewTask).then(function(res) {
            console.log("Other Views URL: ", otherViewsUrl)
             db.collection('property-listing').add({
                title: payload.form.title,
                category: payload.form.category,
                type: payload.form.type,
                location: payload.form.location,
                road: payload.form.road,
                description: payload.form.description,
                price: payload.form.price,
                frontViewImage: frontViewUrl,
                otherViewsImage: otherViewsUrl,
                frontViewImageName: frontViewFileName,
                uploadedBy: payload.user.uid 
            }).then(docRef =>{
                console.log("Added: ", docRef)
                return `New Property Created with ID: ${docRef}`
            }).catch(err =>{
                console.log("An Error Occured: ", err)
                return `An error occured ${err}`
            })
        })         
    },
    // async addNewProperty({ commit }, payload){
    //     let frontView = payload.images.frontView
    //     let rearView = payload.images.rearView
    //     var frontViewUrl;
    //     var rearViewUrl;
            
    //     let storageRef = firebase.storage().ref();
    //     let frontViewFileName = frontView.name + '_' + new Date();
    //     let rearViewFileName = rearView.name + '_' + new Date();
    //     let uploadFrontViewTask = await storageRef.child('properties/' + frontViewFileName).put(frontView)
    //         .then(function(res){
    //             return res.ref.getDownloadURL().then(function(url){
    //                 frontViewUrl = url;
    //             })
    //         })
    //     let uploadRearViewTask = await storageRef.child('properties/' + rearViewFileName ).put(rearView)
    //         .then(function(snapshot){
    //             return snapshot.ref.getDownloadURL().then(function(url){
    //                 rearViewUrl = url;
    //             })
    //         })
        
    //     Promise.all([
    //         uploadFrontViewTask, uploadRearViewTask
    //     ]).then(async res => {
    //         return await db.collection('property-listing').add({
    //             title: payload.form.title,
    //             category: payload.form.category,
    //             type: payload.form.type,
    //             location: payload.form.location,
    //             road: payload.form.road,
    //             description: payload.form.description,
    //             price: payload.form.price,
    //             frontViewImage: frontViewUrl,
    //             rearViewImage: rearViewUrl,
    //             frontViewImageName: frontViewFileName,
    //             rearViewImageName: rearViewFileName,
    //             uploadedBy: payload.user.uid 
    //         }).then(docRef =>{
    //             console.log("Added: ", docRef)
    //             return `New Property Created with ID: ${docRef}`
    //         }).catch(err =>{
    //             console.log("An Error Occured: ", err)
    //             return `An error occured ${err}`
    //         })
    //     })         
    // },
    async loadPropertyListings({ commit }, payload){
        console.log("LoadProperty Listing Called")
        console.log("Property Payload:", payload)
        return new Promise((resolve, reject) =>{
            return db.collection('property-listing').onSnapshot(async snapshot =>{
                let propertyListings = [];
                snapshot.forEach(async doc =>{ 
                    let data =  doc.data();
                    let id = doc.id;
                    await db.collection('categories').doc(data.category).get().then((category) =>{
                        data.categoryName = category.data().name
                    }).then(async () =>{
                        await db.collection('property-types').doc(data.type).get().then((type) =>{
                            data.typeName = type.data().name
                        }).then(async () =>{
                            await db.collection('property-locations').doc(data.location).get().then((location) =>{
                                data.locationName = location.data().name
                            }).then(async () =>{
                                await db.collection('users').doc(data.uploadedBy).get().then(user =>{
                                    data.accountType = user.data().accountType
                                    data.displayName = user.data().displayName
                                    data.email = user.data().email
                                    data.phone = user.data().phone
                                }).then(async () =>{ 
                                })
                            }); 
                        });
                    });
                    await propertyListings.push({ 
                        id:id,
                        data: data
                    })
                })
                await console.log("Property Listings: ", propertyListings)
                await commit('setPropertyListing', propertyListings)
                await resolve()
                
                
            })
        })
        
    },
    async loadPropertyListingsByUser({ commit }, payload){
        console.log("LoadProperty Listing Called")
        console.log("Property Payload:", payload)
        return new Promise((resolve, reject) =>{
            let collectionRef = db.collection('property-listing').where('uploadedBy', '==', payload.user.uid)
            return collectionRef.onSnapshot(async snapshot =>{
                let propertyListings = [];
                snapshot.forEach(async doc =>{ 
                    let data =  doc.data();
                    let id = doc.id;
                    await db.collection('categories').doc(data.category).get().then((category) =>{
                        data.categoryName = category.data().name
                    }).then(async () =>{
                        await db.collection('property-types').doc(data.type).get().then((type) =>{
                            data.typeName = type.data().name
                        }).then(async () =>{
                            await db.collection('property-locations').doc(data.location).get().then((location) =>{
                                data.locationName = location.data().name
                            }).then(async () =>{
                                await db.collection('users').doc(data.uploadedBy).get().then(user =>{
                                    data.accountType = user.data().accountType
                                    data.displayName = user.data().displayName
                                    data.email = user.data().email
                                    data.phone = user.data().phone
                                }).then(async () =>{ 
                                })
                            }); 
                        });
                    });
                    await propertyListings.push({ 
                        id:id,
                        data: data
                    })
                })
                // await console.log("Property Listings: ", propertyListings)
                await commit('setPropertyListing', propertyListings)
                await resolve()
                
                
            })
        })
       
    },
    async updateProperty({ commit }, payload){
        let frontView = payload.images.frontView
        let rearView = payload.images.rearView
        var frontViewUrl;
        var rearViewUrl;

        let storageRef = firebase.storage().ref();
        let tasks = [];

        let uploadFrontViewTask
        let uploadRearViewTask

        // console.log(" TYpe of Front View: ", typeof frontView)
        // console.log(" TYpe of Rear View: ", typeof rearView)

        
        if(typeof frontView == "object"){
            uploadFrontViewTask = await storageRef.child('properties/'+ frontView.name + '_' + new Date()).put(frontView)
                    .then(function(res){
                        return res.ref.getDownloadURL().then(function(url){
                            // console.log("New FRONT URL: ", url)
                            frontViewUrl = url;
                        })
                    })
        }
        if(typeof rearView == "object"){
            uploadRearViewTask = await storageRef.child('properties/'+ rearView.name + '_' + new Date()).put(rearView)
                .then(function(snapshot){
                    return snapshot.ref.getDownloadURL().then(function(url){
                        // console.log("New REAR URL: ", url)
                        rearViewUrl = url;
                    })
                })
        }

        let data = {
            title: payload.form.title,
            category: payload.form.category,
            type: payload.form.type,
            location: payload.form.location,
            road: payload.form.road,
            description: payload.form.description,
            price: payload.form.price,
            frontViewImage: frontViewUrl,
            rearViewImage: rearViewUrl
        }
        if(payload.newImages == true){
            if((payload.newFrontView == true) && (payload.newRearView == false)){
                tasks.push(uploadFrontViewTask);
                data.rearViewImage = rearView;
            }else if((payload.newRearView == true) && (payload.newFrontView == false)){
                tasks.push(uploadRearViewTask);
                data.frontViewImage = frontView;
            }else if((payload.newFrontView == true) && (payload.newRearView == true) ){
                tasks.push(uploadFrontViewTask, uploadRearViewTask)
            }
            Promise.all(tasks).then(async res => {
                return await db.collection('property-listing').doc(payload.docID).update(data).then(docRef =>{
                    console.log("Updated successfully: ", docRef)
                    return `New Property Created with ID: ${docRef}`
                }).catch(err =>{
                    console.log("An Error Occured: ", err)
                    return `An error occured ${err}`
                })
            })
        }else{    
            data.frontViewImage = frontView;
            data.rearViewImage = rearView;
            return await db.collection('property-listing').doc(payload.docID).update(data).then(docRef =>{
                console.log("Updated: ", docRef)
                return `New Property Created with ID: ${docRef}`
            }).catch(err =>{
                console.log("An Error Occured: ", err)
                return `An error occured ${err}`
            })
        }
        
    },
    async searchProperty({ commit }, payload){
        console.log("SearchProperty Listing Called")
        return new Promise( async(resolve, reject) =>{
            let prop;
            if((payload.type != "") && (payload.location != "")){
                prop = db.collection('property-listing')
                    .where('type', '==', payload.type).where('category', '==', payload.category)
                    .where('location', '==', payload.location);
            }else if(payload.type == "" && payload.location != ""){
                prop = db.collection('property-listing')
                    .where('category', '==', payload.category)
                    .where('location', '==', payload.location);
            }else if(payload.location == "" && payload.type != ""){
                prop = db.collection('property-listing')
                    .where('type', '==', payload.type)
                    .where('category', '==', payload.category);
            }else{
                prop = db.collection('property-listing')
                    .where('category', '==', payload.category);
            }
            await prop.get().then(snapshot =>{
                var propertyListings = [];
                snapshot.forEach(async doc =>{ 
                    let data = doc.data();
                    await db.collection('categories').doc(data.category).get().then((category) =>{
                        data.categoryName = category.data().name
                    });
                    await db.collection('property-types').doc(data.type).get().then((type) =>{
                        data.typeName = type.data().name
                    });
                    await db.collection('property-locations').doc(data.location).get().then((location) =>{
                        data.locationName = location.data().name
                    });
                    await db.collection('users').doc(data.uploadedBy).get().then(user =>{
                        data.accountType = user.data().accountType
                        data.displayName = user.data().displayName
                        data.email = user.data().email
                        data.phone = user.data().phone
                    })                   
                    propertyListings.push(
                        {id:doc.id, data: data})
                })
                commit('setPropertyListing', propertyListings)
                console.log("Property Listings: ", propertyListings)
                resolve()
            })
            
        })
    },
    async refreshPropertySearch({ commit }, payload){
        console.log("ewfreshProperty Listing Called")
        return new Promise(async (resolve, reject) =>{
            var prop
            if(payload){
                prop = db.collection('property-listing').where('category', '==', payload.trim());
            }else{
                prop = db.collection('property-listing');
            }
            await prop.get().then(snapshot =>{
                var propertyListings = [];
                snapshot.forEach(async doc =>{ 
                    let data = doc.data();
                    await db.collection('categories').doc(data.category).get().then((category) =>{
                        data.categoryName = category.data().name
                    });
                    await db.collection('property-types').doc(data.type).get().then((type) =>{
                        data.typeName = type.data().name
                    });
                    await db.collection('property-locations').doc(data.location).get().then((location) =>{
                        data.locationName = location.data().name
                    });
                    await db.collection('users').doc(data.uploadedBy).get().then(user =>{
                        data.accountType = user.data().accountType
                        data.displayName = user.data().displayName
                        data.email = user.data().email
                        data.phone = user.data().phone
                        
                        // data.uploadInfo = info
                    })                           
                    propertyListings.push(
                        {id:doc.id, data: data})
                })
                commit('setPropertyListing', propertyListings)
                console.log("Property Listings: ", propertyListings)
                resolve()
            })
            
        })
    }
}