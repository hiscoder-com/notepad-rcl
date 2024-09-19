export NVM_DIR="$HOME/.nvm/nvm.sh"
. "$(dirname $NVM_DIR)/nvm.sh"

export NVM_DIR="$HOME/.nvm"
a=$(nvm ls | grep 'node')
b=${a#*(-> }
v=${b%%[)| ]*}

export PATH="$NVM_DIR/versions/node/$v/bin:$PATH"
