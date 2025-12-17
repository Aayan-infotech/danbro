# Use Node image to build the frontend
FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Use Nginx to serve built frontend
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5556
CMD ["nginx", "-g", "daemon off;"]
