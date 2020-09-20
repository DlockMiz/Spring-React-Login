FROM openjdk:14.0.2
WORKDIR /home
ADD spring-react-login-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD java -jar app.jar --spring.profiles.active=prod