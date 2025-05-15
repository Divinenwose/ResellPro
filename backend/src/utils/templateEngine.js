const fs = require("fs");
const path = require("path");

const renderTemplate = (templateName, variables = {}) => {
  const templatePath = path.join(__dirname, "templates", `${templateName}.html`);
  let template = fs.readFileSync(templatePath, "utf8");

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    template = template.replace(regex, value);
  }

  return template;
};

module.exports = { renderTemplate };
