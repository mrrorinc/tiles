# code style guide for the tiles web client




-	follow AngularJS formatting guidelines and best practices

  - http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html
  
  - use the ‘controllerAs’ syntax to import controllers to view scopes
  
  - all DOM manipulation should be done inside directives
  
  - reserve $ for Angular properties and services
  
  
  
  
-	read about best practices in the AngularJS style guide for teams but John Papa

  - https://github.com/johnpapa/angularjs-styleguide
  
  -	apply the single responsibility principle
  
  - implement logic in services and factories over controllers
  
  - return a promise for data calls
  
  - use the custom **tls-** prefix for custom directives
  
  - this project currently prefers function expressions over declarations
  
  - this project does not use the manual injection approach
  
  - for file and folder naming conventions please reference existing code base
  
  
  

-	always format HTML, JavaScript and JSON according to standards

  - https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml

  - https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml

  - https://google-styleguide.googlecode.com/svn/trunk/jsoncstyleguide.xml

  - prefer single quotes in script where possible
  
  - always indent with 2 spaces (soft-tabs)

  - avoid unnecessary white space or line breaks
  
  - avoid adding code lint by any code management tool
  
  - use camelCase for scripting
  
  - use snake-case for mark-up, style names, file and folder names
  
  - use lower/case for URLs
  
  - write literate code with meaningful property, method or element names
  
  - avoid using abbreviations at all times! they can be arbitrary, full words can not
  
  - add meaningful comments when committing code