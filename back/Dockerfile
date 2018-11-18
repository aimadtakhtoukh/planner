FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY target/planner.jar app.jar
EXPOSE 8443
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]