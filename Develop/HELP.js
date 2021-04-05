//# start with some basic employee outline
class Employee {
    constructor( name, location ){
        this.name = name
        this.location = location
    }
}

//# we create 3 classes that extend this 'Employee'
class Intern extends Employee {
    constructor( name, location, school ){
        super( name, location )
        
        this.school = school
    }
}

class Manager extends Employee {
    constructor( name, location, office ){
        super( name, location )
        
        this.office = office
    }
}


const manager = new Manager( 'Ted', 'Toronto', 203 )