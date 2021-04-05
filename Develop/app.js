const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function init(){
    inquirer.prompt([
        {
            type:"list",
            name:"newRole",
            choices: ["Manager", "Intern", "Engineer", "I would like to stop adding new Employees"],
            message: "What is your new Employee's role?"
        }
    ]).then(responseRole => {
        if(responseRole.newRole != "I would like to stop adding new Employees"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is your new Employee's name?"
                },
                {
                    type: "input",
                    name: "id",
                    message: "what is your Employee's id?"
                },
                {
                    type: "input",
                    name: "email",
                    message: "what is your new Employee's email?"
                }
            ]).then(responseBasic => {
                if(responseRole.newRole == "Manager"){
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "officeNumber",
                            message: "what is you new Employees office number?"
                        }
                    ]).then(responseManager => {
                        const manager = new Manager(responseBasic.name, responseBasic.id, responseBasic.email, responseManager.officeNumber)
                        
                        employees.push(manager)
                        init()
                    })
                }else if(responseRole.newRole == "Intern"){
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "school",
                            message: "what is you new Employees school?"
                        }
                    ]).then(responseIntern => {
                        const intern = new Intern(responseBasic.name, responseBasic.id, responseBasic.email, responseIntern.school)
                        employees.push(intern)
                        init()
                    })
                }else if(responseRole.newRole == "Engineer"){
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "github",
                            message: "what is you new Employees github"
                        }
                    ]).then(responseEngineer => {
                        const engineer = new Engineer(responseBasic.name, responseBasic.id, responseBasic.email, responseEngineer.github)
                        employees.push(engineer)
                        init()
                    })
                }
            })
        }else{
            fs.writeFile("index.html", render(employees), err => {
                if (err) throw err
                console.log("Thank you for using my team builder!!!!!!!!!!!!!!!")
            })
        }
        
    })
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
init()