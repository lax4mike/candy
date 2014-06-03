ssh oceanstar 'mkdir -p ~/www/candygram'
scp -r ./dist/public/* oceanstar:~/www/candygram
