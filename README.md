# EMMA-Backend

<p align="center">
<img height="150" width="auto" src="https://github.com/EMMA-Emotion-AI.png" /><br><br>
:performing_arts: This is the Backend of E.M.M.A.
</p>

<hr>

## Presentation (German)

https://1drv.ms/p/s!AsoWFbkwGvx8gmm4qG4fvHIzfQJw?e=h9mX27

<hr>

## :wrench: Setup

0. Open up your favourite terminal (and navigate somewhere you want to download the repository to). <br><br>
1. Make sure you have NodeJS installed. Test by  entering <br>
$ `node -v` <br>
If this returns a version number, NodeJS is installed. **If not**, get NodeJS <a href="https://nodejs.org/en/download/package-manager/">here</a>. <br><br>
2. Clone the repository and navigate to it. If you have Git installed, type <br>
$ `git clone https://github.com/EMMA-Emotion-AI/EMMA-Backend.git && cd EMMA-Backend` <br>
If not, download it <a href="https://github.com/EMMA-Emotion-AI/EMMA-Backend/archive/master.zip">here</a> and extract the ZIP file.<br>
Then navigate to the folder.<br><br>
3. Install all dependencies by typing <br>
$ `npm install`<br><br>
4. Copy `config.template.js` and paste it as `config.js` <br><br>
5. Configure it in your favourite editor by editing `config.json`<br><br>
7. Install required **global** packages for development and deployment: <br>
$ `npm i -g eslint` <br>
$ `npm i -g pm2` <br>
8. Start it by running <br>
$ `npm start` <br>
or lint and start it by using <br>
$ `npm run dev` <br>
or deploy it using [pm2]() by using <br>
$ `npm run deploy`

<hr>

<sub>Copyright (c) EMMA</sub>
