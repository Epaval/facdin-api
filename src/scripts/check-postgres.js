// Añadir este console.log al principio para verificar que el script se ejecuta
console.log('🚀 Script check-postgres.js iniciado');

// Verificar que dotenv puede cargar las variables
try {
    require('dotenv').config();
    console.log('✅ dotenv configurado');
    console.log('DB_HOST:', process.env.DB_HOST || 'no definido');
} catch (error) {
    console.error('❌ Error con dotenv:', error.message);
}

// Verificar que podemos requerir la base de datos
try {
    console.log('🔌 Intentando cargar configuración de base de datos...');
    const dbConfig = require('../config/database');
    console.log('✅ Configuración de BD cargada');
    
    // Verificar que las funciones existen
    if (dbConfig.testConnection) {
        console.log('✅ testConnection function existe');
    } else {
        console.log('❌ testConnection function NO existe');
    }
    
    if (dbConfig.sequelize) {
        console.log('✅ sequelize instance existe');
    } else {
        console.log('❌ sequelize instance NO existe');
    }
    
} catch (error) {
    console.error('❌ Error cargando configuración BD:', error.message);
    process.exit(1);
}

// Ahora intentar la conexión
const { testConnection } = require('../config/database');

const checkPostgreSQL = async () => {
    console.log('🐘 Iniciando verificación de PostgreSQL...');
    
    try {
        console.log('🔌 Intentando conectar...');
        const isConnected = await testConnection();
        
        if (isConnected) {
            console.log('✅ ¡Conexión exitosa a PostgreSQL!');
            return true;
        } else {
            console.log('❌ No se pudo conectar a PostgreSQL');
            return false;
        }
    } catch (error) {
        console.error('💥 Error durante la conexión:', error.message);
        return false;
    }
};

// Solo ejecutar si es el script principal
if (require.main === module) {
    console.log('📦 Ejecutando como script principal...');
    checkPostgreSQL()
        .then(success => {
            if (success) {
                console.log('🎉 Verificación completada con éxito');
            } else {
                console.log('⚠️  Verificación completada con errores');
            }
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('💥 Error no manejado:', error.message);
            process.exit(1);
        });
} else {
    console.log('📤 Exportando como módulo');
}

module.exports = checkPostgreSQL;