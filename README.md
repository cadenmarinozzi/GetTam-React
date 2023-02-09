# GetTam-React

React implementation of GetTam, and a backend for GetTam.

# Production

You can view the deployed version of GetTam V1 [here](https://lankmann.github.io/GetTam) or by visiting https://gettamgame.com. For now, a NON-nightly deployment of GetTam-React can be found [here](https://nekumelon.github.io/GetTam-React)

# Installation

Make sure you have node.js installed. You can install it from the [website](`nodejs.org`).

```
# Clone the repository:
git clone https://github.com/nekumelon/GetTam-React.git

# cd into the directory and install the required modules:
cd GetTam-React && npm install

# cd into the backend directory and install the required backend modules:
cd backend && npm install

# cd into the analytics directory and install the required analytics modules:
cd analytics && npm install
```

Add the firebase config to the backend directory in `.env` using the template in `.env.example`.

# Usage

### Backend

Run the backend using `npm start` in the backend directory. \
If `process.env.port` exists, the backend will run on that port. Otherwise, it will run on port 5000.

### Frontend

Run the frontend using `npm start` in the root directory.

# Deploying

### Backend

To deploy the backend, add any new files to git, commit the files, and then run `git push heroku master` to deploy the changed files.

### Frontend

Deploy the GetTam-React frontend by running `npm run deploy` in the root directory. This will build the frontend and deploy it to the firebase hosting service.

# LICENSE

See [LICENSE](./LICENSE) for license information.

# TODO

See [TODO](./TODO.md) for a list of todos.

# Authors

GetTam is created with ❤️ by:

-   [React - @nekumelon (Caden Marinozzi)](https://github.com/nekumelon)
-   [V1 - @lankmann (Linus Tornqvist)](https://github.com/lankmann)
-   [V1 - @fosterea (Foster Angus)](https://github.com/fosterea)
