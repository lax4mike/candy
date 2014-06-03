ssh oceanstar 'mkdir -p ~/www/candy'
scp -r ./dist/public/* oceanstar:~/www/candy
