# CSV to Magnet Links

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Install node.js to run this project


## Dependencies

This project uses the [Ryuk-me Torrent-Api-py](https://github.com/Ryuk-me/Torrent-Api-py).
An instance of this needs to be running for the code to work. 

`# Clone the repo`
`$ git clone https://github.com/Ryuk-me/Torrent-Api-py`

`# Install Depedencies`
`$ pip install -r requirements.txt`

`# Start`
`$ python main.py`


API calls default to localhost:8080 for the domain. This can be changed in the src/App.js file near the top.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### CSV Format

The program requires a CSV with two columns to work effectively. Column A should be the name of the movie, column B should be the year of the movie.