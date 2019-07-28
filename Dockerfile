# base image
FROM node

# set working directory
WORKDIR /app

EXPOSE 443
EXPOSE 80

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

## install and cache app dependencies
COPY package.json /app/package.json
COPY . /app

RUN npm install 
RUN npm install react-scripts -g

# start app
CMD ["npm", "start"]