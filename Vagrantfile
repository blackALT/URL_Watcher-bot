# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.box = "generic/ubuntu2004"
    config.vm.network :forwarded_port, guest: 8080, host: 3000
    config.vm.hostname = "tcc-app"
    config.vm.provider "virtualbox" do |app|
      app.name = "tcc-app"
      app.memory = 2048
      app.cpus = 2
      app.gui = true
    end
    config.vm.synced_folder ".", "/home/vagrant/app"
    config.vm.provision "install-node", type: "shell", privileged: false do |s|
      s.path = "./install-node.sh"
    end
  end