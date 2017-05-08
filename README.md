## Development
See `gulpfile.js` for all tasks. The most commonly used tasks are documented below.

Lint all the JavaScript files (both configuration and production)

    gulp lint
    
Launch the development server, available at [http://localhost:8080/](http://localhost:8080/). The development server will listen for changes to templates, `.less`, and `.tex` files and redeploy automatically.

    gulp webpack-dev-server
    
## Deployment
Run all the preparation tasks and deploy the site.

    gulp
