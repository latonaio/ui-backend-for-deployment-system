FROM node:8.16.2-slim

# Definition of a Device & Service
ENV POSITION=UI \
    SERVICE=ui-backend-for-deployment-system \
    AION_HOME=/var/lib/aion \
    APP_DIR="${AION_HOME}/${POSITION}/${SERVICE}" \
    NODE_ENV=production

RUN apt-get update && apt-get install -y \
    curl \
    ffmpeg \
    git \
    gnupg \
    tzdata \
    wget \
    build-essential \
    python


RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}
EXPOSE 8080

ADD package.json .
RUN yarn

ADD . .

# start app
CMD ["node", "index.js"]
