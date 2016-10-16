#!/bin/bash
/dotledger/./waitforit.sh -h ${DB_HOST} -p ${DB_PORT}
sed -i "s/password:/password: ${DB_PASSWORD}/g" /dotledger/config/database.yml && \
sed -i "s/#host: localhost/host: ${DB_HOST}/g" /dotledger/config/database.yml && \
sed -i "s/#port: 5432/port: ${DB_PORT}/g" /dotledger/config/database.yml && \
sed -i "s/username: dot_ledger/username: ${DB_USER}/g" /dotledger/config/database.yml
cat /dotledger/config/database.yml
cd /dotledger/
bundle exec rake db:setup
bundle exec rails server
