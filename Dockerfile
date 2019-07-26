# base image
FROM node

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

## install and cache app dependencies
COPY package.json /app/package.json
COPY . /app

RUN echo "RUNnpminstall"

RUN npm install 

RUN echo "RUNnpminstallreact-scripts-g"
RUN npm install react-scripts -g

# start app
CMD ["npm", "start"]