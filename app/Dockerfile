FROM maven:3.8.4-openjdk-17 AS build

COPY . /app
WORKDIR /app

RUN mvn package

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/app-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
