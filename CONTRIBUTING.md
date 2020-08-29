# Steps to Contribute
* Fork Github project https://github.com/free-tools-io/free-tools-io to your account
* Create new folder for your tool (Folder name to be clear and denotes the tool)
* Inside the folder create your tool with this SDK (https://www.npmjs.com/package/ftio-sdk)
* After testing, Raise pull-request to https://github.com/free-tools-io/free-tools-io at master branch
* After review and validation, it would be deployed to production at https://free-tools.io

# Guidelines
* It is very important to have input validations and efficient algorithm to avoid resource clogging and hacking attempts.
* DO NOT access or store anything on local file system
* DO NOT have any unauthorized calls to external services/systems.
* Ensure that the dependant libraries used are licensed to run at free-tools.io and does not have any vulnerabilities.
* Avoid caching heavy data on memory. Destroy the data as soon as the execution is completed.
