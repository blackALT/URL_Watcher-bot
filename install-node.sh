curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
cp -f /vagrant/profile ~/.profile
cd ~/chatbot
sudo apt update -y && sudo apt upgrade -y
sudo apt install npm
npm install mongodb