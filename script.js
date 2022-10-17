let mainWrapperPost = document.getElementById('post-wrapperBlock');
let overLay = document.getElementById('overlay');
let overlayPost = document.getElementById('postContent');
let closePost = document.getElementById('close');



function ajax(url,callback) {
    let requistPost = new XMLHttpRequest();
    requistPost.open('GET',url);
    requistPost.addEventListener('load', function () {
        let dataResponse = JSON.parse(requistPost.responseText);
        callback(dataResponse);
    })
    requistPost.send();
}


//es (item)___iqneba satitaod yvela posti (array);
function createPostRenderLogic(item) {
    const divWrapper = document.createElement('div');
    divWrapper.classList.add('posts');

    //data.id და პოსტის აიდის მნიშვნელობა გახდა ერთი და იგივე
    divWrapper.setAttribute('data-id', item.id);
    
    //amas gadaecema (array)-dan ID;
    const h3Post = document.createElement('h3');
    h3Post.innerText = item.id;

    //amas gadaecema (array)-dan title;
    const h2Post = document.createElement('h2');
    h2Post.innerText = item.title


    //teksti rom waishalos "gilakit"
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete post'
    deleteButton.setAttribute('data-id', item.id);

    //(div)-shi chavagdot (h3), anu igive ID;
    divWrapper.appendChild(h3Post);
    //(div)-shi chavagdot (h2), anu igive title;
    divWrapper.appendChild(h2Post);
    //(div)shi vagdeb "delete" buttons
    divWrapper.appendChild(deleteButton);



    //aq rodavacher "delete"-s gadaecema is konkretuli "id" da waishleba is posti
    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation();
        const id = event.target.getAttribute("data-id");
        let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        fetch(url, {
            method: "DELETE",
        })
        //ra minda rom moxdes roca davacher washlis gilaks
        .then( () => divWrapper.remove());
    });



    //რა უნდა მოხდეს (divwrapper)-ს როცა დავაკლიკებთ;
    //დაკლიკებით ვიღებთ (id)-ის მნიშვნელობას (1,2,3...)
    divWrapper.addEventListener('click', function (event) {
        const id = event.target.getAttribute('data-id');
        overLay.classList.add('activeOverlay');
        //rom gaigos romel posts davachiret da im (id)-ze gadavides
        let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        ajax(url, function() {
            let p = document.createElement('p');
            p.innerText = item.body;
            overlayPost.appendChild(p);
        })
    })        
    
        
   
 

    //exla es (div)-i unda chavagdot MTAVAR (div)-shi
    mainWrapperPost.appendChild(divWrapper);
    console.log(divWrapper);
}



closePost.addEventListener('click', function() {
    overlayPost.classList.remove('activeOverlay');
    overLay.innerText = " "
})

//tu warmatebit mivalt serverze es funqcia mashin gamoidzaxeba mxololod, es funqcia aris igive "callback", rogor zemot mivutitet "ajax"-s. 
ajax('https://jsonplaceholder.typicode.com/posts', function (dataResponse) {
    dataResponse.forEach(item => {
        createPostRenderLogic(item);
    });
    
});



// //stringi rom gadaviyvanot obieqtshi
// JSON.parse 
// //da tu obiekti gvinda gadaviyvano stringshi
// JSON.stringify

