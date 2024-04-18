FROM node:21-bullseye as files
WORKDIR /app
RUN git clone https://github.com/IDPA-2024/Nr.2_TravelerGuide.git
WORKDIR /app/Nr.2_TravelerGuide
RUN npm install
RUN npm run build

FROM node:21-bullseye
WORKDIR /app
COPY --from=files /app/Nr.2_TravelerGuide/ ./
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV SWAGGER_API_DOC_PATH=$SWAGGER_API_DOC_PATH
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]