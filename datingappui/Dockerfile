FROM node:12.2.0-alpine

# set working directory
WORKDIR .

# add `/app/node_modules/.bin` to $PATH
ENV PATH /root/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# start app
CMD ["npm", "start"]