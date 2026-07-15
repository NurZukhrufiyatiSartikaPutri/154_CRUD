import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;

const { Pool } = pg;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Koneksi Database PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'kuliah01',
    port: 5432,
});
