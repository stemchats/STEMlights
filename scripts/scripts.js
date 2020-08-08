

db.collection('editions').get().then((snapshot)=>{

    snapshot.docs.forEach(doc => {
        console.log(doc.id, "=> ",);

// db.collection('editions').doc('edition15').collection('title').doc('title').data().header
    })

});

