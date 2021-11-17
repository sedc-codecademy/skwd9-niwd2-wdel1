# Stage 1: Compile and Build our Angular Codebase

# Use the official node image as the base image
FROM node:14 as build

# Set a working directory
WORKDIR /usr/local/app

# Copy the source from root to the working directory
COPY ./ /usr/local/app

# Install all deps
RUN npm install

# Generate the build
RUN npm run build

# Stage 2: Serve our todo app with nginx server

# Get the official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents
COPY --from=build /usr/local/app/dist/todo-client /usr/share/nginx/html

# Expose port 80
EXPOSE 80


