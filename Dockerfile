FROM zenato/puppeteer

USER root
RUN npm install n -g \
&& n 14.19.0

COPY . /app

RUN cd /app && npm install --quiet

EXPOSE 3000

WORKDIR /app

CMD npm run start
