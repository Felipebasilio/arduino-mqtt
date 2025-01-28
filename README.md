# Arduino-MQTT Integration

This repository provides a solution to read data from an Arduino Mega 2560 equipped with temperature and luminosity sensors, process it, and send it to an MQTT broker in real-time using Node.js. The project includes:

1. **index.js**: A Node.js script to handle serial communication with the Arduino and publish data to the MQTT broker.
2. **Arduino Code**: A sketch to collect sensor data and send it over the serial port in JSON format.

---

## Prerequisites

Before running this project, ensure the following are installed:

### Hardware Requirements
- Arduino Mega 2560 (or compatible board).
- Sensors:
  - **Temperature sensor** (e.g., LM35 or similar).
  - **Luminosity sensor** (e.g., LDR or BH1750).
- USB cable for Arduino.

### Software Requirements
- **Node.js** (v16.x or later).
- **Arduino IDE** (latest version).
- **Mosquitto** (MQTT broker).

### Node.js Dependencies
- `serialport`: For communication with the Arduino over the serial port.
- `mqtt`: For publishing data to the MQTT broker.

---

## Setting Up the Environment

### 1. Clone the Repository
```bash
git clone <repository-url>
cd arduino-mqtt
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Prepare the Arduino
1. Open the `arduino_code.ino` file in the Arduino IDE.
2. Connect the Arduino Mega to your computer via USB.
3. Select the correct port under **Tools > Port** (e.g., `/dev/cu.usbserial-10`).
4. Select **Arduino Mega 2560** as the board under **Tools > Board**.
5. Upload the code to the Arduino.

### 4. Start the Mosquitto MQTT Broker
Make sure Mosquitto is running on your machine:
```bash
mosquitto -v
```

If the broker is on another machine, note its address (e.g., `mqtt://<IP-ADDRESS>:1883`).

### 5. Update the Node.js Script
Ensure the correct serial port and MQTT broker address are set in `index.js`:
```javascript
const port = new SerialPort({
  path: '/dev/cu.usbserial-10', // Update with your Arduino's port
  baudRate: 9600
});

const mqttBroker = 'mqtt://localhost:1883'; // Update with your broker's address
```

### 6. Run the Node.js Script
Start the script to begin reading data from the Arduino and publishing it to the MQTT broker:
```bash
node index.js
```

### 7. Verify MQTT Data
Use `mosquitto_sub` to subscribe to the topic and verify the data:
```bash
mosquitto_sub -h localhost -t arduino/sensores
```
Expected output:
```json
{"temp":23.45,"luminosidade":512}
```

---

## File Descriptions

### **index.js**
- Reads data from the Arduino via the serial port.
- Publishes the data to an MQTT broker under the topic `arduino/sensores`.

### **arduino_code.ino**
- Reads temperature and luminosity sensor data from analog pins.
- Sends the data in JSON format over the serial port.

---

## Troubleshooting

1. **Serial Port Issues**:
   - Ensure the correct port is specified in both the Arduino IDE and `index.js`.
   - Use the Arduino IDE Serial Monitor to verify the Arduino is sending data.

2. **MQTT Connection Issues**:
   - Verify the MQTT broker is running and reachable from your machine.
   - Ensure the broker address in `index.js` matches your setup.

3. **Node.js Errors**:
   - Ensure the required dependencies are installed using `npm install`.

---

## Future Improvements
- Add support for more sensors.
- Implement error handling for reconnection to the MQTT broker or Arduino.
- Extend the project to store data in a database (e.g., MongoDB).

---

## License
This project is open-source and available under the MIT License.

