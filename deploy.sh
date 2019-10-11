#!/user/bin/env sh
set -ev

npm run prod
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:since92x/since92x.github.io.git master
# git push -f  http://username:password@github.com/dog996/dog996.github.io.git master
cd -
