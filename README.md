git clone https://github.com/wallacevidotoprog/API-PW.git

## npm init
## npm install --save nodejs
## npm install --save express
## npm install dotenv --save

## npm install --save-dev nodemon (mode DEV)

## npm install jsonwebtoken
## npm install bcryptjs

## npm install --save sequelize
## npm install --save mysql2


## npm install --save multer
## npm install iconv

Configuraçoes para criar um servico: ubunto/debian
Procedimentos

1. Crie um arquivo de serviço

Cada aplicação iniciada pelo systemd existe um arquivo .service com o script de parametrizações. As principais utilizadas nesse procedimento são:

· [Unit] Description — define descrição do serviço
· [Service] Working Directory — o diretório onde o script js será executado
· ExecStart — o comando de execução do Node.js, considerando o nome do script como index.js
· Restart e RestartSec — para determinar se o serviço irá reinicia caso seja interrompido e quanto tempo em segundos
· StandardOutput, StandardError e SyslogIdentifier — para registro de log

O arquivo deve ser criado em /etc/systemd/system/api-pw.service

[Unit]
Description=ASYNC API PW    
After=network.target    
StartLimitIntervalSec=0     
[Service]   
WorkingDirectory=/home/API  
ExecStart=/usr/bin/node index.js    
Restart=always  
RestartSec=10   
StandardOutput=syslog   
StandardError=syslog    
SyslogIdentifier= ASYNC-API-PW  
[Install]   
WantedBy=multi-user.target  

2. Habilite o serviço criado com o seguinte comando:
systemctl enable api-pw.service
Se o usuário de acesso não tiver privilégios de administrador, use sudo antes de cada comando mencionado no texto.

 Caso houver alteração do arquivo .service, execute a linha abaixo pra recarregar os ajustes:
systemctl daemon-reload

3. Inicie o serviço:
systemctl start api-pw.service

4. Verifique se o está em execução por:
systemctl status api-pw.service

Observe se o status está como active (running). Caso contrário, verifique o log gerado a partir de:
journalctl -u api-pw.service

5. E se for necessário parar ou reiniciá-lo, use os comandos abaixo, respectivamente:
systemctl stop api-pw.service
systemctl restart api-pw.service

6. Caso queira saber quais outros serviços estão em execução no sistema operacional, basta apenas usar:
systemctl list-unit-files — type=service