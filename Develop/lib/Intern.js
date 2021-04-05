// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Intern extends Employee {
    constructor( name, id, email, school ){
        super( name, id, email )
        
        this.school = school
    }
    getRole() {
        return "Intern"
    }
    getSchool(){
        return this.school;
    }
}
// let newIntern = new Intern(Hillary, 1, email@email.com, Rice)
module.exports = Intern