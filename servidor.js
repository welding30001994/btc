const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); // Para conectarnos con LNbits o LND

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar el reclamo de BTC
app.post('/reclamar', async (req, res) => {
    const { billetera } = req.body;
    
    if (!billetera) {
        return res.json({ mensaje: 'Debes ingresar una billetera Lightning.' });
    }

    try {
        // Simulación de envío de pago
        // Aquí deberías hacer una petición a LNbits o LND para procesar el pago
        const pago = await axios.post('https://tu-servidor-ln/pagar', {
            invoice: billetera, // Aquí iría la factura Lightning generada
            amount: 1000 // Cantidad en satoshis (ejemplo: 1000 satoshis)
        });
        
        if (pago.data.success) {
            res.json({ mensaje: 'Pago enviado con éxito a tu billetera Lightning.' });
        } else {
            res.json({ mensaje: 'Error al procesar el pago.' });
        }
    } catch (error) {
        console.error('Error en la transacción:', error);
        res.json({ mensaje: 'Hubo un problema con la transacción.' });
    }
});

// Servir archivos estáticos para conectar con el HTML
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

