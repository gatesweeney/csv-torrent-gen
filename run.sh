#!/bin/sh

# Save the current working directory in an environment variable.
INITIAL_WORKING_DIRECTORY=$(pwd)

# This line changes to current working directory to where
# the analysis.sh file is.
cd "$(dirname "$0")"

python3 pip install -r api/requirements.txt; python3 api/main.py &>/dev/null &

npm i; npm audit fix; npm start &>/dev/null &