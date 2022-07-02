# base image
FROM node:17

# create directory for express app
RUN mkdir -p /apps/express

# install dependencies
ADD package.json /apps/express/package.json
ADD package-lock.json /apps/express/package-lock.json
RUN cd /apps/express && npm install --production

#Copy express app build files
WORKDIR /apps/express
COPY dist/apps/express/ /apps/express

EXPOSE 3333

#run express app
CMD [ "node", "main.js" ]
