


class Person {
    constructor(fullName,favColor) {

        this.name =fullName;
        this.favoriteColor = favColor; 

    }
   
    greet(){
        console.log("Hello, my nameis "+this.name);
    }

}

/* module.exports=Person; */
export default Person;

