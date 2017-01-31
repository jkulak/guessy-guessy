FROM mhart/alpine-node:7.4

RUN mkdir /app
WORKDIR /app
ENV NODE_ENV development

COPY package.json /app
RUN npm install

COPY . /app
# RUN node_modules/.bin/gulp build-for-production

# Add shell aliases
RUN echo 'alias l="ls -la"' >> /etc/profile
RUN echo 'export PATH="/app/node_modules/.bin:${PATH}"' >> /etc/profile

CMD ["npm", "start"]
