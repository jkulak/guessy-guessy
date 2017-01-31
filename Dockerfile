FROM mhart/alpine-node:7.4

EXPOSE 8033

RUN mkdir /app
WORKDIR /app
ENV NODE_ENV production

COPY package.json /app
RUN npm install --production

COPY . /app
# RUN node_modules/.bin/gulp build-for-production

# Add shell aliases
RUN echo 'alias l="ls -la"' >> /etc/profile

# All npm packages are installed locally in /app/node_modules
# to make them available from the command line, we add the local
# /app/node_modules/.bin to the global PATH variable
RUN echo 'export PATH="/app/node_modules/.bin:${PATH}"' >> /etc/profile

CMD ["npm", "start"]
