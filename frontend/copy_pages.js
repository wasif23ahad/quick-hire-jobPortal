const fs = require('fs');
fs.mkdirSync('src/app/employer/register', {recursive: true});
fs.mkdirSync('src/app/employer/login', {recursive: true});
fs.copyFileSync('src/app/signup/page.tsx', 'src/app/employer/register/page.tsx');
fs.copyFileSync('src/app/login/page.tsx', 'src/app/employer/login/page.tsx');
console.log('Pages copied successfully!');
