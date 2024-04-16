class Comment{
    constructor(author, date, description){
        this.author = author;
        this.date = date;
        this.description = description;
    }
    render(){
        const comTemplate = document.querySelector(".comment-template");
        const templateCopy = comTemplate.content.cloneNode(true);

        const author = templateCopy.querySelector(".comment-author-name");
        const addTime = templateCopy.querySelector(".comment-add-time");
        const description = templateCopy.querySelector(".comment-description");
        const container = templateCopy.querySelector(".comment-container");

        author.textContent = this.author;
        description.textContent = this.description;

        return container;
    }
}

export default Comment;
