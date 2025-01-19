@echo off
cd /d C:\Users\Mihaela\Desktop\Project

start /B docker-compose up --build -d

timeout /t 15 /nobreak >nul

start http://localhost:3000
start http://localhost:9090/api
start http://localhost:8010
start http://localhost:5001
start http://localhost:8000

exit
