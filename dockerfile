FROM node:lts-alpine AS deps

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts-alpine AS builder

ENV NODE_ENV=production
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN yarn build

FROM node:lts-alpine AS runner

WORKDIR /opt/app
ENV NODE_ENV=production
USER node
COPY --from=builder /opt/app/package.json ./
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/build ./build
COPY --from=builder /opt/app/production.config.json ./
EXPOSE 5000
ENTRYPOINT ["npm"]
CMD ["run", "start-node"]
