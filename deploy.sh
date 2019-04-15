#!/user/bin/env sh
set -ev

npm run prod
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:since92x/since92x.github.io.git master
cd -
