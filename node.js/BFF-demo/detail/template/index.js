const fs = require('fs');
const vm = require('vm');

const templateCache = {};

const templateContext = vm.createContext({
    include: function (name, data) {
        const template = templateCache[name] || createTemplate(name)
        return template(data);
    },
    XSSTranslation: function (str) {
        if(!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
    }
});

function createTemplate(templatePath) {

    templateCache[templatePath] = vm.runInContext(
        `(function (data) {
            with (data) {
                return \`${fs.readFileSync(templatePath, 'utf-8')}\`
            }
        })`,
        templateContext
    );

    return templateCache[templatePath]
}

module.exports = createTemplate