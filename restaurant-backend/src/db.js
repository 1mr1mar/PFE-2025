// src/db.js
const mysql = require('mysql2');

// إنشاء الاتصال بقاعدة البيانات
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // اسم المستخدم الافتراضي في XAMPP
  password: '',  // كلمة المرور الافتراضية في XAMPP تكون فارغة
  database: 'restaurant', // اسم قاعدة البيانات التي أنشأتها
});

const promisePool = pool.promise(); // تحويل الاتصال إلى وعود لتسهيل التعامل مع البيانات

module.exports = promisePool;
