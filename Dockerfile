FROM node
WORKDIR /workspace
COPY . /workspace
RUN npm run setup
RUN npm install
EXPOSE 3000 9876
CMD bash
