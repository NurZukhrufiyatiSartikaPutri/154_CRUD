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

// ===========================
// GET Semua Data
// ===========================
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM biodata ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Database Error'
        });
    }
});

// ===========================
// GET Berdasarkan ID
// ===========================
app.get('/biodata/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM biodata WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Data tidak ditemukan'
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Database Error'
        });
    }
});

// ===========================
// POST Tambah Data
// ===========================
app.post('/biodata', async (req, res) => {

    const { nama, nim, kelas } = req.body;

    try {

        const result = await pool.query(
            `INSERT INTO biodata (nama, nim, kelas)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nama, nim, kelas]
        );

        res.status(201).json({
            message: 'Data berhasil ditambahkan',
            data: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Gagal menambahkan data'
        });
    }

});

