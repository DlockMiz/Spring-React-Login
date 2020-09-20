sudo apt-get update
sudo apt install default-jre -y
sudo apt install default-jdk -y
sudo apt-get install apache2 -y


sudo a2ensite default-ssl
sudo a2enmod ssl
sudo a2enmod headers
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo sed -i "/DocumentRoot/a \\\n\\t\ProxyPreserveHost on\
\\n\\tRequestHeader set X-Forwarded-Proto https\
\\n\\tRequestHeader set X-Forwarded-Port 443\
\\n\\tProxyPass \/ http:\/\/127.0.0.1:8080\/\
\\n\\tProxyPassReverse \/ http:\/\/127.0.0.1:8080\/\\n" /etc/apache2/sites-available/000-default.conf

sudo systemctl restart apache2

sudo apt-get install wget -y
sudo wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x cloud_sql_proxy
nohup ./cloud_sql_proxy -instances=spring-react-login-289522:us-central1:spring-react-login-db=tcp:3306 &

sudo gsutil cp gs://srl-prod-artifacts/spring-react-login-0.0.1-SNAPSHOT.jar .
sudo java -jar spring-react-login-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod &
exit
