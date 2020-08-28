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

### Input Form

### Tool Algorithm

### Output View

## Testing Tool Locally
Start local instance with below command
```
ftio start
```
Access via http://localhost:3000
Port number can be changed by setting environment variable `PORT`

## Deploy to free-tools.io
Raise PR to our master Git Repo https://github.com/free-tools-io/free-tools-io
After the review and automated testing, This would deployed to production at https://free-tools.io

Thank you !!!
