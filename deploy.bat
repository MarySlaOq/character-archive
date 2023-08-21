@Echo off
git add .

set /p "message = COMMIT MESSAGE? "
git commit -m"%message%";