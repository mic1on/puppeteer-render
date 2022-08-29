FROM zenato/puppeteer

USER root
RUN apt-get update -y && apt-get install curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash \
&& apt-get update \
&& apt-get install -y nodejs

COPY . /app

RUN cd /app && npm install --quiet

EXPOSE 3000

WORKDIR /app

CMD npm run start
