FROM us.gcr.io/cloudsql-docker/gce-proxy:1.15
COPY spring-react-login-289522-8fdbf6dbd586.json creds.json
EXPOSE 3306
CMD ./cloud_sql_proxy -instances=spring-react-login-289522:us-central1:spring-react-login-db=tcp:3306 -credential_file=creds.json
