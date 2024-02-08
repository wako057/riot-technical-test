FROM node:20-bookworm

COPY run.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/run.sh

WORKDIR /srv

ENTRYPOINT ["/usr/local/bin/run.sh"]