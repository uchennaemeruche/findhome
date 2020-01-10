const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


exports.addAdminRole = functions.https.onCall((data, context) =>{
    // Get user and add admin custom claim
    return admin.auth().getUserByEmail(data.email).then(user =>{
        return admin.auth().setCustomUserClaims(user.uid, {
            admin:true
        });
    }).then(() =>{
        return {
            message: `Success!!, ${data.email} has been made an admin`
        }
    }).catch(err =>{
        return err;
    });
});

// exports.deleteImages = functions.firestore.document('property-listing/{id}')
//     .onDelete((snap, context) =>{
//         // const docId = context.params;
//         console.log("Front Image Name: ", snap.data().frontViewImageName)
//         console.log("Rear Image Name: ", snap.data().rearViewImageName)
//         // const frontImage = snap.data().frontViewImageName;
//         // const rearImage = snap.data().rearViewImageName;
//         // const bucket = firebase.storage().bucket()
//         // var frontStorageRef = admin.storage().ref().child(`properties/${frontImage}`);
//         // var rearStorageRef = admin.storage().ref().child(`properties/${rearImage}`);

//         let images = [snap.data().frontViewImageName, snap.data().rearViewImageName ]
        
//         const bucket = admin.storage().bucket('properties');

//         const imagesRemovePromises = images.map((imagePath) => {
//           return bucket.file(imagePath).delete();
//         });
        
//     });
exports.fetchUser = functions.https.onCall((data, context) =>{
    var db = admin.firestore();
    // Get user and add admin custom claim
    // let acctUser = [];
    var myUser = Promise.all([
        admin.auth().getUser(data.uid).then(user =>{
            return user;
        }),
        db.collection('users').doc(data.uid).get().then(data => {
           return data;
        })
    ])
    return myUser;
    // return admin.auth().getUser(data.uid).then(user =>{
    //     acctUser.push(user)
    //     return db.collection('users').doc(data.uid).get().then(data => {
    //         acctUser.push(data)
    //     })
    // }).then(() =>{
    //     return acctUser;
    // }).catch(err =>{
    //     return err;
    // });
})
