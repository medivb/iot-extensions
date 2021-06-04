ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("Broeknet", "B1vidhd10idl")
if (ESP8266_IoT.wifiState(true)) {
    basic.showString("Online")
}
OLED.init(128, 64)
basic.forever(function () {
    ESP8266_IoT.connectThingSpeak()
    ESP8266_IoT.setData(
    "3OQIFVV3D5KWUGMX",
    Environment.ReadDust(DigitalPin.P13, AnalogPin.P1),
    Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
    Environment.octopus_BME280(Environment.BME280_state.BME280_humidity),
    Environment.octopus_BME280(Environment.BME280_state.BME280_pressure),
    Environment.ReadNoise(AnalogPin.P2),
    0
    )
    ESP8266_IoT.uploadData()
    OLED.clear()
    OLED.writeString("Dust (ug/m3):")
    OLED.writeNum(Environment.ReadDust(DigitalPin.P13, AnalogPin.P1))
    OLED.newLine()
    OLED.writeString("Noise (dB)")
    OLED.writeNum(Environment.ReadNoise(AnalogPin.P2))
    OLED.newLine()
    OLED.writeString("Temperature (c):")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.newLine()
    OLED.writeString("Humidity (%):")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
    OLED.newLine()
    OLED.writeString("Pressure (hPa):")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_pressure))
    if (Environment.ReadDust(DigitalPin.P13, AnalogPin.P1) < 36) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.Skull)
    }
    basic.pause(60000)
})
