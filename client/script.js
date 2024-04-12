const postList = document.querySelector("#postList");

class Post{
    constructor(id, author, creationDate, title, likes, description, comments){
        this.id = id,
        this.author = author,
        this.creationDate = creationDate,
        this.title = title,
        this.likes = likes,
        this.liked = false;
        this.description = description,
        this.comments = comments;
        this.elements = this.render();
    }
    render(){
        const postTemplate = document.querySelector("#post-template");
        const templateCopy = postTemplate.content.cloneNode(true);

        const authorName = templateCopy.querySelector(".post-author-name");
        const title = templateCopy.querySelector(".post-title");
        const content = templateCopy.querySelector(".post-text-content");
        const likes = templateCopy.querySelector(".like-counter");
        const comments = templateCopy.querySelector(".comment-counter");

        const likeIcon = templateCopy.querySelector(".like-icon");
        likeIcon.addEventListener('click', ()=>{
            this.like();
        });

        authorName.textContent = this.author;
        title.textContent = this.title;
        if(this.description.length>=370) {
            content.textContent = this.description.substring(0, 370) + "...";
        }else{
            content.textContent = this.description;
        }
        likes.textContent = this.likes;
        comments.textContent = this.comments.length;

        postList.appendChild(templateCopy);

        return{
            likes,
            comments,
            likeIcon
        }
    }
    update(){
        this.elements.likes.textContent = this.likes;
        this.elements.comments.textContent = this.comments.length;
        if(this.liked){
            this.elements.likeIcon.name = "heart";
            this.elements.likeIcon.style.setProperty("color", "var(--accent-color)");
        }else{
            this.elements.likeIcon.name = "heart-outline";
            this.elements.likeIcon.style.setProperty("color", "var(--light-text)");
        }
    }
    like(){
        if(this.liked){
            this.likes--;
        }else{
            this.likes++;
        }
        this.liked = !this.liked;
        this.update();
    }
}

// const post = new Post(1, "lubiespac", 2, "tytul", 2, "lorem20", ["abc", "cba", "xyz"]);
// const post2 = new Post(1, "lubiespac2", 21372, "tytul2", 2132, "lorem202", ["abc2", "cba2", "xyz2"]);

