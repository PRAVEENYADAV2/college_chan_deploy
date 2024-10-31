import mysql from 'mysql2/promise';
import fs from 'fs';

// Load the CA certificate
const sslCa = `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUOH2ckF3gEG41Vlf6lIFSRGnkvrswDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNzU0ODZiYzAtZWY3NC00ODNiLTg5ZWItNjhhZjEwNTk5
YzVkIFByb2plY3QgQ0EwHhcNMjQxMDMwMDcxMjMwWhcNMzQxMDI4MDcxMjMwWjA6
MTgwNgYDVQQDDC83NTQ4NmJjMC1lZjc0LTQ4M2ItODllYi02OGFmMTA1OTljNWQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALUQrssx
WJP593czpC2/hNa9mBn03CWdgf23BUCNvA6NnB0x1FL8370F+/VSdX92A/j2OLMa
EA9+xgj1re5AB52btWre8YSxLlvQmayBDptxSM55c+iccerF4tzMbggkylTaHrc4
yXvJxvYacHwi9PXCGL/StbFHOlly8z75fiGJxyfveunK5qegd12Kdj+55uOUSgF/
IxVVbglZo1jW1j+duuwFa4/si1psG7Cccu4+oZMETKIDRkf+EahHdBIbREmh0H7s
zRZ2G+9sRTDoqfYFdhxxsz2sMwWIOWQQDEP+ZtuX/yJQ0AMgjiguaEI4YKHXEUrA
ByPEPgoa7KBbUHgWMP94mQefIf6w4HCWEOsoPOIJZujnLqysdYofT/R2KtI4qNUZ
11vz52ULZlNygqy9A+mVmROzxAGGXWaPOhI/bqjmLPsJKy4g9ErgeilEGhAdesAg
S+GvHFQE9ftOYFu2cQ5zYDMXI9uMLTxfEujeMc9b3B63FLvDeaVA56qs9QIDAQAB
oz8wPTAdBgNVHQ4EFgQUdaSZuzpn5HyQIToMWKpwe1ixqZMwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHyBea53eH2OfusH
L/5GVx+Ho3y7f3w+rgjK03OfMuhv6VE8IJmf7A93xJS0/zifyD/9/5JHDggaWIFZ
9kODxJZ+hpvAOQerZ+FbD5usdgbB9o7pVv7k+Hwr2bKEYhZKvUlIT4gObsdAiEl6
R6Tzf45iy7Bh8Ve19VMlP9L0GgCK66dYWDPHfd85EuvzPmCrPgfvntTVMBkdBajg
6yc8y14KP33/CYx+ndkdK0sGWfa8uZB6yIJz+Au3cnb6YfXZMso0olZf2MJ07Hlm
HubogJ8tpLs/Kr4IRayasjkyiZzDSvZKvtrwe35S/KxAyuhsAF/Gvv6N4YeVXtN+
sLZ3X7VMI4tV2FAIik5VCRb8cjCMqk3/dss+oYIrm9rKEP7gmQZ4lWq3SHPFl89S
MfkeVupTutDNGolaJihQv7sMiCLQY32woMreVRos/ROtPTsMFtXcbAY7bi4SObN4
n5od5QGHMhJiU1YNQA4L4p/yo93ZfxFezIRUUO8dXbXtgR0A8w==
-----END CERTIFICATE-----`

// Create a connection pool with SSL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10), // Convert port to number
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: sslCa,
  },
});

export default pool;
