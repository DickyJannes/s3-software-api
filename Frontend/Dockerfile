FROM node:16.13
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006
RUN chown -R node /usr/src/app
USER node
RUN npm install --global expo-cli
RUN npm install --production
CMD ["npm", "start --web"]