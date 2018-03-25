const combine = require('../../options/combine');
const path = require('path');
const pathProject = path.join(__dirname, '../../app');

module.exports.listFiles = {
    js: {   
        options: {
            extension: combine.generator.js,
        },
        list: [
            {
                name: 'scipts',
                content: 'alert("!!!!!!");',
                path: pathProject + '/js/'  
            }
        ]
    },
    style: {   
        options: {
            extension: combine.generator.styles,
        },
        list: [
            {
                name: 'scipts',
                content: '',
                path: pathProject + ''  
            }
        ]
    },
    template: {   
        options: {
            extension: combine.generator.template,
        },
        list: [
            {
                name: 'scipts',
                content: '',
                path: pathProject + ''  
            }
        ]
    }
}