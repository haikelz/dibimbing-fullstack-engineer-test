FROM node:alpine AS build

RUN npm install -g pnpm
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json pnpm-lock.yaml ./
RUN npm install

COPY . ./
RUN npm run build

CMD ["npm", "run", "dev"]