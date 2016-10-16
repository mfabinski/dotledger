FROM debian:8
MAINTAINER matthias fabinski <matthias.fab@gmail.com>
# install build and run dependencies
RUN \
  apt-get update && \
  apt-get install -y ruby ruby-dev bundler make gcc libgmp-dev zlib1g-dev libpq-dev nodejs
# Add the project
ADD . dotledger
# install bundle dependencies
RUN \
  cd dotledger && \
  cp config/database.yml.example config/database.yml && \
  bundle install
# configure database
ENV DB_USER dot_ledger
ENV DB_PASSWORD 123456
ENV DB_HOST db
ENV DB_PORT 5432
#RUN \
#  sed -i 's/password:/password: $DB_PASSWORD/g' /dotledger/config/database.yml && \
#  sed -i 's/#host: localhost/host: $DB_HOST/g' /dotledger/config/database.yml && \
#  sed -i 's/#port: 5432/port: $DB_PORT/g' /dotledger/config/database.yml
EXPOSE 3000
ENTRYPOINT ["/bin/bash", "dotledger/run.sh"]
