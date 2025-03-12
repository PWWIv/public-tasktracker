# Используем официальный образ Node.js на базе Alpine Linux
FROM node:16-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей и устанавливаем их
COPY package*.json ./
RUN npm install

# Копируем исходный код проекта
COPY . .

# Компилируем TypeScript (если проект настроен для компиляции)
RUN npm run build

# Открываем порт, который будет использовать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/main.js"]
