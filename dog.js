
class Dog{
    constructor(data){
        Object.assign(this, data);
    }

    setHasBeenLiked(u){
        this.hasBeenLiked = u;
    }

    getBadgeHtml(){
        if(this.hasBeenLiked === true){
            return `<img src="./images/badge-like.png" alt="">`
        } else if(this.hasBeenLiked === false){
            return `<img src="./images/badge-nope.png" alt="">`
        } else return ``;
        
    }

    getDogHtml(){
        const {name, avatar, age, bio} = this;
        return `
            <img class="img-dog" src="${avatar}" alt="">
            <div class="information">
                <h1>${name}, ${age}</h1>
                <p>${bio}</p>
            </div>
        `
    }
}

export default Dog;