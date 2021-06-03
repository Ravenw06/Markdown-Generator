
const inquirer = require("inquirer");

const fs = require('fs');

const generateMarkdown = require('./Develop/utils/generateMarkdown');

const promptProject = portfolioData => {

    return inquirer.prompt([
      {
          type: "input", 
          name: "title",
          message: "what is the title of this project?",
          validate : nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter Project title!");
                return false;
            }
        }
        }, 
        {
            type: "input", 
            name: "name",
            message: "what is the name of this developer?",
            validate : nameInput => {
              if (nameInput) {
                  return true;
              } else {
                  console.log("Please enter developer's name!");
                  return false;
              }
          }
          }, 
        {
          type: "input",
          name: "description",
          message: "Provide a description for the project: "
        }, 
        {
            type: "input",
            name: "installation",
            message: "What is required to install your project? "
        },  
        {
            type: "input",
            name: "demo",
            message: "Image or video to display the functions of your app "
        },  
      {
          type: "checkbox", 
          name: "languages", 
          message: "What did you build this project with? (Check all that apply) ", 
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node', "MySOL"]
      }, 
      {
          type: "input",
          name: "link", 
          message: "enter the GitHub link to our project: (Required)", 
          validate : nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter GitHub link!");
                return false;
            }
        }
      }, 
        {
          type: "confirm", 
          name: "license", 
          message: "Would you like to apply a MIT License to your project? ",
          default: true
        }, 
        {
            type: "confirm", 
            name: "confirmContributors", 
            message: "Anyone contributed to this project besides yourself? ",
            default: false
        }, 
        {
          type: "input",
          name: "contributorName", 
          message: "Who contributed to your project?",
          when: ({confirmContributors}) => {
            if (confirmContributors) {
              return true;
            } else {
              return false;
            }
          }
        },
        {
        type: "input",
        name: "contributorLink", 
        message: "Contributor's GitHub: ",
        when: ({confirmContributors}) => {
          if (confirmContributors) {
            return true;
          } else {
            return false;
          }
        }
        },



    ])
    .then(projectData => {
        console.log(projectData)
            return projectData
    })
  };
  promptProject()
  .then(projectData => {
    const pageMD = generateMarkdown(projectData);
    fs.writeFile('./dist/README.md' , pageMD, err => {
        if (err) throw new Error(err);
        console.log("Page created!")
        if (projectData.license){
            fs.copyFile("./develop/utils/license.txt", "./dist/license.txt", err=> {
                if(err){
                    console.log(err);
                    return;
                }
                console.log("license added");
            })
        }
    });
  });

