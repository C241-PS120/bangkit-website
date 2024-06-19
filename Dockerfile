# Menggunakan image Node.js slim versi 20.14 sebagai base image
FROM node:20.14-slim

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstall dependencies
RUN npm install

# Menyalin seluruh file aplikasi ke dalam container
COPY . .

# Membangun aplikasi dengan Vite
RUN npm run build

# Menginstall serve untuk menyajikan aplikasi di production
RUN npm install -g serve

# Menentukan port yang akan diekspos oleh container
EXPOSE 8080

# Menjalankan aplikasi menggunakan serve
CMD ["serve", "-s", "dist", "-l", "8080"]
