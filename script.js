let mainWrapperPost = document.getElementById('post-wrapperBlock');
let overLay = document.getElementById('overlay');
let overlayPost = document.getElementById('postContent');
let closePost = document.getElementById('close');

function ajax(url, callback) {
    let requistPost = new XMLHttpRequest();
    requistPost.open('GET', url);
    requistPost.addEventListener('load', function () {
        let dataResponse = JSON.parse(requistPost.responseText);
        callback(dataResponse);
    })
    requistPost.send();
}

function createPostRenderLogic(item) {
    const divWrapper = document.createElement('div');
    divWrapper.classList.add('posts');
    divWrapper.setAttribute('data-id', item.id);

    const h3Post = document.createElement('h3');
    h3Post.innerText = item.id;

    const h2Post = document.createElement('h2');
    h2Post.innerText = item.title;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete post';
    deleteButton.setAttribute('data-id', item.id);

    divWrapper.appendChild(h3Post);
    divWrapper.appendChild(h2Post);
    divWrapper.appendChild(deleteButton);

    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation();
        const id = event.target.getAttribute("data-id");
        let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        fetch(url, {
            method: "DELETE",
        })
            .then(() => divWrapper.remove());
    });

    divWrapper.addEventListener('click', function () {
        const id = divWrapper.getAttribute('data-id');
        overLay.classList.add('activeOverlay');
        overlayPost.innerHTML = ""; // Clear previous content
        let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        ajax(url, function (dataResponse) {
            let p = document.createElement('p');
            p.innerText = dataResponse.body;
            overlayPost.appendChild(p);
        });
    });

    mainWrapperPost.appendChild(divWrapper);
}

closePost.addEventListener('click', function () {
    overLay.classList.remove('activeOverlay');
    overlayPost.innerHTML = "";
});

ajax('https://jsonplaceholder.typicode.com/posts', function (dataResponse) {
    dataResponse.forEach(item => {
        createPostRenderLogic(item);
    });
});