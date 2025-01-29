const { SerialPort, ReadlineParser } = require('serialport'); // Nova forma de importação
const mqtt = require('mqtt');

// Configuração da porta serial
const port = new SerialPort({
  path: '/dev/cu.usbserial-10', // Altere para a porta usada pelo seu Arduino
  baudRate: 9600
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Configuração do cliente MQTT
const mqttBroker = 'mqtt://test.mosquitto.org'; // Endereço do broker MQTT
const topic = "sensores-tainan-felipe";
const mqttClient = mqtt.connect(mqttBroker);

mqttClient.on('connect', () => {
  console.log('Conectado ao broker MQTT');
});

// Lendo dados do Arduino e publicando no MQTT
parser.on('data', (dataUnf) => {
  const {temp, luminosidade} = JSON.parse(dataUnf);
  
  const data = {
    "temperatura": temp.toString(),
    "luminosidade": luminosidade.toString(),
    "timestamp": new Date().toISOString()
  }
  console.log('Dados recebidos do Arduino:', data);
  
  // Publicar no tópico MQTT
  mqttClient.publish(topic, JSON.stringify(data), (err) => {
    if (err) {
      console.error('Erro ao publicar no MQTT:', err);
    } else {
      console.log('Dados enviados para o broker MQTT');
    }
  });
});

port.on('error', (err) => {
  console.error('Erro na porta serial:', err.message);
});
