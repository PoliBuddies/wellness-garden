﻿# Installation [Windows]
## Prepare dependencies
```
git clone https://github.com/PoliBuddies/wellness-garden.git
cd wellness-garden
python3 -m venv env
.\env\Scripts\activate.bat
pip install -r .\requirements.txt
cd .\frontend\wellness-garden\
npm install
```
## Start the UI
```
npm run dev
```
## Start the database and API (from repository root)
```
python backend/app.py
```
