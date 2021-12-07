const inquirer =require('inquirer');
const fs = require('fs');
const Manager = require('./library/Manager.js');
const Intern = require('./library/Intern.js');
const Engineer = require('./library/Engineer.js');
const generateTeam = require('./src/generateTeam.js');

team=[];
const managerQuestions = () =>{
    inquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'What is the team manager\'s name?'
        },
        {
            type:'input',
            name:'id',
            message:'What is the team manager\'s ID?'
        },
        {
            type:'input',
            name:'email',
            message:'What is the team manager\'s E-mail?'
        },
        {
            type:'input',
            name:'officeNumber',
            message:'What is the team manager\'s office number?'
        },
        {
            type:'list',
            name:'addMember',
            message: 'What type of team member would you like add?',
            choices: ['Engineer','Intern','I don\'t want to add any more team members']
        }
    ])
    .then((managerAnswers) => {
        const manager = new Manager (managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber)
        team.push(manager)
        switch(managerAnswers.addMember){
            case 'Engineer':
                engineerQuestions();
                break;
            case 'Intern':
                internQuestions();
                break;
                default:
            writeToFile('index.html',generateTeam(team))
        }
    });
};
 
const engineerQuestions = () => {
    inquirer.prompt([
        {
            type:'input',
            name:'name',
            message: 'What is the engineer\'s name?' 
        },
        {
            type:'input',
            name:'id',
            message:'What is the engineer\'s ID?'
        },
        {
            type:'input',
            name:'email',
            message:'What is the engineer\'s E-mail?'
        },
        {
            type:'input',
            name:'github',
            message:'What is the team  engineer\'s Github username?'
        },
        {
            type:'list',
            name:'addMember',
            message: 'What type of team member would you like add next?',
            choices: ['Engineer','Intern','I don\'t want to add any more team members']
        }
    ])
    .then((engineerAnswers) => {
        const engineer = new Engineer (engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github)
        team.push(engineer)
        switch(engineerAnswers.addMember){
            case 'Engineer':
                engineerQuestions();
                break;
            case 'Intern':
                internQuestions();
                break;
                default:
            writeToFile('index.html',generateTeam(team))
        }
    })
};  
const internQuestions = () => {
    inquirer.prompt([
        {
            type:'input',
            name:'name',
            message: 'What is the intern\'s name?' 
        },
        {
            type:'input',
            name:'id',
            message:'What is the intern\'s ID?'
        },
        {
            type:'input',
            name:'email',
            message:'What is the intern\'s E-mail address?'
        },
        {
            type:'input',
            name:'school',
            message:'What is the team intern\'s school?'
        },
        {
            type:'list',
            name:'addMember',
            message: 'What type of team member would you like add next?',
            choices: ['Engineer','Intern','I don\'t want to add any more team members']
        }
    ])
    .then((internAnswers) => {
        const intern = new Intern (internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school)
        team.push(intern)
        switch(internAnswers.addMember){
            case 'Engineer':
                engineerQuestions();
                break;
            case 'Intern':
                internQuestions();
                break;
                default:
            writeToFile('index.html',generateTeam(team))
        }
    })
};

managerQuestions();

function writeToFile(filename, data){
    fs.writeFile(filename,data,(err) =>{
        if(err) throw err;
        console.log('file saved')
    });
};
