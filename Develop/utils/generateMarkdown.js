

function generateMarkdown(data) {
  return `
  # ${data.title} 
  
  ## Description
  ${data.description}

  ## Installation
  ${data.installation}

  ## License
  Protected by MIT License 

  ## Usage
  ${data.demo}
  
  ## Credit
  > ${data.contributorName}
  > ${data.contributorLink}

  ## GitHub link
  ${data.link}
  ### &copy; ${new Date().getFullYear()} by ${data.name}
`;
}

module.exports = data =>{
  console.log(data)
  return`
    ${generateMarkdown(data)}
    `

};
