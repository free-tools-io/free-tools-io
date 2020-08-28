This repository contains code for all tools running at https://free-tools.io We are open for public contribution for this open source repository. Follow below guide to create your own tool at here.

# FTIO Tool Development
Thank you for showing interest in creating a new tools for the public. It is very easy to develop a tool with our simple SDK. All the tools are developed with NodeJS.

## Got your Idea?
Follow the guide to create new tool.

## Creating New Tool

Install FTIO SDK
```
npm install -g ftio-sdk
```
Create a new folder for the tool and run below command from the new folder.
```
ftio create
```
This would create sample base64 tool with all the files required. Below sections will cover how to customize these generated files specific to your tool.

## Customizing Tool
### meta.info
This is the important meta file for your tool. Below are the field details
* **name** - Name of the tool. Displayed to the end users. Make it more meaningful.
* **description** - Description about the tool. Short and clear description of the tool what it does.
* **author** - Name of the author/organization
* **icon** - Icon name from https://ionicons.com/
* **npm-packages** - List of NPM packages required to run the tool. (Specify version too like ftio-sdk@1.0.0)
* **tags** - Array list of tags. Tags are important for tool to appear on search or on Google.

## Tool Code Overview
Along with meta.info, three other important files developer has to know.
1. **input.ejs** - UI form component to render form on UI to get inputs. Written in HTML with EJS template engine.
2. **run.js** - Core algorithm to process input and produces the output data. Written in NodeJS
3. **output.ejs** - UI component to render output of the algorithm. Written in HTML with EJS template engine.
4. **meta.info** - Covered above

### Input Form (input.ejs)
This file is regular HTML file with embeded javascript templates with EJS template engine. JsonForm is used to render forms easily from JSON. JSONForm has very good playground (https://jsonform.github.io/jsonform/playground/index.html) with more examples with all possible forms.

Along with that you can access `query` variable to read query params. After input form is filled the data is submitted back to the same url with new query parameters. You can refer any input.ejs file of the any above tools.

Other than these, you can use any Bootstrap 4 code to render your input form. 

**References:**
- EJS Templates - https://ejs.co/
- JSONForm Home Page - https://github.com/jsonform/jsonform
- JSONForm Playground - https://jsonform.github.io/jsonform/playground/index.html
- Bootstrap Components - https://getbootstrap.com/docs/4.0/getting-started/introduction/

### Tool Algorithm (run.js)
This file is NodeJS file with regular code exposing `run(req)` function. This function is expected to return promise which resolves output in following fields.
* **data** - Output of your algorithm to be used in output later.
* **status** - `success` or `error` as per your output. Generally we resolve with `success` In all other failure scenarios we resolve with undefined object as `resolve()`
* **title** - Title of the output personalized to the output like 'Calculated BMI for Age 56 with Height 5.4'. This is used to show the page title and to show description for the recent activities.

Data Validation is done with validatorjs library. Refer https://www.npmjs.com/package/validatorjs for more details on validations.

### Output View (output.ejs)
This file is regular HTML file with embedded javascript templates with EJS template engine (same as input.ejs). `output` variable (resolved/returned from run.js) will be available on output.ejs. You can use as `<h1><%= output.data %></h1>`

## Testing Tool Locally
Start local instance with below command
```
ftio start
```
Access via http://localhost:3000
Port number can be changed by setting environment variable `PORT`

## Deploy to Production (free-tools.io)
Raise PR to our master Git Repo https://github.com/free-tools-io/free-tools-io
After the review and automated testing, This would deployed to production at https://free-tools.io

Thank you !!!
